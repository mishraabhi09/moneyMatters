
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Sample expense data
const expenseData = [
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

// Classification rules
const needsCategories = ['Rent', 'Groceries', 'Utilities', 'Internet', 'Healthcare', 'Transportation', 'Insurance'];
const isNeed = (category: string) => needsCategories.includes(category);

// Calculate totals
const calculateTotals = () => {
  const needs = expenseData.filter(expense => isNeed(expense.category));
  const wants = expenseData.filter(expense => !isNeed(expense.category));
  
  const needsTotal = needs.reduce((total, expense) => total + expense.amount, 0);
  const wantsTotal = wants.reduce((total, expense) => total + expense.amount, 0);
  
  return {
    needs,
    wants,
    needsTotal,
    wantsTotal,
    total: needsTotal + wantsTotal,
    needsPercentage: Math.round((needsTotal / (needsTotal + wantsTotal)) * 100),
    wantsPercentage: Math.round((wantsTotal / (needsTotal + wantsTotal)) * 100),
  };
};

const Insights: React.FC = () => {
  const { needs, wants, needsTotal, wantsTotal, total, needsPercentage, wantsPercentage } = calculateTotals();
  
  const pieData = [
    { name: 'Needs', value: needsTotal, color: '#2dd4bf' },
    { name: 'Wants', value: wantsTotal, color: '#f87171' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-navy-800">Spending Insights</h1>
          <p className="text-gray-600 mt-1">Understand your spending patterns and make better decisions</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Spending</CardDescription>
              <CardTitle className="text-2xl">₹{total.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Needs</CardDescription>
              <CardTitle className="text-2xl text-teal-500">₹{needsTotal.toLocaleString()} ({needsPercentage}%)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Essentials for living</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Wants</CardDescription>
              <CardTitle className="text-2xl text-red-400">₹{wantsTotal.toLocaleString()} ({wantsPercentage}%)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Non-essential spending</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Needs vs Wants</CardTitle>
              <CardDescription>Visualization of your spending distribution</CardDescription>
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
                  <Tooltip formatter={(value) => `₹${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Spending Categories</CardTitle>
              <CardDescription>50/30/20 Rule Analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Needs (Target: 50%)</span>
                    <span className="text-sm font-medium">{needsPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${needsPercentage > 60 ? 'bg-amber-500' : 'bg-teal-500'}`} 
                      style={{ width: `${needsPercentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
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
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${wantsPercentage > 40 ? 'bg-red-500' : 'bg-teal-500'}`} 
                      style={{ width: `${wantsPercentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {wantsPercentage > 40 
                      ? 'Your discretionary spending is higher than recommended. Look for ways to reduce non-essential expenses.' 
                      : 'Your discretionary spending is within recommended limits.'}
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Savings (Target: 20%)</span>
                    <span className="text-sm font-medium">{100 - needsPercentage - wantsPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${100 - needsPercentage - wantsPercentage < 15 ? 'bg-red-500' : 'bg-teal-500'}`} 
                      style={{ width: `${100 - needsPercentage - wantsPercentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {100 - needsPercentage - wantsPercentage < 15 
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
            <CardTitle>Expense Details</CardTitle>
            <CardDescription>Detailed breakdown of all expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Expenses</TabsTrigger>
                <TabsTrigger value="needs">Needs</TabsTrigger>
                <TabsTrigger value="wants">Wants</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <ExpenseTable expenses={expenseData} />
              </TabsContent>
              <TabsContent value="needs">
                <ExpenseTable expenses={needs} />
              </TabsContent>
              <TabsContent value="wants">
                <ExpenseTable expenses={wants} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  type: string;
}

const ExpenseTable: React.FC<{ expenses: Expense[] }> = ({ expenses }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.category}</TableCell>
              <TableCell>₹{expense.amount.toLocaleString()}</TableCell>
              <TableCell>{expense.date}</TableCell>
              <TableCell>
                <span 
                  className={`px-2 py-1 text-xs rounded-full ${
                    expense.type === 'need' ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {expense.type === 'need' ? 'Need' : 'Want'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Insights;
