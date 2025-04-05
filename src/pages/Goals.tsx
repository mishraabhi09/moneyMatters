import React from 'react';
import Navbar from '@/components/Navbar';
import GoalSetting from '@/components/GoalSetting';

const Goals: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Financial Goals</h1>
          <p className="text-muted-foreground mt-1">Track and manage your financial aspirations</p>
        </header>
        
        <section className="mb-8 animate-fade-in">
          <GoalSetting />
        </section>
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

export default Goals; 