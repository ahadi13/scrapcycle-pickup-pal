
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, Package, User, Phone, Camera, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { Database } from '@/integrations/supabase/types';

type BookingStatus = Database['public']['Enums']['booking_status'];

interface Booking {
  id: string;
  material_category: string;
  quantity_estimation: string;
  pickup_date: string;
  time_slot: string;
  special_instructions: string | null;
  status: BookingStatus;
  estimated_price: number | null;
  final_price: number | null;
  payment_method: string | null;
  created_at: string;
  profiles: {
    full_name: string | null;
    phone: string | null;
  };
  addresses: {
    title: string;
    address_line: string;
    area: string | null;
    city: string;
    pin_code: string;
  };
}

interface BookingDetailsModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (bookingId: string, status: string) => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  isOpen,
  onClose,
  onStatusUpdate,
}) => {
  if (!booking) return null;

  const getStatusBadge = (status: BookingStatus) => {
    const statusConfig = {
      scheduled: { variant: 'secondary' as const, text: 'Scheduled' },
      agent_on_way: { variant: 'default' as const, text: 'Agent On Way' },
      in_progress: { variant: 'default' as const, text: 'In Progress' },
      completed: { variant: 'default' as const, text: 'Completed' },
      cancelled: { variant: 'destructive' as const, text: 'Cancelled' },
    };

    const config = statusConfig[status] || statusConfig.scheduled;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      paper_cardboard: 'Paper & Cardboard',
      plastic: 'Plastic',
      metal: 'Metal',
      electronics: 'Electronics',
      glass: 'Glass',
    };
    return categories[category] || category;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Booking Details</span>
            {getStatusBadge(booking.status)}
          </DialogTitle>
          <DialogDescription>
            Booking ID: {booking.id.slice(0, 8)}... • Created on {format(new Date(booking.created_at), 'MMM dd, yyyy')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <User className="h-5 w-5 mr-2" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-medium">{booking.profiles.full_name || 'Unknown User'}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>{booking.profiles.phone || 'No phone number'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Pickup Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MapPin className="h-5 w-5 mr-2" />
                Pickup Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{booking.addresses.title}</p>
                <p className="text-gray-600">
                  {booking.addresses.address_line}
                  {booking.addresses.area && `, ${booking.addresses.area}`}
                </p>
                <p className="text-gray-600">
                  {booking.addresses.city}, {booking.addresses.pin_code}
                </p>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span>
                  {format(new Date(booking.pickup_date), 'EEEE, MMM dd, yyyy')} • {booking.time_slot}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Material Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Package className="h-5 w-5 mr-2" />
                Material Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">Category</p>
                <p className="text-gray-600">{getCategoryName(booking.material_category)}</p>
              </div>
              <div>
                <p className="font-medium">Quantity Estimation</p>
                <p className="text-gray-600">{booking.quantity_estimation}</p>
              </div>
              {booking.special_instructions && (
                <div>
                  <p className="font-medium">Special Instructions</p>
                  <p className="text-gray-600">{booking.special_instructions}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <CreditCard className="h-5 w-5 mr-2" />
                Pricing Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {booking.estimated_price && (
                <div>
                  <p className="font-medium">Estimated Price</p>
                  <p className="text-blue-600 font-semibold">₹{booking.estimated_price}</p>
                </div>
              )}
              {booking.final_price && (
                <div>
                  <p className="font-medium">Final Price</p>
                  <p className="text-green-600 font-semibold">₹{booking.final_price}</p>
                </div>
              )}
              {booking.payment_method && (
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p className="text-gray-600 capitalize">
                    {booking.payment_method === 'upi' ? 'UPI' : booking.payment_method}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Select
                  value={booking.status}
                  onValueChange={(value) => onStatusUpdate(booking.id, value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="agent_on_way">Agent On Way</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;
