"use client";

import { useState } from "react";
import { Bot, Send, User, TrendingUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { apiCall } from "@/lib/api";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm GrowWise AI, your personal financial advisor. Ask me anything about your spending, budget, or saving tips." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [isAdviceLoading, setIsAdviceLoading] = useState(false);
  const [adviceError, setAdviceError] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await apiCall("/ai/chat", "POST", { prompt: userMessage.content });
      setMessages((prev) => [...prev, { role: "assistant", content: res.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getInvestmentAdvice = async () => {
    setIsAdviceLoading(true);
    setAdviceError(null);
    try {
      const res = await apiCall("/ai/investment-advice");
      setAdvice(res.advice);
    } catch (error) {
      console.error(error);
      setAdviceError(error.message || "Failed to get advice");
    } finally {
      setIsAdviceLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-auto lg:h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6 pb-6 lg:pb-0">
      {/* Sidebar - Investment Advisor */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">AI Advisor</h1>
          <p className="text-muted-foreground mt-1 text-xs lg:text-sm">Personalized financial insights powered by Gemini.</p>
        </div>

        <Card className="border-emerald-100/50 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/10 shadow-sm">
          <CardHeader className="pb-3 p-4 lg:p-6">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
              Investment Advisor
            </CardTitle>
            <CardDescription className="text-[11px] lg:text-xs">
              Get secure investment suggestions based on your data.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6 pt-0 lg:pt-0">
            <Button 
              onClick={getInvestmentAdvice} 
              disabled={isAdviceLoading}
              variant="outline"
              className="w-full bg-background border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 h-9 text-xs"
            >
              {isAdviceLoading ? <RefreshCw className="h-3 w-3 animate-spin mr-2" /> : "Generate Suggestions"}
            </Button>

            {adviceError && (
              <p className="mt-3 text-xs text-destructive font-medium bg-destructive/10 p-2 rounded-lg border border-destructive/20">{adviceError}</p>
            )}

            {advice && (
              <div className="mt-4 p-3 bg-card rounded-xl border border-emerald-100 dark:border-emerald-900 text-[13px] leading-relaxed animate-in fade-in slide-in-from-top-2 duration-500 max-h-[300px] lg:max-h-96 overflow-y-auto">
                <div className="whitespace-pre-wrap text-foreground/90">
                  {advice}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col shadow-sm border-muted overflow-hidden h-[500px] lg:h-full">
        <CardHeader className="border-b bg-muted/20 py-3 lg:py-4 px-4 lg:px-6">
          <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
            <Bot className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
            Chat Session
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-muted/5">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2 lg:gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="h-7 w-7 lg:h-8 lg:w-8 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center shrink-0">
                  <Bot className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-emerald-700 dark:text-emerald-400" />
                </div>
              )}
              <div className={`max-w-[85%] lg:max-w-[80%] rounded-2xl px-3 py-2 lg:px-4 lg:py-3 text-[13px] lg:text-sm shadow-sm ${
                msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-card border text-foreground'
              }`}>
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="h-7 w-7 lg:h-8 lg:w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <User className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
               <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                </div>
                <div className="bg-card border text-foreground rounded-2xl px-4 py-3 text-sm flex items-center gap-1 shadow-sm">
                  <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-3 lg:p-4 border-t bg-card">
          <form onSubmit={handleSend} className="flex w-full gap-2">
            <Input 
              placeholder="Ask about your budget..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 rounded-full px-4 bg-muted/20 border-muted-foreground/20 focus-visible:ring-emerald-500 h-10 text-sm"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="rounded-full bg-emerald-600 hover:bg-emerald-700 h-10 w-10 shrink-0 shadow-sm">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
