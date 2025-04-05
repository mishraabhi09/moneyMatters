
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample user data showing behavior changes over time
const usersTestData = [
  {
    id: 1,
    name: "Priya Singh",
    age: 28,
    profession: "Software Engineer",
    startingSavingsRate: 5,
    currentSavingsRate: 22,
    monthlyProgress: [
      { month: "Jan", savingsRate: 5, expenses: 38000 },
      { month: "Feb", savingsRate: 8, expenses: 36000 },
      { month: "Mar", savingsRate: 12, expenses: 34500 },
      { month: "Apr", savingsRate: 15, expenses: 33000 },
      { month: "May", savingsRate: 19, expenses: 31200 },
      { month: "Jun", savingsRate: 22, expenses: 30500 }
    ],
    keyFindings: "Reduced dining out expenses by 40%. Started automatic savings transfers."
  },
  {
    id: 2,
    name: "Vikram Patel",
    age: 34,
    profession: "Marketing Manager",
    startingSavingsRate: 8,
    currentSavingsRate: 25,
    monthlyProgress: [
      { month: "Jan", savingsRate: 8, expenses: 45000 },
      { month: "Feb", savingsRate: 11, expenses: 43000 },
      { month: "Mar", savingsRate: 14, expenses: 42000 },
      { month: "Apr", savingsRate: 18, expenses: 40000 },
      { month: "May", savingsRate: 23, expenses: 38500 },
      { month: "Jun", savingsRate: 25, expenses: 37500 }
    ],
    keyFindings: "Consolidated multiple subscription services. Switched to a more affordable housing option."
  },
  {
    id: 3,
    name: "Anjali Sharma",
    age: 31,
    profession: "Healthcare Professional",
    startingSavingsRate: 10,
    currentSavingsRate: 24,
    monthlyProgress: [
      { month: "Jan", savingsRate: 10, expenses: 32000 },
      { month: "Feb", savingsRate: 13, expenses: 31500 },
      { month: "Mar", savingsRate: 15, expenses: 30000 },
      { month: "Apr", savingsRate: 18, expenses: 29500 },
      { month: "May", savingsRate: 21, expenses: 28000 },
      { month: "Jun", savingsRate: 24, expenses: 27000 }
    ],
    keyFindings: "Improved meal planning reduced grocery expenses by 30%. Negotiated lower insurance rates."
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    age: 42,
    profession: "Financial Analyst",
    startingSavingsRate: 15,
    currentSavingsRate: 32,
    monthlyProgress: [
      { month: "Jan", savingsRate: 15, expenses: 52000 },
      { month: "Feb", savingsRate: 19, expenses: 50000 },
      { month: "Mar", savingsRate: 23, expenses: 48000 },
      { month: "Apr", savingsRate: 26, expenses: 46500 },
      { month: "May", savingsRate: 30, expenses: 45000 },
      { month: "Jun", savingsRate: 32, expenses: 44000 }
    ],
    keyFindings: "Consolidated high-interest debt. Implemented a strict budget for discretionary spending."
  },
  {
    id: 5,
    name: "Meera Joshi",
    age: 29,
    profession: "UX Designer",
    startingSavingsRate: 7,
    currentSavingsRate: 21,
    monthlyProgress: [
      { month: "Jan", savingsRate: 7, expenses: 36000 },
      { month: "Feb", savingsRate: 10, expenses: 35000 },
      { month: "Mar", savingsRate: 14, expenses: 33500 },
      { month: "Apr", savingsRate: 16, expenses: 32000 },
      { month: "May", savingsRate: 19, expenses: 31000 },
      { month: "Jun", savingsRate: 21, expenses: 30000 }
    ],
    keyFindings: "Switched to public transport. Reduced online shopping impulse purchases by 50%."
  },
  {
    id: 6,
    name: "Sanjay Verma",
    age: 35,
    profession: "Teacher",
    startingSavingsRate: 12,
    currentSavingsRate: 28,
    monthlyProgress: [
      { month: "Jan", savingsRate: 12, expenses: 31000 },
      { month: "Feb", savingsRate: 15, expenses: 30000 },
      { month: "Mar", savingsRate: 19, expenses: 29000 },
      { month: "Apr", savingsRate: 22, expenses: 28500 },
      { month: "May", savingsRate: 25, expenses: 27500 },
      { month: "Jun", savingsRate: 28, expenses: 26000 }
    ],
    keyFindings: "Created and followed strict budget categories. Started side tutoring gig."
  },
  {
    id: 7,
    name: "Neha Kapoor",
    age: 27,
    profession: "Content Creator",
    startingSavingsRate: 3,
    currentSavingsRate: 19,
    monthlyProgress: [
      { month: "Jan", savingsRate: 3, expenses: 32000 },
      { month: "Feb", savingsRate: 7, expenses: 31000 },
      { month: "Mar", savingsRate: 12, expenses: 29500 },
      { month: "Apr", savingsRate: 15, expenses: 28000 },
      { month: "May", savingsRate: 17, expenses: 27000 },
      { month: "Jun", savingsRate: 19, expenses: 26500 }
    ],
    keyFindings: "Implemented a 24-hour rule for non-essential purchases. Refinanced student loans."
  },
  {
    id: 8,
    name: "Amit Chowdhury",
    age: 33,
    profession: "Product Manager",
    startingSavingsRate: 9,
    currentSavingsRate: 26,
    monthlyProgress: [
      { month: "Jan", savingsRate: 9, expenses: 45000 },
      { month: "Feb", savingsRate: 13, expenses: 43000 },
      { month: "Mar", savingsRate: 17, expenses: 41500 },
      { month: "Apr", savingsRate: 20, expenses: 40000 },
      { month: "May", savingsRate: 23, expenses: 38500 },
      { month: "Jun", savingsRate: 26, expenses: 37000 }
    ],
    keyFindings: "Started tracking all expenses with the app. Eliminated unused gym memberships and subscriptions."
  }
];

// Calculate average progress across all users
const averageProgress = [
  { month: "Jan", savingsRate: 0, expenses: 0 },
  { month: "Feb", savingsRate: 0, expenses: 0 },
  { month: "Mar", savingsRate: 0, expenses: 0 },
  { month: "Apr", savingsRate: 0, expenses: 0 },
  { month: "May", savingsRate: 0, expenses: 0 },
  { month: "Jun", savingsRate: 0, expenses: 0 },
];

usersTestData.forEach(user => {
  user.monthlyProgress.forEach((month, index) => {
    averageProgress[index].savingsRate += month.savingsRate / usersTestData.length;
    averageProgress[index].expenses += month.expenses / usersTestData.length;
  });
});

// Format the average values
averageProgress.forEach(month => {
  month.savingsRate = parseFloat(month.savingsRate.toFixed(1));
  month.expenses = Math.round(month.expenses);
});

const UserReport: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-navy-800">User Testing Report</CardTitle>
          <CardDescription>
            Analysis of spending behavior changes for 8 participants over a 6-month period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Starting Savings Rate</CardDescription>
                <CardTitle className="text-2xl">
                  {usersTestData.reduce((acc, user) => acc + user.startingSavingsRate, 0) / usersTestData.length}%
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Current Savings Rate</CardDescription>
                <CardTitle className="text-2xl text-teal-500">
                  {usersTestData.reduce((acc, user) => acc + user.currentSavingsRate, 0) / usersTestData.length}%
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Improvement</CardDescription>
                <CardTitle className="text-2xl text-teal-500">
                  {(usersTestData.reduce((acc, user) => acc + (user.currentSavingsRate - user.startingSavingsRate), 0) / usersTestData.length).toFixed(1)}%
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={averageProgress}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" label={{ value: 'Savings Rate (%)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Expenses (₹)', angle: -90, position: 'insideRight' }} />
                <Tooltip formatter={(value, name) => {
                  if (name === "savingsRate") return [`${value}%`, "Savings Rate"];
                  if (name === "expenses") return [`₹${value.toLocaleString()}`, "Expenses"];
                  return [value, name];
                }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="savingsRate" stroke="#2dd4bf" name="Savings Rate" />
                <Line yAxisId="right" type="monotone" dataKey="expenses" stroke="#f87171" name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Profession</TableHead>
                  <TableHead>Starting Rate</TableHead>
                  <TableHead>Current Rate</TableHead>
                  <TableHead>Improvement</TableHead>
                  <TableHead>Key Findings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersTestData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.profession}</TableCell>
                    <TableCell>{user.startingSavingsRate}%</TableCell>
                    <TableCell className="text-teal-600 font-medium">{user.currentSavingsRate}%</TableCell>
                    <TableCell className="text-teal-600 font-medium">+{user.currentSavingsRate - user.startingSavingsRate}%</TableCell>
                    <TableCell className="max-w-xs">{user.keyFindings}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserReport;
