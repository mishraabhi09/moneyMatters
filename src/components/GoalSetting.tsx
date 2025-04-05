
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, Briefcase, Home, Plane } from "lucide-react";

interface FinancialGoal {
  id: string;
  name: string;
  icon: React.ReactNode;
  current: number;
  target: number;
  date: string;
  color: string;
}

const financialGoals: FinancialGoal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    icon: <TrendingUp className="h-5 w-5 text-teal-500" />,
    current: 3500,
    target: 10000,
    date: 'Dec 2025',
    color: 'bg-teal-500',
  },
  {
    id: '2',
    name: 'New Car',
    icon: <Briefcase className="h-5 w-5 text-amber-500" />,
    current: 12000,
    target: 25000,
    date: 'Jun 2026',
    color: 'bg-amber-500',
  },
  {
    id: '3',
    name: 'House Down Payment',
    icon: <Home className="h-5 w-5 text-navy-500" />,
    current: 35000,
    target: 120000,
    date: 'Jan 2028',
    color: 'bg-navy-500',
  },
];

const GoalSetting: React.FC = () => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-navy-800">Financial Goals</CardTitle>
            <CardDescription>Track progress towards your financial dreams</CardDescription>
          </div>
          <Button variant="outline" className="text-teal-500 border-teal-500 hover:bg-teal-50">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {financialGoals.map((goal) => (
          <div key={goal.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-slate-100">
                  {goal.icon}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-navy-800">{goal.name}</h4>
                  <p className="text-xs text-gray-500">Target date: {goal.date}</p>
                </div>
              </div>
              <div className="text-sm font-medium">
                ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
              </div>
            </div>
            
            <Progress 
              value={(goal.current / goal.target) * 100} 
              className={`h-2 ${goal.color}`} 
            />
            
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">
                {Math.round((goal.current / goal.target) * 100)}% complete
              </span>
              <span className="text-xs font-medium text-teal-600">
                ₹{(goal.target - goal.current).toLocaleString()} to go
              </span>
            </div>
          </div>
        ))}

        <Button variant="ghost" className="w-full border border-dashed border-gray-300 py-6 text-gray-500 hover:text-teal-600 hover:border-teal-400 flex items-center justify-center group">
          <PlusCircle className="h-5 w-5 mr-2 group-hover:text-teal-500" />
          Add another financial goal
        </Button>
      </CardContent>
    </Card>
  );
};

export default GoalSetting;
