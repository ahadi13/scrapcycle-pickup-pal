
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Camera, Upload, X, CreditCard, Banknote } from 'lucide-react';

interface PhotoStepProps {
  photos: File[];
  specialInstructions: string;
  paymentMethod: 'upi' | 'cash';
  onPhotosChange: (photos: File[]) => void;
  onInstructionsChange: (instructions: string) => void;
  onPaymentMethodChange: (method: 'upi' | 'cash') => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PhotoStep: React.FC<PhotoStepProps> = ({
  photos,
  specialInstructions,
  paymentMethod,
  onPhotosChange,
  onInstructionsChange,
  onPaymentMethodChange,
  onNext,
  onPrevious,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPhotos = [...photos, ...files].slice(0, 5); // Max 5 photos
    onPhotosChange(newPhotos);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Photos & Additional Details
        </h2>
        <p className="text-gray-600">
          Add photos and specify payment preferences
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Photo Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              Material Photos (Optional)
            </CardTitle>
            <CardDescription>
              Upload photos to help us better estimate the value and prepare for pickup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Material ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {photos.length < 5 && (
              <Button
                variant="outline"
                onClick={openFileDialog}
                className="w-full h-24 dashed border-dashed"
              >
                <div className="text-center">
                  <Upload className="h-6 w-6 mx-auto mb-2" />
                  <p>Click to upload photos</p>
                  <p className="text-xs text-gray-500">
                    {photos.length}/5 photos
                  </p>
                </div>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Special Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Special Instructions (Optional)</CardTitle>
            <CardDescription>
              Any specific details or requirements for the pickup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Materials are in the basement, Ring the bell twice, etc."
              value={specialInstructions}
              onChange={(e) => onInstructionsChange(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              How would you like to receive payment?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value: 'upi' | 'cash') => onPaymentMethodChange(value)}
            >
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center cursor-pointer">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                  <div>
                    <div className="font-medium">UPI Payment</div>
                    <div className="text-sm text-gray-500">
                      Instant digital payment to your UPI ID
                    </div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center cursor-pointer">
                  <Banknote className="h-5 w-5 mr-2 text-green-600" />
                  <div>
                    <div className="font-medium">Cash Payment</div>
                    <div className="text-sm text-gray-500">
                      Receive cash payment during pickup
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between max-w-2xl mx-auto">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button
          onClick={onNext}
          className="bg-green-600 hover:bg-green-700"
        >
          Review & Confirm
        </Button>
      </div>
    </div>
  );
};

export default PhotoStep;
