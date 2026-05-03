"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/lib/api";
import { PlusCircle, Wallet, AlertCircle, RefreshCw } from "lucide-react";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [category, setCategory] = useState("Dining");
  const [limit, setLimit] = useState("");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

  const categories = ["Dining", "Groceries", "Utilities", "Entertainment", "Transportation", "Shopping", "Other"];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [budgetsData, txData] = await Promise.all([
        apiCall("/budgets"),
        apiCall("/transactions")
      ]);
      setBudgets(budgetsData);
      setTransactions(txData);
    } catch (err) {
      setError("Failed to load budgets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateBudget = async (e) => {
    e.preventDefault();
    if (!limit || isNaN(limit) || Number(limit) <= 0) {
      setError("Please enter a valid limit.");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      await apiCall("/budgets", "POST", { category, limit: Number(limit), month });
      setCategory("Dining");
      setLimit("");
      setShowForm(false);
      fetchData(); // Refresh list
    } catch (err) {
      setError(err.message || "Failed to create budget.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate spent amount for a budget
  const calculateSpent = (budget) => {
    return transactions
      .filter(tx => tx.category === budget.category && tx.date.startsWith(budget.month) && tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground mt-1">Set limits and track your monthly spending.</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-emerald-600 hover:bg-emerald-700 self-start sm:self-auto"
        >
          {showForm ? "Cancel" : <><PlusCircle className="mr-2 h-4 w-4" /> Create Budget</>}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      {showForm && (
        <Card className="border-emerald-500/20 shadow-lg shadow-emerald-500/5 animate-in slide-in-from-top-4 fade-in duration-300">
          <CardHeader>
            <CardTitle>Create New Budget</CardTitle>
            <CardDescription>Set a spending limit for a specific category and month.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateBudget} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Limit Amount ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0.01"
                    required
                    value={limit} 
                    onChange={(e) => setLimit(e.target.value)}
                    placeholder="e.g. 500"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Month</label>
                  <input 
                    type="month" 
                    required
                    value={month} 
                    onChange={(e) => setMonth(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  {isSubmitting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : "Save Budget"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : budgets.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Wallet className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No budgets found</h3>
            <p className="text-muted-foreground mb-4">You haven't set any budgets yet.</p>
            <Button variant="outline" onClick={() => setShowForm(true)}>Create your first budget</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => {
            const spent = calculateSpent(budget);
            const percentage = Math.min((spent / budget.limit) * 100, 100);
            const isNearLimit = percentage >= 80 && percentage < 100;
            const isExceeded = percentage >= 100;
            
            let progressColor = "bg-emerald-500";
            if (isExceeded) progressColor = "bg-destructive";
            else if (isNearLimit) progressColor = "bg-amber-500";

            return (
              <Card key={budget._id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{budget.category}</CardTitle>
                      <CardDescription>{new Date(budget.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</CardDescription>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      {isExceeded ? <AlertCircle className="h-4 w-4 text-destructive" /> : <Wallet className="h-4 w-4 text-emerald-600" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end mb-2">
                    <div className="text-2xl font-bold">${spent.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">spent</span></div>
                    <div className="text-sm font-medium text-muted-foreground">/ ${budget.limit.toFixed(2)}</div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full ${progressColor} transition-all duration-500`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{percentage.toFixed(0)}% used</span>
                    <span>${Math.max(budget.limit - spent, 0).toFixed(2)} remaining</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
