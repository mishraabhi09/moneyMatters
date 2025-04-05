import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, PiggyBank, CreditCard, TrendingUp, AlertTriangle, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DashboardProps {
  onIncomeUpdate?: (newIncome: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onIncomeUpdate }) => {
  const [financialData, setFinancialData] = useState({
    totalBalance: 24650,
    monthlyIncome: 5200,
    monthlyExpenses: 3750,
    savingsRate: 27.8,
    riskScore: 42,
    insightMessage: "You're spending 30% more on dining out compared to last month."
  });

  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [newBalance, setNewBalance] = useState<number>(financialData.totalBalance);
  const [newIncome, setNewIncome] = useState<number>(financialData.monthlyIncome);

  // Recalculate expenses and savings rate whenever the income changes
  useEffect(() => {
    const savingsAmount = financialData.monthlyIncome - financialData.monthlyExpenses;
    const savingsRate = (savingsAmount / financialData.monthlyIncome) * 100;
    
    setFinancialData(prev => ({
      ...prev,
      savingsRate: parseFloat(savingsRate.toFixed(1))
    }));
  }, [financialData.monthlyIncome, financialData.monthlyExpenses]);

  const handleBalanceUpdate = () => {
    setFinancialData(prev => ({
      ...prev,
      totalBalance: newBalance
    }));
    setIsEditingBalance(false);
  };

  const handleIncomeUpdate = () => {
    // Calculate new expenses as a percentage of the previous expenses to income ratio
    const expenseRatio = financialData.monthlyExpenses / financialData.monthlyIncome;
    const newExpenses = parseFloat((newIncome * expenseRatio).toFixed(0));
    
    setFinancialData(prev => ({
      ...prev,
      monthlyIncome: newIncome,
      monthlyExpenses: newExpenses,
      // Savings rate will be updated by the useEffect
    }));

    // Notify parent component about the income change
    if (onIncomeUpdate) {
      onIncomeUpdate(newIncome);
    }
    
    setIsEditingIncome(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Balance Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardDescription>Total Balance</CardDescription>
              <Button variant="ghost" size="icon" onClick={() => setIsEditingBalance(true)}>
                <Edit2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            <CardTitle className="text-2xl">
              ₹{financialData.totalBalance.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <PiggyBank className="h-4 w-4 mr-1 text-primary" />
              <span className="text-muted-foreground">Across all accounts</span>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Income Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardDescription>Monthly Income</CardDescription>
              <Button variant="ghost" size="icon" onClick={() => setIsEditingIncome(true)}>
                <Edit2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            <CardTitle className="text-2xl">
              ₹{financialData.monthlyIncome.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-600 dark:text-green-400">+5% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Expenses Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Expenses</CardDescription>
            <CardTitle className="text-2xl">
              ₹{financialData.monthlyExpenses.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <ArrowDownRight className="h-4 w-4 mr-1 text-amber-500" />
              <span className="text-amber-600 dark:text-amber-400">-3% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Savings Rate Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Savings Rate</CardDescription>
            <CardTitle className="text-2xl">
              {financialData.savingsRate}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 mr-1 text-primary" />
              <span className="text-primary">Great! Target: 20%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Balance Dialog */}
      <Dialog open={isEditingBalance} onOpenChange={setIsEditingBalance}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Total Balance</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="total-balance">Enter your current total balance</Label>
            <Input 
              id="total-balance" 
              type="number" 
              className="mt-2"
              value={newBalance}
              onChange={(e) => setNewBalance(parseFloat(e.target.value))}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingBalance(false)}>Cancel</Button>
            <Button onClick={handleBalanceUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Income Dialog */}
      <Dialog open={isEditingIncome} onOpenChange={setIsEditingIncome}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Monthly Income</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="monthly-income">Enter your monthly income</Label>
            <Input 
              id="monthly-income" 
              type="number" 
              className="mt-2"
              value={newIncome}
              onChange={(e) => setNewIncome(parseFloat(e.target.value))}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Note: Your monthly expenses and savings rate will be automatically recalculated.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingIncome(false)}>Cancel</Button>
            <Button onClick={handleIncomeUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;
