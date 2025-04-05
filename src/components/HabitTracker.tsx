
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FinancialHabit {
  id: string;
  name: string;
  description: string;
  daysCompleted: number;
  streak: number;
  target: number;
}

const financialHabits: FinancialHabit[] = [
  {
    id: '1',
    name: 'Review Daily Spending',
    description: 'Check your transactions each day',
    daysCompleted: 5,
    streak: 5,
    target: 7,
  },
  {
    id: '2',
    name: 'No Impulse Purchases',
    description: 'Avoid unplanned purchases over $20',
    daysCompleted: 3,
    streak: 3,
    target: 7,
  },
  {
    id: '3',
    name: 'Save Small Amounts',
    description: 'Transfer $5 to savings daily',
    daysCompleted: 6,
    streak: 6,
    target: 7,
  },
];

const HabitTracker: React.FC = () => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-navy-800">Financial Habits</CardTitle>
            <CardDescription>Build better money habits with daily tracking</CardDescription>
          </div>
          <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
            <Plus className="h-4 w-4 mr-1" />
            New Habit
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {financialHabits.map((habit) => (
          <div key={habit.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Checkbox id={`habit-${habit.id}`} />
                <div>
                  <label htmlFor={`habit-${habit.id}`} className="text-sm font-medium text-navy-800">
                    {habit.name}
                  </label>
                  <p className="text-xs text-gray-500">{habit.description}</p>
                </div>
              </div>
              <div className="text-xs font-medium text-amber-600">
                {habit.streak} day streak 🔥
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{habit.daysCompleted}/{habit.target} days</span>
                <span>{Math.round((habit.daysCompleted / habit.target) * 100)}%</span>
              </div>
              <Progress value={(habit.daysCompleted / habit.target) * 100} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t pt-4 text-center text-sm text-gray-500">
        Complete your habits daily to build financial discipline
      </CardFooter>
    </Card>
  );
};

export default HabitTracker;
