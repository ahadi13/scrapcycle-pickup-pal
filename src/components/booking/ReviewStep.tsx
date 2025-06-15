
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { MapPin, Clock, Package, Camera, MessageSquare, CreditCard, Banknote } from 'lucide-react';
import { BookingData } from './BookingPage';

interface ReviewStepProps {
  bookingData: BookingData;
  onSubmit: () => void;
  onPrevious: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  bookingData,
  onSubmit,
  onPrevious,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review Your Booking
        </h2>
        <p className="text-gray-600">
          Please verify all details before confirming your pickup
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Material Category */}
          <div className="flex items-start space-x-3">
            <Package className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h4 className="font-medium">Material Category</h4>
              <Badge variant="secondary" className="mt-1">
                {getCategoryName(bookingData.materialCategory)}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Quantity */}
          <div className="flex items-start space-x-3">
            <Package className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h4 className="font-medium">Quantity Estimation</h4>
              <p className="text-gray-600 mt-1">{bookingData.quantityEstimation}</p>
            </div>
          </div>

          <Separator />

          {/* Address */}
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h4 className="font-medium">Pickup Address</h4>
              <div className="text-gray-600 mt-1">
                <p className="font-medium">{bookingData.pickupAddress.title}</p>
                <p>{bookingData.pickupAddress.addressLine}</p>
                {bookingData.pickupAddress.area && <p>{bookingData.pickupAddress.area}</p>}
                <p>{bookingData.pickupAddress.city}, {bookingData.pickupAddress.pinCode}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Schedule */}
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <h4 className="font-medium">Pickup Schedule</h4>
              <p className="text-gray-600 mt-1">
                {format(new Date(bookingData.pickupDate), 'EEEE, MMMM dd, yyyy')}
              </p>
              <p className="text-gray-600">{bookingData.timeSlot}</p>
            </div>
          </div>

          <Separator />

          {/* Photos */}
          {bookingData.photos.length > 0 && (
            <>
              <div className="flex items-start space-x-3">
                <Camera className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <h4 className="font-medium">Photos Uploaded</h4>
                  <div className="flex space-x-2 mt-2">
                    {bookingData.photos.slice(0, 3).map((photo, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(photo)}
                        alt={`Material ${index + 1}`}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ))}
                    {bookingData.photos.length > 3 && (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs">
                        +{bookingData.photos.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Special Instructions */}
          {bookingData.specialInstructions && (
            <>
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <h4 className="font-medium">Special Instructions</h4>
                  <p className="text-gray-600 mt-1">{bookingData.specialInstructions}</p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Payment Method */}
          <div className="flex items-start space-x-3">
            {bookingData.paymentMethod === 'upi' ? (
              <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
            ) : (
              <Banknote className="h-5 w-5 text-green-600 mt-0.5" />
            )}
            <div>
              <h4 className="font-medium">Payment Method</h4>
              <p className="text-gray-600 mt-1">
                {bookingData.paymentMethod === 'upi' ? 'UPI Payment' : 'Cash Payment'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2">📋 What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your booking will be confirmed immediately</li>
            <li>• Our team will contact you 30 minutes before pickup</li>
            <li>• We'll weigh your materials and provide instant payment</li>
            <li>• You'll receive a digital receipt via SMS/email</li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between max-w-2xl mx-auto">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
