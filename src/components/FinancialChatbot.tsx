import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Gemini API configuration
const API_KEY = "AIzaSyCey25cVHUwGZ1Gr7Y8yz1g_0-sxiaZdS0";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

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

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your AI-powered financial assistant. I can help you manage your money better and provide savings recommendations. Would you like to share your monthly income with me to get personalized advice?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

// System prompt to guide the AI assistant

const systemPrompt = `You are a helpful and knowledgeable financial advisor. Your goal is to provide personalized financial advice based on the user's monthly income and financial situation. 

When the user provides their monthly income:
1. Recommend a budget breakdown using the 50/30/20 rule (50% needs, 30% wants, 20% savings)
2. Suggest specific savings strategies appropriate for their income level
3. Provide tips for reducing expenses
4. Recommend investment options if appropriate

Always be supportive, encouraging, and non-judgmental. Format your responses with clear sections, numbers, and bullet points where appropriate. Use the currency symbol ₹ for all monetary values.

If the user hasn't provided their monthly income yet, politely ask for it to provide personalized advice.`;


const FinancialChatbot: React.FC = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>('');
  const [incomeData, setIncomeData] = useState<IncomeData>({ amount: null, entered: false });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<{role: string, parts: {text: string}[]}[]>([
    { role: "model", parts: [{ text: initialMessages[0].content }] }
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Check if a string might contain a monthly income value
  const extractIncome = (text: string): number | null => {
    // Look for patterns like "₹5000", "5000", "5,000", "Rs. 5000", etc.
    const incomeRegex = /(?:₹|rs\.?|inr)\s*([0-9,]+(\.[0-9]+)?)|([0-9,]+(\.[0-9]+)?)/i;
    const match = text.match(incomeRegex);
    
    if (match) {
      // Remove commas and convert to number
      const income = parseFloat((match[1] || match[3]).replace(/,/g, ''));
      if (!isNaN(income) && income > 0) {
        return income;
      }
    }
    return null;
  };

  // Function to call the Gemini API
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Check if this is the first income message
      const extractedIncome = extractIncome(userMessage);
      if (extractedIncome && !incomeData.entered) {
        setIncomeData({ amount: extractedIncome, entered: true });
      }

      // Prepare message history for the API
      const updatedHistory = [
        ...chatHistory,
        { role: "user", parts: [{ text: userMessage }] }
      ];
      
      // If this is the first message with income, add a system prompt to guide the AI
      let prompt = userMessage;
      if (extractedIncome && !incomeData.entered) {
        prompt = `The user's monthly income is ₹${extractedIncome}. ${systemPrompt}`;
      }

      // Prepare the API request payload
      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      // Make the API request
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || 
                         "I'm sorry, I couldn't generate a response at this time. Please try again.";
      
      // Update chat history
      setChatHistory([
        ...updatedHistory,
        { role: "model", parts: [{ text: aiResponse }] }
      ]);
      
      return aiResponse;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return "I apologize, but I encountered an error while processing your request. Please try again later.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get AI response
      const botResponse = await generateAIResponse(input);
      
      // Add bot response message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in handleSend:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
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
                    ? 'bg-primary text-primary-foreground'
                    : theme === 'dark' 
                      ? 'bg-secondary text-secondary-foreground' 
                      : 'bg-muted text-foreground'
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
          {isLoading && (
            <div className="flex justify-start">
              <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                theme === 'dark' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'bg-muted text-foreground'
              }`}>
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
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
            disabled={isLoading}
            className="flex-grow"
          />
          <Button 
            onClick={handleSend} 
            size="icon" 
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FinancialChatbot;
