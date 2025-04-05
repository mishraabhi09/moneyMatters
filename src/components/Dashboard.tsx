
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, PiggyBank, CreditCard, TrendingUp, AlertTriangle } from "lucide-react";

const financialData = {
  totalBalance: 24650,
  monthlyIncome: 5200,
  monthlyExpenses: 3750,
  savingsRate: 27.8,
  riskScore: 42,
  insightMessage: "You're spending 30% more on dining out compared to last month."
};

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Balance Card */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Total Balance</CardDescription>
          <CardTitle className="text-2xl text-navy-800">
            ₹{financialData.totalBalance.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm">
            <PiggyBank className="h-4 w-4 mr-1 text-teal-500" />
            <span className="text-gray-600">Across all accounts</span>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Income Card */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Monthly Income</CardDescription>
          <CardTitle className="text-2xl text-navy-800">
            ₹{financialData.monthlyIncome.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm">
            <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
            <span className="text-green-600">+5% from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Expenses Card */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Monthly Expenses</CardDescription>
          <CardTitle className="text-2xl text-navy-800">
            ₹{financialData.monthlyExpenses.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm">
            <ArrowDownRight className="h-4 w-4 mr-1 text-amber-500" />
            <span className="text-amber-600">-3% from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Savings Rate Card */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Savings Rate</CardDescription>
          <CardTitle className="text-2xl text-navy-800">
            {financialData.savingsRate}%
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm">
            <TrendingUp className="h-4 w-4 mr-1 text-teal-500" />
            <span className="text-teal-600">Great! Target: 20%</span>
          </div>
        </CardContent>
      </Card>

      {/* Behavioral Insight Card */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-4 shadow-md bg-gradient-to-r from-navy-50 to-teal-50">
        <CardHeader>
          <CardTitle className="text-navy-800">AI Behavioral Insight</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-1" />
            <p className="text-gray-700">
              {financialData.insightMessage} <br />
              <span className="text-sm text-gray-600">
                Try setting a dining budget and tracking each meal to create awareness of this spending pattern.
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-navy-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              See Details
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600">
              Set Budget
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
