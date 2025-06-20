
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface QuantityStepProps {
  quantity: string;
  onChange: (quantity: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const QuantityStep: React.FC<QuantityStepProps> = ({
  quantity,
  onChange,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Estimate your scrap quantity
        </h2>
        <p className="text-gray-600">
          Provide an approximate weight or count to help us prepare
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Quantity Details</CardTitle>
          <CardDescription>
            Please provide as much detail as possible about the quantity and type of materials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., 5 kg newspapers, 10 plastic bottles, 1 old laptop, etc."
            value={quantity}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className="w-full"
          />
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 Tips for better estimates:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Mention approximate weight if possible (kg)</li>
              <li>• Count individual items for electronics</li>
              <li>• Include types of materials (newspaper, cardboard, etc.)</li>
              <li>• Don't worry about exact measurements - estimates are fine!</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between max-w-2xl mx-auto">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!quantity.trim()}
          className="bg-green-600 hover:bg-green-700"
        >
          Next: Pickup Address
        </Button>
      </div>
    </div>
  );
};

export default QuantityStep;
