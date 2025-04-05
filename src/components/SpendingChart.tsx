
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Sample spending data
const spendingData = [
  { category: 'Food', amount: 540, limit: 600 },
  { category: 'Rent', amount: 1200, limit: 1200 },
  { category: 'Utilities', amount: 130, limit: 150 },
  { category: 'Entertainment', amount: 250, limit: 200 },
  { category: 'Shopping', amount: 320, limit: 300 },
  { category: 'Transport', amount: 180, limit: 200 },
];

const SpendingChart: React.FC = () => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-navy-800">Monthly Spending</CardTitle>
        <CardDescription>Track your spending habits against your budget limits</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={spendingData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <XAxis 
              dataKey="category" 
              angle={-45} 
              textAnchor="end" 
              height={60} 
              tick={{ fontSize: 12 }} 
            />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`₹${value}`, 'Amount']} 
              labelStyle={{ fontWeight: 'bold' }} 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
            />
            <Bar dataKey="amount" fill="#2dd4bf" radius={[4, 4, 0, 0]}>
              {spendingData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.amount > entry.limit ? '#f87171' : '#2dd4bf'} 
                />
              ))}
            </Bar>
            <Bar dataKey="limit" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-teal-400"></div>
            <span className="text-sm text-gray-600">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-200"></div>
            <span className="text-sm text-gray-600">Budget Limit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <span className="text-sm text-gray-600">Over Budget</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
