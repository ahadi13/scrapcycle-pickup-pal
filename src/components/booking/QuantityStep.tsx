
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Lightbulb, IndianRupee } from 'lucide-react';

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
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Scale className="h-8 w-8 text-green-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">
            Estimate your scrap quantity
          </h2>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Provide an approximate weight or count to help us prepare for pickup
        </p>
      </div>

      <Card className="max-w-3xl mx-auto shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
          <CardTitle className="flex items-center text-gray-800">
            <div className="p-3 bg-green-500 rounded-xl mr-4">
              <Scale className="h-6 w-6 text-white" />
            </div>
            Quantity Details
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            Please provide as much detail as possible about the quantity and type of materials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <Textarea
            placeholder="e.g., 5 kg newspapers, 10 plastic bottles, 1 old laptop, 2 kg aluminum cans..."
            value={quantity}
            onChange={(e) => onChange(e.target.value)}
            rows={5}
            className="w-full text-base border-2 border-gray-200 focus:border-green-500 rounded-xl p-4 resize-none transition-all duration-200"
          />
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-500 rounded-lg mr-3">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <h4 className="font-bold text-blue-900 text-lg">💡 Tips for better estimates:</h4>
            </div>
            <ul className="text-blue-800 space-y-2 ml-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 font-bold">•</span>
                <span>Mention approximate weight if possible (kg/grams)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 font-bold">•</span>
                <span>Count individual items for electronics and appliances</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 font-bold">•</span>
                <span>Include types of materials (newspaper, cardboard, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 font-bold">•</span>
                <span>Don't worry about exact measurements - estimates are perfectly fine!</span>
              </li>
            </ul>
          </div>

          {/* Estimated Value Preview */}
          {quantity.trim() && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <IndianRupee className="h-6 w-6 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Estimated Value Range:</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">₹50 - ₹500</div>
                  <div className="text-sm text-green-700">*Based on current market rates</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between max-w-3xl mx-auto">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          className="px-6 py-3 text-base font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-xl transition-all duration-200"
        >
          ← Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!quantity.trim()}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Next: Pickup Address
          <span className="ml-2">→</span>
        </Button>
      </div>
    </div>
  );
};

export default QuantityStep;
