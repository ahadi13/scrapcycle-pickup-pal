
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Camera, Upload } from 'lucide-react';
import MaterialCategoryStep from './MaterialCategoryStep';
import QuantityStep from './QuantityStep';
import AddressStep from './AddressStep';
import TimeSlotStep from './TimeSlotStep';
import PhotoStep from './PhotoStep';
import ReviewStep from './ReviewStep';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BookingData {
  materialCategory: string;
  quantityEstimation: string;
  pickupAddress: {
    id?: string;
    title: string;
    addressLine: string;
    area: string;
    city: string;
    pinCode: string;
  };
  pickupDate: string;
  timeSlot: string;
  photos: File[];
  specialInstructions: string;
  paymentMethod: 'upi' | 'cash';
}

const BookingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    materialCategory: '',
    quantityEstimation: '',
    pickupAddress: {
      title: '',
      addressLine: '',
      area: '',
      city: '',
      pinCode: '',
    },
    pickupDate: '',
    timeSlot: '',
    photos: [],
    specialInstructions: '',
    paymentMethod: 'cash',
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const submitBooking = async () => {
    try {
      // First, save or get the address
      let addressId = bookingData.pickupAddress.id;
      
      if (!addressId) {
        const { data: addressData, error: addressError } = await supabase
          .from('addresses')
          .insert({
            user_id: user!.id,
            title: bookingData.pickupAddress.title,
            address_line: bookingData.pickupAddress.addressLine,
            area: bookingData.pickupAddress.area,
            city: bookingData.pickupAddress.city,
            pin_code: bookingData.pickupAddress.pinCode,
          })
          .select()
          .single();

        if (addressError) throw addressError;
        addressId = addressData.id;
      }

      // Create the booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user!.id,
          material_category: bookingData.materialCategory as any,
          quantity_estimation: bookingData.quantityEstimation,
          pickup_address_id: addressId,
          pickup_date: bookingData.pickupDate,
          time_slot: bookingData.timeSlot,
          special_instructions: bookingData.specialInstructions,
          payment_method: bookingData.paymentMethod,
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Upload photos if any
      if (bookingData.photos.length > 0) {
        for (const photo of bookingData.photos) {
          const fileName = `${user!.id}/${booking.id}/${Date.now()}-${photo.name}`;
          
          const { error: uploadError } = await supabase.storage
            .from('booking-photos')
            .upload(fileName, photo);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('booking-photos')
            .getPublicUrl(fileName);

          await supabase
            .from('booking_photos')
            .insert({
              booking_id: booking.id,
              photo_url: publicUrl,
            });
        }
      }

      toast({
        title: "Booking Confirmed!",
        description: "Your scrap pickup has been scheduled successfully.",
      });

      navigate('/my-bookings');
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <MaterialCategoryStep
            selectedCategory={bookingData.materialCategory}
            onSelect={(category) => updateBookingData({ materialCategory: category })}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <QuantityStep
            quantity={bookingData.quantityEstimation}
            onChange={(quantity) => updateBookingData({ quantityEstimation: quantity })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <AddressStep
            address={bookingData.pickupAddress}
            onChange={(address) => updateBookingData({ pickupAddress: address })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <TimeSlotStep
            selectedDate={bookingData.pickupDate}
            selectedTimeSlot={bookingData.timeSlot}
            onDateChange={(date) => updateBookingData({ pickupDate: date })}
            onTimeSlotChange={(timeSlot) => updateBookingData({ timeSlot })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <PhotoStep
            photos={bookingData.photos}
            specialInstructions={bookingData.specialInstructions}
            paymentMethod={bookingData.paymentMethod}
            onPhotosChange={(photos) => updateBookingData({ photos })}
            onInstructionsChange={(specialInstructions) => updateBookingData({ specialInstructions })}
            onPaymentMethodChange={(paymentMethod) => updateBookingData({ paymentMethod })}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 6:
        return (
          <ReviewStep
            bookingData={bookingData}
            onSubmit={submitBooking}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Book Pickup</h1>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStep()}
      </main>
    </div>
  );
};

export default BookingPage;
