import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import SpendingChart from '@/components/SpendingChart';
import FinancialChatbot from '@/components/FinancialChatbot';

const Index: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(5200);

  // Function to update monthly income, passed to Dashboard
  const handleIncomeUpdate = (newIncome: number) => {
    setMonthlyIncome(newIncome);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome to Your Financial Wellness</h1>
          <p className="text-muted-foreground mt-1">Let's build better money habits together</p>
        </header>
        
        <section className="mb-8 animate-fade-in">
          <Dashboard onIncomeUpdate={handleIncomeUpdate} />
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <SpendingChart monthlyIncome={monthlyIncome} />
          </section>
          
          <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <FinancialChatbot />
          </section>
        </div>
      </main>
      
      <footer className="border-t mt-16 py-8 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center text-muted-foreground text-sm">
            <p>Money Matters © 2025 - AI-Driven Financial Behavior Modification</p>
            <p className="mt-1">Helping you build better financial habits one day at a time</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
