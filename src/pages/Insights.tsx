// import React from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { UserReport } from "@/components/UserReport";
// // import { SpendingBreakdown } from "@/components/SpendingBreakdown";
// // import { SavingsGoals } from "@/components/SavingsGoals";

// const InsightsPage = () => {
//   return (
//     <div className="container mx-auto py-6 space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
//         <p className="text-muted-foreground">
//           Analyze your financial behavior and track your progress towards goals.
//         </p>
//       </div>

//       <Tabs defaultValue="spending" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
//           <TabsTrigger value="goals">Savings Goals</TabsTrigger>
//           <TabsTrigger value="report">User Report</TabsTrigger>
//         </TabsList>
        
//         {/* <TabsContent value="spending" className="space-y-4">
//           <SpendingBreakdown />
//         </TabsContent>

//         <TabsContent value="goals" className="space-y-4">
//           <SavingsGoals />
//         </TabsContent>

//         <TabsContent value="report" className="space-y-4">
//           <UserReport />
//         </TabsContent> */}
//       </Tabs>
//     </div>
//   );
// };

// export default InsightsPage;










import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Edit2, Trash2, AlertTriangle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  type: string;
}

// Sample expense data
const initialExpenseData: Expense[] = [
  { id: 1, category: 'Rent', amount: 1200, date: '2025-04-01', type: 'need' },
  { id: 2, category: 'Groceries', amount: 350, date: '2025-04-02', type: 'need' },
  { id: 3, category: 'Utilities', amount: 130, date: '2025-04-03', type: 'need' },
  { id: 4, category: 'Internet', amount: 80, date: '2025-04-04', type: 'need' },
  { id: 5, category: 'Dining Out', amount: 220, date: '2025-04-05', type: 'want' },
  { id: 6, category: 'Entertainment', amount: 150, date: '2025-04-06', type: 'want' },
  { id: 7, category: 'Shopping', amount: 180, date: '2025-04-07', type: 'want' },
  { id: 8, category: 'Subscription Services', amount: 45, date: '2025-04-08', type: 'want' },
  { id: 9, category: 'Healthcare', amount: 90, date: '2025-04-09', type: 'need' },
  { id: 10, category: 'Transportation', amount: 120, date: '2025-04-10', type: 'need' },
];

// Available expense categories
const expenseCategories = [
  'Rent',
  'Groceries',
  'Utilities',
  'Internet',
  'Dining Out',
  'Entertainment',
  'Shopping',
  'Subscription Services',
  'Healthcare',
  'Transportation',
  'Insurance',
  'Education',
  'Travel',
  'Gifts',
  'Personal Care',
  'Home Maintenance',
  'Pet Care',
  'Childcare',
  'Other'
];

// Classification rules
const needsCategories = ['Rent', 'Groceries', 'Utilities', 'Internet', 'Healthcare', 'Transportation', 'Insurance', 'Education', 'Childcare'];
const isNeed = (category: string) => needsCategories.includes(category);

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses, onEdit, onDelete }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                No expenses found
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.category}</TableCell>
                <TableCell>₹{expense.amount.toLocaleString()}</TableCell>
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-1 text-xs rounded-full ${
                      expense.type === 'need' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'
                    }`}
                  >
                    {expense.type === 'need' ? 'Need' : 'Want'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(expense)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(expense.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const EXPENSE_THRESHOLD = 30000;

const Insights: React.FC = () => {
  const { theme } = useTheme();
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenseData);
  const [manualTotal, setManualTotal] = useState('');
  const [isEditingTotal, setIsEditingTotal] = useState(false);
  const [showThresholdAlert, setShowThresholdAlert] = useState(false);
  
  // State for adding/editing expenses
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    category: '',
    amount: 0,
    date: new Date().toISOString().slice(0, 10),
    type: 'need'
  });
  
  // Calculate totals and check threshold
  const calculateTotals = () => {
    const needs = expenses.filter(expense => expense.type === 'need');
    const wants = expenses.filter(expense => expense.type === 'want');
    
    const needsTotal = needs.reduce((total, expense) => total + expense.amount, 0);
    const wantsTotal = wants.reduce((total, expense) => total + expense.amount, 0);
    
    const calculatedTotal = needsTotal + wantsTotal;
    const total = manualTotal && !isNaN(parseFloat(manualTotal)) 
      ? parseFloat(manualTotal) 
      : calculatedTotal;
    
    // Check if total exceeds threshold
    if (total >= EXPENSE_THRESHOLD && !showThresholdAlert) {
      setShowThresholdAlert(true);
    }
    
    const needsPercentage = total > 0 ? Math.round((needsTotal / total) * 100) : 0;
    const wantsPercentage = total > 0 ? Math.round((wantsTotal / total) * 100) : 0;
    const savingsPercentage = total > 0 ? Math.max(0, 100 - needsPercentage - wantsPercentage) : 0;
    
    return {
      needs,
      wants,
      needsTotal,
      wantsTotal,
      total,
      needsPercentage,
      wantsPercentage,
      savingsPercentage
    };
  };
  
  const { 
    needs, 
    wants, 
    needsTotal, 
    wantsTotal, 
    total, 
    needsPercentage, 
    wantsPercentage,
    savingsPercentage
  } = calculateTotals();
  
  const pieData = [
    { name: 'Needs', value: needsTotal, color: theme === 'dark' ? '#2dd4bf' : '#14b8a6' },
    { name: 'Wants', value: wantsTotal, color: theme === 'dark' ? '#f87171' : '#ef4444' },
    { name: 'Savings', value: total - needsTotal - wantsTotal, color: theme === 'dark' ? '#60a5fa' : '#3b82f6' }
  ].filter(item => item.value > 0);

  // Handle adding a new expense with threshold check
  const handleAddExpense = () => {
    if (!newExpense.category || newExpense.amount <= 0 || !newExpense.date) {
      return;
    }
    
    let updatedExpenses;
    if (editingExpenseId !== null) {
      updatedExpenses = expenses.map(expense => 
        expense.id === editingExpenseId 
          ? { ...newExpense, id: editingExpenseId } 
          : expense
      );
    } else {
      const newId = Math.max(0, ...expenses.map(e => e.id)) + 1;
      updatedExpenses = [...expenses, { ...newExpense, id: newId }];
    }
    
    // Calculate new total before updating state
    const newTotal = updatedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    if (newTotal >= EXPENSE_THRESHOLD) {
      setShowThresholdAlert(true);
    }
    
    setExpenses(updatedExpenses);
    setNewExpense({
      category: '',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      type: 'need'
    });
    setEditingExpenseId(null);
    setIsExpenseDialogOpen(false);
  };
  
  // Handle editing an expense
  const handleEditExpense = (expense: Expense) => {
    setEditingExpenseId(expense.id);
    setNewExpense({
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
      type: expense.type
    });
    setIsExpenseDialogOpen(true);
  };
  
  // Handle deleting an expense
  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Spending Insights</h1>
          <p className="text-muted-foreground mt-1">Understand your spending patterns and make better decisions</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardDescription>Total Spending</CardDescription>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsEditingTotal(true)}
                >
                  <Edit2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <CardTitle className="text-2xl">₹{total.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Needs</CardDescription>
              <CardTitle className="text-2xl text-primary">₹{needsTotal.toLocaleString()} ({needsPercentage}%)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Essentials for living</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Wants</CardDescription>
              <CardTitle className="text-2xl text-destructive">₹{wantsTotal.toLocaleString()} ({wantsPercentage}%)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Non-essential spending</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Spending Distribution</CardTitle>
              <CardDescription>Visualization of your spending breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>50/30/20 Rule Analysis</CardTitle>
              <CardDescription>Needs / Wants / Savings Budget Rule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Needs (Target: 50%)</span>
                    <span className="text-sm font-medium">{needsPercentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${needsPercentage > 60 ? 'bg-amber-500' : 'bg-primary'}`} 
                      style={{ width: `${needsPercentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {needsPercentage > 60 
                      ? 'Your essential spending is higher than recommended. Consider reviewing your fixed expenses.' 
                      : 'Your essential spending is within recommended limits.'}
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Wants (Target: 30%)</span>
                    <span className="text-sm font-medium">{wantsPercentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${wantsPercentage > 40 ? 'bg-destructive' : 'bg-primary'}`} 
                      style={{ width: `${wantsPercentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {wantsPercentage > 40 
                      ? 'Your discretionary spending is higher than recommended. Look for ways to reduce non-essential expenses.' 
                      : 'Your discretionary spending is within recommended limits.'}
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Savings (Target: 20%)</span>
                    <span className="text-sm font-medium">{savingsPercentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${savingsPercentage < 15 ? 'bg-destructive' : 'bg-primary'}`} 
                      style={{ width: `${savingsPercentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {savingsPercentage < 15 
                      ? 'Your savings rate is below recommended levels. Try to increase your savings by reducing expenses.' 
                      : 'Your savings rate is within recommended limits.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Expense Details</CardTitle>
                <CardDescription>Detailed breakdown of all expenses</CardDescription>
              </div>
              <Button onClick={() => {
                setEditingExpenseId(null);
                setNewExpense({
                  category: '',
                  amount: 0,
                  date: new Date().toISOString().slice(0, 10),
                  type: 'need'
                });
                setIsExpenseDialogOpen(true);
              }}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Expenses</TabsTrigger>
                <TabsTrigger value="needs">Needs</TabsTrigger>
                <TabsTrigger value="wants">Wants</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <ExpenseTable 
                  expenses={expenses} 
                  onEdit={handleEditExpense}
                  onDelete={handleDeleteExpense}
                />
              </TabsContent>
              <TabsContent value="needs">
                <ExpenseTable 
                  expenses={needs} 
                  onEdit={handleEditExpense}
                  onDelete={handleDeleteExpense}
                />
              </TabsContent>
              <TabsContent value="wants">
                <ExpenseTable 
                  expenses={wants} 
                  onEdit={handleEditExpense}
                  onDelete={handleDeleteExpense}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      
      {/* Total Spending Dialog */}
      <Dialog open={isEditingTotal} onOpenChange={setIsEditingTotal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Total Spending</DialogTitle>
            <DialogDescription>
              Enter your total spending amount for this month
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="totalSpending">Total Spending (₹)</Label>
              <Input
                id="totalSpending"
                type="number"
                min="0"
                value={manualTotal}
                onChange={(e) => setManualTotal(e.target.value)}
                placeholder="Enter total amount"
              />
              <p className="text-sm text-muted-foreground">
                Leave empty to automatically calculate from expenses
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setManualTotal('');
              setIsEditingTotal(false);
            }}>
              Reset
            </Button>
            <Button onClick={() => setIsEditingTotal(false)}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add/Edit Expense Dialog */}
      <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingExpenseId !== null ? 'Edit Expense' : 'Add New Expense'}
            </DialogTitle>
            <DialogDescription>
              {editingExpenseId !== null 
                ? 'Update the expense details below' 
                : 'Enter the details of your expense'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newExpense.category}
                onValueChange={(value) => setNewExpense({
                  ...newExpense,
                  category: value,
                  type: isNeed(value) ? 'need' : 'want'
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      <div className="flex items-center gap-2">
                        <span className={isNeed(category) ? 'text-primary' : 'text-destructive'}>•</span>
                        <span>{category}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value) || 0})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={newExpense.type}
                onValueChange={(value: 'need' | 'want') => setNewExpense({...newExpense, type: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="need">Need (Essential)</SelectItem>
                  <SelectItem value="want">Want (Discretionary)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExpenseDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddExpense}>
              {editingExpenseId !== null ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Threshold Alert Dialog */}
      <AlertDialog open={showThresholdAlert} onOpenChange={setShowThresholdAlert}>
        <AlertDialogContent className="border-2 border-red-500">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              Monthly Expense Alert!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              <div className="text-red-500 font-semibold mb-2">
                Warning: High Monthly Expenses!
              </div>
              <div>
                Your monthly expenses have reached <span className="font-bold text-red-500">₹{EXPENSE_THRESHOLD.toLocaleString()}</span>. 
                This is above your set threshold limit.
              </div>
              <div className="mt-2 text-red-400">
                Recommended Actions:
                <ul className="list-disc ml-4 mt-1">
                  <li>Review your recent expenses</li>
                  <li>Identify non-essential spending</li>
                  <li>Consider budget adjustments</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-end gap-2">
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2"
              onClick={() => setShowThresholdAlert(false)}
            >
              I Understand
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Insights;
