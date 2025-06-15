
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, MapPin, Clock, Camera, Phone, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Booking {
  id: string;
  material_category: string;
  quantity_estimation: string;
  pickup_date: string;
  time_slot: string;
  special_instructions: string | null;
  status: string;
  payment_method: string | null;
  estimated_price: number | null;
  final_price: number | null;
  created_at: string;
  addresses: {
    title: string;
    address_line: string;
    area: string | null;
    city: string;
    pin_code: string;
  };
  booking_photos: Array<{
    photo_url: string;
  }>;
}

const MyBookingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        addresses (
          title,
          address_line,
          area,
          city,
          pin_code
        ),
        booking_photos (
          photo_url
        )
      `)
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false });

    if (data) {
      setBookings(data);
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { variant: 'secondary' as const, text: 'Scheduled' },
      agent_on_way: { variant: 'default' as const, text: 'Agent On Way' },
      in_progress: { variant: 'default' as const, text: 'In Progress' },
      completed: { variant: 'default' as const, text: 'Completed' },
      cancelled: { variant: 'destructive' as const, text: 'Cancelled' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
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

  const handleContactSupport = () => {
    const message = encodeURIComponent("Hi, I need help regarding my booking.");
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">My Bookings</h1>
            <div></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookings.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't made any scrap pickup bookings yet.
              </p>
              <Button onClick={() => navigate('/booking')} className="bg-green-600 hover:bg-green-700">
                Book Your First Pickup
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Package className="h-5 w-5 mr-2" />
                        {getCategoryName(booking.material_category)}
                      </CardTitle>
                      <CardDescription>
                        Booked on {format(new Date(booking.created_at), 'MMM dd, yyyy')}
                      </CardDescription>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Pickup Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Pickup Address</h4>
                        <p className="text-sm text-gray-600">
                          {booking.addresses.title} - {booking.addresses.address_line}
                          {booking.addresses.area && `, ${booking.addresses.area}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.addresses.city}, {booking.addresses.pin_code}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Pickup Schedule</h4>
                        <p className="text-sm text-gray-600">
                          {format(new Date(booking.pickup_date), 'EEEE, MMM dd, yyyy')}
                        </p>
                        <p className="text-sm text-gray-600">{booking.time_slot}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <h4 className="font-medium mb-1">Quantity Estimation</h4>
                    <p className="text-sm text-gray-600">{booking.quantity_estimation}</p>
                  </div>

                  {/* Photos */}
                  {booking.booking_photos.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Camera className="h-4 w-4 mr-1" />
                        Photos ({booking.booking_photos.length})
                      </h4>
                      <div className="flex space-x-2">
                        {booking.booking_photos.slice(0, 4).map((photo, index) => (
                          <img
                            key={index}
                            src={photo.photo_url}
                            alt={`Material ${index + 1}`}
                            className="w-16 h-16 object-cover rounded border"
                          />
                        ))}
                        {booking.booking_photos.length > 4 && (
                          <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center text-xs">
                            +{booking.booking_photos.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Special Instructions */}
                  {booking.special_instructions && (
                    <div>
                      <h4 className="font-medium mb-1">Special Instructions</h4>
                      <p className="text-sm text-gray-600">{booking.special_instructions}</p>
                    </div>
                  )}

                  {/* Pricing */}
                  {booking.final_price ? (
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h4 className="font-medium text-green-900">Final Payment</h4>
                      <p className="text-lg font-bold text-green-800">₹{booking.final_price}</p>
                      <p className="text-sm text-green-700">
                        Paid via {booking.payment_method === 'upi' ? 'UPI' : 'Cash'}
                      </p>
                    </div>
                  ) : booking.estimated_price ? (
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <h4 className="font-medium text-blue-900">Estimated Price</h4>
                      <p className="text-lg font-bold text-blue-800">₹{booking.estimated_price}</p>
                      <p className="text-sm text-blue-700">Final price will be determined after weighing</p>
                    </div>
                  ) : null}

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-gray-500">
                      Booking ID: {booking.id.slice(0, 8)}...
                    </div>
                    <div className="flex space-x-2">
                      {booking.status === 'scheduled' && (
                        <Button size="sm" variant="outline" onClick={handleContactSupport}>
                          <Phone className="h-3 w-3 mr-1" />
                          Contact Support
                        </Button>
                      )}
                      {booking.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          <Star className="h-3 w-3 mr-1" />
                          Rate Service
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBookingsPage;
