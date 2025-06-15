
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Plus, Edit, Trash2, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Address {
  id: string;
  title: string;
  address_line: string;
  area: string | null;
  city: string;
  pin_code: string;
  is_default: boolean;
}

const AddressManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    address_line: '',
    area: '',
    city: '',
    pin_code: '',
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false });

    if (data) {
      setAddresses(data);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      address_line: '',
      area: '',
      city: '',
      pin_code: '',
    });
    setEditingAddress(null);
  };

  const openEditDialog = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      title: address.title,
      address_line: address.address_line,
      area: address.area || '',
      city: address.city,
      pin_code: address.pin_code,
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const saveAddress = async () => {
    if (!formData.title || !formData.address_line || !formData.city || !formData.pin_code) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingAddress) {
        const { error } = await supabase
          .from('addresses')
          .update({
            title: formData.title,
            address_line: formData.address_line,
            area: formData.area || null,
            city: formData.city,
            pin_code: formData.pin_code,
          })
          .eq('id', editingAddress.id);

        if (error) throw error;

        toast({
          title: "Address Updated",
          description: "Your address has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('addresses')
          .insert({
            user_id: user!.id,
            title: formData.title,
            address_line: formData.address_line,
            area: formData.area || null,
            city: formData.city,
            pin_code: formData.pin_code,
            is_default: addresses.length === 0, // First address is default
          });

        if (error) throw error;

        toast({
          title: "Address Added",
          description: "Your new address has been added successfully.",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      loadAddresses();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteAddress = async (addressId: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId);

      if (error) throw error;

      toast({
        title: "Address Deleted",
        description: "The address has been removed from your account.",
      });

      loadAddresses();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const setDefaultAddress = async (addressId: string) => {
    try {
      // First, unset all defaults
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user!.id);

      // Then set the new default
      const { error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', addressId);

      if (error) throw error;

      toast({
        title: "Default Address Updated",
        description: "Your default address has been changed.",
      });

      loadAddresses();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Saved Addresses
              </CardTitle>
              <CardDescription>
                Manage your pickup addresses
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingAddress 
                      ? 'Update your address information'
                      : 'Add a new address for scrap pickup'
                    }
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Address Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Home, Office"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address_line">Address Line *</Label>
                    <Input
                      id="address_line"
                      placeholder="House/Flat no, Street name"
                      value={formData.address_line}
                      onChange={(e) => setFormData({ ...formData, address_line: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="area">Area/Landmark</Label>
                    <Input
                      id="area"
                      placeholder="Nearby landmark or area"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="pin_code">PIN Code *</Label>
                      <Input
                        id="pin_code"
                        placeholder="123456"
                        value={formData.pin_code}
                        onChange={(e) => setFormData({ ...formData, pin_code: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={saveAddress} className="bg-green-600 hover:bg-green-700">
                      {editingAddress ? 'Update' : 'Add'} Address
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {addresses.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No saved addresses yet</p>
              <p className="text-sm text-gray-500">Add your first address to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <Card key={address.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{address.title}</h4>
                          {address.is_default && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {address.address_line}
                          {address.area && `, ${address.area}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.pin_code}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        {!address.is_default && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDefaultAddress(address.id)}
                          >
                            <Star className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(address)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteAddress(address.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressManagement;
