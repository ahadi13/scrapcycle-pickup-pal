
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Plus } from 'lucide-react';

interface Address {
  id?: string;
  title: string;
  addressLine: string;
  area: string;
  city: string;
  pinCode: string;
}

interface DatabaseAddress {
  id: string;
  title: string;
  address_line: string;
  area: string | null;
  city: string;
  pin_code: string;
  user_id: string;
  created_at: string;
  is_default: boolean | null;
}

interface AddressStepProps {
  address: Address;
  onChange: (address: Address) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const AddressStep: React.FC<AddressStepProps> = ({
  address,
  onChange,
  onNext,
  onPrevious,
}) => {
  const { user } = useAuth();
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');

  useEffect(() => {
    loadSavedAddresses();
  }, []);

  const loadSavedAddresses = async () => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false });

    if (data) {
      // Transform database format to frontend format
      const transformedAddresses: Address[] = data.map((dbAddr: DatabaseAddress) => ({
        id: dbAddr.id,
        title: dbAddr.title,
        addressLine: dbAddr.address_line,
        area: dbAddr.area || '',
        city: dbAddr.city,
        pinCode: dbAddr.pin_code,
      }));
      setSavedAddresses(transformedAddresses);
    }
  };

  const handleSelectSavedAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    const selectedAddr = savedAddresses.find(addr => addr.id === addressId);
    if (selectedAddr) {
      onChange({
        id: selectedAddr.id,
        title: selectedAddr.title,
        addressLine: selectedAddr.addressLine,
        area: selectedAddr.area,
        city: selectedAddr.city,
        pinCode: selectedAddr.pinCode,
      });
      setIsAddingNew(false);
    }
  };

  const handleAddNewAddress = () => {
    setIsAddingNew(true);
    setSelectedAddressId('');
    onChange({
      title: '',
      addressLine: '',
      area: '',
      city: '',
      pinCode: '',
    });
  };

  const updateAddress = (field: keyof Address, value: string) => {
    onChange({ ...address, [field]: value });
  };

  const isFormValid = () => {
    return address.title.trim() && 
           address.addressLine.trim() && 
           address.city.trim() && 
           address.pinCode.trim();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pickup Address
        </h2>
        <p className="text-gray-600">
          Where should we pick up your scrap materials?
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Select or Add Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Saved Addresses */}
          {savedAddresses.length > 0 && !isAddingNew && (
            <div className="space-y-4">
              <Label>Choose from saved addresses:</Label>
              {savedAddresses.map((addr) => (
                <Card
                  key={addr.id}
                  className={`cursor-pointer transition-all ${
                    selectedAddressId === addr.id
                      ? 'ring-2 ring-green-500 bg-green-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectSavedAddress(addr.id!)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{addr.title}</h4>
                        <p className="text-sm text-gray-600">
                          {addr.addressLine}
                          {addr.area && `, ${addr.area}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.city}, {addr.pinCode}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button
                variant="outline"
                onClick={handleAddNewAddress}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </div>
          )}

          {/* New Address Form */}
          {(isAddingNew || savedAddresses.length === 0) && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Add New Address:</Label>
                {savedAddresses.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddingNew(false)}
                  >
                    Use Saved Address
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="title">Address Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Home, Office"
                    value={address.title}
                    onChange={(e) => updateAddress('title', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="addressLine">Address Line *</Label>
                  <Input
                    id="addressLine"
                    placeholder="House/Flat no, Street name"
                    value={address.addressLine}
                    onChange={(e) => updateAddress('addressLine', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="area">Area/Landmark</Label>
                  <Input
                    id="area"
                    placeholder="Nearby landmark or area"
                    value={address.area}
                    onChange={(e) => updateAddress('area', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) => updateAddress('city', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="pinCode">PIN Code *</Label>
                    <Input
                      id="pinCode"
                      placeholder="123456"
                      value={address.pinCode}
                      onChange={(e) => updateAddress('pinCode', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between max-w-2xl mx-auto">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!isFormValid()}
          className="bg-green-600 hover:bg-green-700"
        >
          Next: Schedule Pickup
        </Button>
      </div>
    </div>
  );
};

export default AddressStep;
