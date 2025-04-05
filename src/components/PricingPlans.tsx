import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  recommended?: boolean;
  buttonText: string;
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: 0,
    description: "Perfect for getting started with basic expense tracking",
    features: [
      { text: "Basic expense tracking", included: true },
      { text: "Monthly spending insights", included: true },
      { text: "Basic budget categories", included: true },
      { text: "Email support", included: true },
      { text: "Advanced analytics", included: false },
      { text: "Custom categories", included: false },
      { text: "Priority support", included: false },
      { text: "Financial advisor access", included: false },
    ],
    buttonText: "Start Free"
  },
  {
    name: "Pro",
    price: 299,
    description: "Ideal for users who want advanced features and insights",
    features: [
      { text: "Basic expense tracking", included: true },
      { text: "Monthly spending insights", included: true },
      { text: "Basic budget categories", included: true },
      { text: "Email support", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom categories", included: true },
      { text: "Priority support", included: false },
      { text: "Financial advisor access", included: false },
    ],
    recommended: true,
    buttonText: "Try Pro"
  },
  {
    name: "Premium",
    price: 599,
    description: "Complete financial management with personal guidance",
    features: [
      { text: "Basic expense tracking", included: true },
      { text: "Monthly spending insights", included: true },
      { text: "Basic budget categories", included: true },
      { text: "Email support", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom categories", included: true },
      { text: "Priority support", included: true },
      { text: "Financial advisor access", included: true },
    ],
    buttonText: "Get Premium"
  }
];

const PricingPlans: React.FC = () => {
  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
        <p className="text-muted-foreground">
          Select the perfect plan to help you achieve your financial goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={`relative ${
              plan.recommended 
                ? 'border-primary shadow-lg scale-105' 
                : 'border-border'
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Recommended
                </span>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li 
                    key={index} 
                    className={`flex items-center gap-2 ${
                      feature.included ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <Check className={`h-4 w-4 ${
                      feature.included ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    {feature.text}
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                className={`w-full ${
                  plan.recommended 
                    ? 'bg-primary hover:bg-primary/90' 
                    : ''
                }`}
                variant={plan.recommended ? 'default' : 'outline'}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans; 