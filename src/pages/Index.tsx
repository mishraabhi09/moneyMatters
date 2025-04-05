
import React from 'react';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import SpendingChart from '@/components/SpendingChart';
import UserReport from '@/components/UserReport';
import GoalSetting from '@/components/GoalSetting';
import FinancialChatbot from '@/components/FinancialChatbot';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-navy-800">Welcome to Your Financial Wellness</h1>
          <p className="text-gray-600 mt-1">Let's build better money habits together</p>
        </header>
        
        <section className="mb-8 animate-fade-in">
          <Dashboard />
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <SpendingChart />
          </section>
          
          <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <FinancialChatbot />
          </section>
        </div>
        
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <UserReport />
        </section>
        
        <section className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <GoalSetting />
        </section>
      </main>
      
      <footer className="border-t mt-16 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center text-gray-500 text-sm">
            <p>Mindful Money Mentor © 2025 - AI-Driven Financial Behavior Modification</p>
            <p className="mt-1">Helping you build better financial habits one day at a time</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
