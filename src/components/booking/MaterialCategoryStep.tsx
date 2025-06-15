
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      selectedColor: 'bg-blue-100 border-blue-500',
    },
    {
      id: 'plastic',
      name: 'Plastic',
      description: 'Bottles, containers, bags, packaging materials',
      icon: '🥤',
      color: 'bg-red-50 border-red-200 hover:bg-red-100',
      selectedColor: 'bg-red-100 border-red-500',
    },
    {
      id: 'metal',
      name: 'Metal',
      description: 'Iron, steel, aluminum, copper, brass, tin',
      icon: '🔩',
      color: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
      selectedColor: 'bg-gray-100 border-gray-500',
    },
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Mobile phones, laptops, appliances (e-waste)',
      icon: '📱',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      selectedColor: 'bg-purple-100 border-purple-500',
    },
    {
      id: 'glass',
      name: 'Glass',
      description: 'Bottles, containers',
      icon: '🍶',
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      selectedColor: 'bg-green-100 border-green-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What type of scrap do you want to sell?
        </h2>
        <p className="text-gray-600">
          Select the category that best describes your materials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all duration-200 ${
              selectedCategory === category.id
                ? category.selectedColor
                : category.color
            }`}
            onClick={() => onSelect(category.id)}
          >
            <CardHeader className="text-center pb-2">
              <div className="text-4xl mb-2">{category.icon}</div>
              <CardTitle className="text-lg">{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-sm">
                {category.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!selectedCategory}
          className="bg-green-600 hover:bg-green-700"
        >
          Next: Quantity Estimation
        </Button>
      </div>
    </div>
  );
};

export default MaterialCategoryStep;
