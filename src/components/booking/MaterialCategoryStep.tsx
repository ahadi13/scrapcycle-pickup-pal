
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Sparkles } from 'lucide-react';

interface MaterialCategoryStepProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
  onNext: () => void;
}

const MaterialCategoryStep: React.FC<MaterialCategoryStepProps> = ({
  selectedCategory,
  onSelect,
  onNext,
}) => {
  const categories = [
    {
      id: 'paper_cardboard',
      name: 'Paper & Cardboard',
      description: 'Newspapers, magazines, books, cartons, office paper',
      icon: '📄',
      gradient: 'from-blue-400 to-blue-600',
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      selectedBg: 'bg-gradient-to-br from-blue-100 to-blue-200',
      border: 'border-blue-200',
      selectedBorder: 'border-blue-500',
      price: '₹12-18/kg'
    },
    {
      id: 'plastic',
      name: 'Plastic Items',
      description: 'Bottles, containers, bags, packaging materials',
      icon: '🥤',
      gradient: 'from-red-400 to-red-600',
      bg: 'bg-gradient-to-br from-red-50 to-red-100',
      selectedBg: 'bg-gradient-to-br from-red-100 to-red-200',
      border: 'border-red-200',
      selectedBorder: 'border-red-500',
      price: '₹8-15/kg'
    },
    {
      id: 'metal',
      name: 'Metal Scrap',
      description: 'Iron, steel, aluminum, copper, brass, tin',
      icon: '🔩',
      gradient: 'from-gray-400 to-gray-600',
      bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
      selectedBg: 'bg-gradient-to-br from-gray-100 to-gray-200',
      border: 'border-gray-200',
      selectedBorder: 'border-gray-500',
      price: '₹25-45/kg'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Mobile phones, laptops, appliances (e-waste)',
      icon: '📱',
      gradient: 'from-purple-400 to-purple-600',
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      selectedBg: 'bg-gradient-to-br from-purple-100 to-purple-200',
      border: 'border-purple-200',
      selectedBorder: 'border-purple-500',
      price: '₹50-500/piece'
    },
    {
      id: 'glass',
      name: 'Glass Items',
      description: 'Bottles, containers, broken glass',
      icon: '🍶',
      gradient: 'from-green-400 to-green-600',
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      selectedBg: 'bg-gradient-to-br from-green-100 to-green-200',
      border: 'border-green-200',
      selectedBorder: 'border-green-500',
      price: '₹2-5/kg'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-green-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">
            What type of scrap do you want to sell?
          </h2>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Select the category that best describes your materials and see instant pricing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border-2 relative overflow-hidden group ${
              selectedCategory === category.id
                ? `${category.selectedBg} ${category.selectedBorder} shadow-xl scale-105`
                : `${category.bg} ${category.border} hover:shadow-lg`
            }`}
            onClick={() => onSelect(category.id)}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            <div className="absolute top-4 right-4">
              {selectedCategory === category.id && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </div>
            
            <CardHeader className="text-center pb-4 relative z-10">
              <div className={`text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 ${
                selectedCategory === category.id ? 'scale-110' : ''
              }`}>
                {category.icon}
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                {category.name}
              </CardTitle>
              <div className="flex items-center justify-center mb-2">
                <IndianRupee className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600 font-semibold">{category.price}</span>
              </div>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <CardDescription className="text-gray-600 font-medium">
                {category.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!selectedCategory}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Next: Quantity Estimation
          <span className="ml-2">→</span>
        </Button>
      </div>
    </div>
  );
};

export default MaterialCategoryStep;
