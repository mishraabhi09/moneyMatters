import React from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingPlans from '@/components/PricingPlans';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-8">
          {/* Main Dashboard Content */}
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full h-auto gap-4 bg-transparent">
                  <TabsTrigger 
                    value="overview"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="transactions"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Transactions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Analytics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <h2 className="text-2xl font-bold mb-4">Overview Content</h2>
                  {/* Add your overview content here */}
                </TabsContent>

                <TabsContent value="transactions">
                  <h2 className="text-2xl font-bold mb-4">Transactions</h2>
                  {/* Add your transactions content here */}
                </TabsContent>

                <TabsContent value="analytics">
                  <h2 className="text-2xl font-bold mb-4">Analytics</h2>
                  {/* Add your analytics content here */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Pricing Plans Section */}
          <section className="bg-muted/50 py-12 -mx-4 sm:-mx-6">
            <div className="container mx-auto">
              <PricingPlans />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Mindful Money Mentor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard; 