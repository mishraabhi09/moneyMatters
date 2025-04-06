import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Subscription: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Choose Your Plan</h1>
          <p className="text-muted-foreground mt-1">Upgrade to unlock premium features and insights</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Free Plan */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>Basic financial tracking</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">₹0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Basic expense tracking</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Monthly insights</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Basic financial goals</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Check className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Check className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>AI financial advisor</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Current Plan</Button>
            </CardFooter>
          </Card>
          
          {/* Pro Plan */}
          <Card className="border-2 border-primary relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Popular
            </div>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Advanced financial management</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">₹499</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Advanced expense tracking</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Weekly insights & reports</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Unlimited financial goals</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>AI financial advisor</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Upgrade to Pro</Button>
            </CardFooter>
          </Card>
          
          {/* Enterprise Plan */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>Complete financial solution</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">₹999</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Daily insights & reports</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Custom financial goals</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  <span>Dedicated financial advisor</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="text-left">
              <h3 className="font-medium mb-2">Can I change my plan later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div className="text-left">
              <h3 className="font-medium mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
            </div>
            <div className="text-left">
              <h3 className="font-medium mb-2">How do I cancel my subscription?</h3>
              <p className="text-muted-foreground">You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.</p>
            </div>
            <div className="text-left">
              <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, UPI, and bank transfers for annual plans.</p>
            </div>
          </div>
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

export default Subscription; 