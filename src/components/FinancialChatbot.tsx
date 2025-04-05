
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: 'bot' | 'user';
  timestamp: Date;
};

type IncomeData = {
  amount: number | null;
  entered: boolean;
};

const financialAdvice = [
  "Try using the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.",
  "Consider automating your savings by setting up automatic transfers on payday.",
  "Look for small expenses that add up over time, like daily coffee purchases or subscription services.",
  "Create an emergency fund that covers 3-6 months of essential expenses.",
  "Review your subscriptions regularly and cancel those you don't use frequently.",
  "Try meal planning to reduce food waste and eating out expenses.",
  "Consider using cash for discretionary spending to be more mindful of purchases.",
  "Review your insurance policies annually to ensure you're not overpaying.",
  "Look into tax-saving investments that can help you save money while planning for the future.",
  "Track every expense for a month to identify areas where you can cut back."
];

const generateAdvice = (income: number | null): string => {
  if (income === null) return "Please share your monthly income so I can provide personalized advice.";
  
  const advice = [];

  // Basic saving target
  const savingTarget = income * 0.20;
  advice.push(`Based on your monthly income of ₹${income.toLocaleString()}, you should aim to save at least ₹${savingTarget.toLocaleString()} (20%) each month.`);
  
  // Budget breakdown
  const needs = income * 0.5;
  const wants = income * 0.3;
  const savings = income * 0.2;
  
  advice.push(`Here's a recommended budget breakdown:
- Needs (rent, groceries, utilities): ₹${needs.toLocaleString()} (50%)
- Wants (entertainment, dining out): ₹${wants.toLocaleString()} (30%)
- Savings and debt repayment: ₹${savings.toLocaleString()} (20%)`);

  // Add random personalized advice
  advice.push(financialAdvice[Math.floor(Math.random() * financialAdvice.length)]);

  return advice.join("\n\n");
};

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your financial assistant. I can help you manage your money better and provide savings recommendations. Would you like to share your monthly income with me to get personalized advice?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

const FinancialChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>('');
  const [incomeData, setIncomeData] = useState<IncomeData>({ amount: null, entered: false });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Check if user is entering income
    let income: number | null = null;
    const parsedIncome = parseFloat(input.replace(/[^\d.]/g, ''));
    const isIncomeMessage = !incomeData.entered && !isNaN(parsedIncome) && parsedIncome > 0;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Process the message
    setTimeout(() => {
      let botResponse: string;
      
      if (isIncomeMessage) {
        // User entered their income
        setIncomeData({ amount: parsedIncome, entered: true });
        botResponse = `Thank you for sharing your monthly income of ₹${parsedIncome.toLocaleString()}. Here's my personalized advice:\n\n${generateAdvice(parsedIncome)}`;
      } else if (incomeData.entered) {
        // User has already entered income, give personalized advice
        botResponse = generateAdvice(incomeData.amount);
      } else {
        // Still waiting for income
        botResponse = "To provide personalized recommendations, I need to know your monthly income. Could you please enter your monthly income?";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Card className="shadow-md h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-navy-800 flex items-center gap-2">
          <Bot className="h-5 w-5 text-teal-500" />
          Financial Assistant
        </CardTitle>
        <CardDescription>Get personalized financial advice and savings tips</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === 'bot' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-xs opacity-75">
                    {message.sender === 'user' ? 'You' : 'Assistant'}
                  </span>
                </div>
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Ask for financial advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-grow"
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FinancialChatbot;
