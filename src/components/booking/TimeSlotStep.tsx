
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Clock, CalendarDays } from 'lucide-react';
import { format, addDays, isToday, isTomorrow } from 'date-fns';

interface TimeSlotStepProps {
  selectedDate: string;
  selectedTimeSlot: string;
  onDateChange: (date: string) => void;
  onTimeSlotChange: (timeSlot: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const TimeSlotStep: React.FC<TimeSlotStepProps> = ({
  selectedDate,
  selectedTimeSlot,
  onDateChange,
  onTimeSlotChange,
  onNext,
  onPrevious,
}) => {
  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM',
  ];

  const today = new Date();

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEEE');
  };

  const availableDates = Array.from({ length: 8 }, (_, i) => addDays(today, i));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Schedule Your Pickup
        </h2>
        <p className="text-gray-600">
          Choose a convenient date and time slot
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {availableDates.map((date) => {
                const dateStr = format(date, 'yyyy-MM-dd');
                const isSelected = selectedDate === dateStr;
                
                return (
                  <Button
                    key={dateStr}
                    variant={isSelected ? 'default' : 'outline'}
                    className={`p-4 h-auto flex flex-col transition-all duration-200 ${
                      isSelected 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'hover:bg-green-50 hover:border-green-300'
                    }`}
                    onClick={() => onDateChange(dateStr)}
                  >
                    <span className="font-medium">{getDateLabel(date)}</span>
                    <span className="text-sm opacity-80">
                      {format(date, 'MMM dd')}
                    </span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Time Slot Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Select Time Slot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedTimeSlot === slot;
                
                return (
                  <Button
                    key={slot}
                    variant={isSelected ? 'default' : 'outline'}
                    className={`w-full justify-start transition-all duration-200 ${
                      isSelected 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'hover:bg-green-50 hover:border-green-300'
                    }`}
                    onClick={() => onTimeSlotChange(slot)}
                  >
                    {slot}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedDate && selectedTimeSlot && (
        <Card className="max-w-2xl mx-auto bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="font-medium text-green-900">Selected Schedule</h3>
              <p className="text-green-800">
                {format(new Date(selectedDate), 'EEEE, MMMM dd, yyyy')} at {selectedTimeSlot}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between max-w-2xl mx-auto">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedDate || !selectedTimeSlot}
          className="bg-green-600 hover:bg-green-700"
        >
          Next: Photos & Details
        </Button>
      </div>
    </div>
  );
};

export default TimeSlotStep;
