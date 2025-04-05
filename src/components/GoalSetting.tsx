import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  TrendingUp, 
  Briefcase, 
  Home, 
  Plane, 
  Trash2, 
  Edit, 
  Laptop,
  GraduationCap,
  Bike,
  HeartPulse,
  Palmtree
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from '@/contexts/ThemeContext';

interface FinancialGoal {
  id: string;
  name: string;
  icon: React.ReactNode;
  current: number;
  target: number;
  date: string;
  color: string;
  iconType: IconType;
}

type IconType = 'TrendingUp' | 'Briefcase' | 'Home' | 'Plane' | 'Laptop' | 'GraduationCap' | 'Bike' | 'HeartPulse' | 'Palmtree';

const iconComponents: Record<IconType, React.ReactNode> = {
  TrendingUp: <TrendingUp className="h-5 w-5 text-primary" />,
  Briefcase: <Briefcase className="h-5 w-5 text-amber-500" />,
  Home: <Home className="h-5 w-5 text-blue-500" />,
  Plane: <Plane className="h-5 w-5 text-purple-500" />,
  Laptop: <Laptop className="h-5 w-5 text-green-500" />,
  GraduationCap: <GraduationCap className="h-5 w-5 text-red-500" />,
  Bike: <Bike className="h-5 w-5 text-pink-500" />,
  HeartPulse: <HeartPulse className="h-5 w-5 text-indigo-500" />,
  Palmtree: <Palmtree className="h-5 w-5 text-yellow-500" />
};

const colorOptions = [
  { name: 'Teal', class: 'bg-primary' },
  { name: 'Blue', class: 'bg-blue-500' },
  { name: 'Amber', class: 'bg-amber-500' },
  { name: 'Purple', class: 'bg-purple-500' },
  { name: 'Green', class: 'bg-green-500' },
  { name: 'Red', class: 'bg-red-500' },
  { name: 'Pink', class: 'bg-pink-500' },
  { name: 'Indigo', class: 'bg-indigo-500' },
  { name: 'Yellow', class: 'bg-yellow-500' }
];

const initialFinancialGoals: FinancialGoal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    icon: <TrendingUp className="h-5 w-5 text-primary" />,
    iconType: 'TrendingUp',
    current: 3500,
    target: 10000,
    date: '2025-12-31',
    color: 'bg-primary',
  },
  {
    id: '2',
    name: 'New Car',
    icon: <Briefcase className="h-5 w-5 text-amber-500" />,
    iconType: 'Briefcase',
    current: 12000,
    target: 25000,
    date: '2026-06-30',
    color: 'bg-amber-500',
  },
  {
    id: '3',
    name: 'House Down Payment',
    icon: <Home className="h-5 w-5 text-blue-500" />,
    iconType: 'Home',
    current: 35000,
    target: 120000,
    date: '2028-01-31',
    color: 'bg-blue-500',
  },
];

const GoalSetting: React.FC = () => {
  const { theme } = useTheme();
  const [goals, setGoals] = useState<FinancialGoal[]>(initialFinancialGoals);
  const [isAddGoalDialogOpen, setIsAddGoalDialogOpen] = useState(false);
  
  const [newGoal, setNewGoal] = useState<Omit<FinancialGoal, 'id' | 'icon'> & { iconType: IconType }>({
    name: '',
    iconType: 'TrendingUp',
    current: 0,
    target: 0,
    date: '',
    color: 'bg-primary'
  });
  
  const handleAddGoal = () => {
    // Form validation
    if (!newGoal.name || !newGoal.date || newGoal.target <= 0) {
      return; // Could add proper validation UI feedback here
    }
    
    const newGoalWithId: FinancialGoal = {
      ...newGoal,
      id: (goals.length + 1).toString() + Date.now().toString(), // Generate a unique ID
      icon: iconComponents[newGoal.iconType]
    };
    
    setGoals([...goals, newGoalWithId]);
    
    // Reset form
    setNewGoal({
      name: '',
      iconType: 'TrendingUp',
      current: 0,
      target: 0,
      date: '',
      color: 'bg-primary'
    });
    
    setIsAddGoalDialogOpen(false);
  };
  
  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };
  
  const formatDate = (isoDate: string): string => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>Track progress towards your financial dreams</CardDescription>
            </div>
            <Button 
              onClick={() => setIsAddGoalDialogOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              You have no financial goals yet. Add your first goal to get started!
            </div>
          ) : (
            goals.map((goal) => (
              <div key={goal.id} className="border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-background">
                      {goal.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{goal.name}</h4>
                      <p className="text-xs text-muted-foreground">Target date: {formatDate(goal.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">
                      ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteGoal(goal.id)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                </div>
                
                <Progress 
                  value={(goal.current / goal.target) * 100} 
                  className={`h-2 ${goal.color}`} 
                />
                
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {Math.round((goal.current / goal.target) * 100)}% complete
                  </span>
                  <span className="text-xs font-medium text-primary">
                    ₹{(goal.target - goal.current).toLocaleString()} to go
                  </span>
                </div>
              </div>
            ))
          )}

          {/* <Button 
            variant="outline" 
            className="w-full border border-dashed border-border py-6 text-muted-foreground hover:text-primary hover:border-primary flex items-center justify-center group"
            onClick={() => setIsAddGoalDialogOpen(true)}
          >
            <PlusCircle className="h-5 w-5 mr-2 group-hover:text-primary" />
            Add another financial goal
          </Button> */}
          
        </CardContent>
      </Card>
      
      {/* Add Goal Dialog */}
      <Dialog open={isAddGoalDialogOpen} onOpenChange={setIsAddGoalDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a New Financial Goal</DialogTitle>
            <DialogDescription>
              Define your next financial milestone to keep track of your progress.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="goalName">Goal Name</Label>
              <Input 
                id="goalName" 
                value={newGoal.name} 
                onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                placeholder="e.g. Vacation Fund"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="icon">Icon</Label>
                <Select 
                  value={newGoal.iconType} 
                  onValueChange={(value: IconType) => setNewGoal({...newGoal, iconType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TrendingUp">Investments</SelectItem>
                    <SelectItem value="Briefcase">Career</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Plane">Travel</SelectItem>
                    <SelectItem value="Laptop">Tech</SelectItem>
                    <SelectItem value="GraduationCap">Education</SelectItem>
                    <SelectItem value="Bike">Vehicle</SelectItem>
                    <SelectItem value="HeartPulse">Health</SelectItem>
                    <SelectItem value="Palmtree">Vacation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                <Select 
                  value={newGoal.color} 
                  onValueChange={(value) => setNewGoal({...newGoal, color: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map(color => (
                      <SelectItem key={color.class} value={color.class}>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${color.class}`}></div>
                          <span>{color.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="currentAmount">Current Amount (₹)</Label>
                <Input 
                  id="currentAmount" 
                  type="number"
                  min="0"
                  value={newGoal.current} 
                  onChange={(e) => setNewGoal({...newGoal, current: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="targetAmount">Target Amount (₹)</Label>
                <Input 
                  id="targetAmount" 
                  type="number"
                  min="1"
                  value={newGoal.target} 
                  onChange={(e) => setNewGoal({...newGoal, target: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="targetDate">Target Date</Label>
              <Input 
                id="targetDate" 
                type="date"
                value={newGoal.date} 
                onChange={(e) => setNewGoal({...newGoal, date: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddGoalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGoal}>
              Add Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GoalSetting;
