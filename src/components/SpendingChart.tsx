import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

// Initial spending percentages (relative to income)
const initialSpendingCategories = [
  { category: 'Food', percentage: 10.4, limitPercentage: 12, color: '#10b981' }, // green
  { category: 'Rent', percentage: 23.1, limitPercentage: 25, color: '#3b82f6' }, // blue
  { category: 'Utilities', percentage: 2.5, limitPercentage: 3, color: '#8b5cf6' }, // purple
  { category: 'Entertainment', percentage: 4.8, limitPercentage: 4, color: '#ec4899' }, // pink
  { category: 'Shopping', percentage: 6.2, limitPercentage: 6, color: '#f59e0b' }, // amber
  { category: 'Transport', percentage: 3.5, limitPercentage: 4, color: '#06b6d4' }, // cyan
];

interface SpendingChartProps {
  monthlyIncome?: number;
}

const SpendingChart: React.FC<SpendingChartProps> = ({ monthlyIncome = 5200 }) => {
  const { theme } = useTheme();
  const [spendingData, setSpendingData] = useState<Array<{
    category: string;
    amount: number;
    limit: number;
    percentage: number;
    limitPercentage: number;
    color: string;
  }>>([]);

  // Calculate spending data based on monthly income
  
  useEffect(() => {
    const newSpendingData = initialSpendingCategories.map(item => ({
      ...item,
      amount: Math.round((item.percentage / 100) * monthlyIncome),
      limit: Math.round((item.limitPercentage / 100) * monthlyIncome)
    }));
    setSpendingData(newSpendingData);
  }, [monthlyIncome]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spending</CardTitle>
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
              tick={{ fontSize: 12, fill: theme === 'dark' ? '#e5e7eb' : 'var(--foreground)' }} 
            />
            <YAxis 
              tick={{ fill: theme === 'dark' ? '#e5e7eb' : 'var(--foreground)' }} 
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip 
              formatter={(value: number, name: string, props: any) => {
                const entry = props.payload;
                return [`₹${value.toLocaleString()}`, name === 'limit' ? 'Budget Limit' : 'Amount'];
              }} 
              labelStyle={{ fontWeight: 'bold', color: theme === 'dark' ? '#ffffff' : '#000000' }} 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                color: theme === 'dark' ? '#ffffff' : '#000000',
                border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb'
              }} 
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {spendingData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.amount > entry.limit ? '#ef4444' : entry.color} 
                />
              ))}
            </Bar>
            <Bar dataKey="limit" fill={theme === 'dark' ? '#4b5563' : '#e5e7eb'} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {spendingData.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: category.amount > category.limit ? '#ef4444' : category.color }}
              ></div>
              <span className="text-sm text-muted-foreground">{category.category}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: theme === 'dark' ? '#4b5563' : '#e5e7eb' }}
            ></div>
            <span className="text-sm text-muted-foreground">Budget Limit</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
