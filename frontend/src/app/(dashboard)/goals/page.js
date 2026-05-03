"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/lib/api";
import { PlusCircle, Target, AlertCircle, RefreshCw, TrendingUp } from "lucide-react";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Add Funds State
  const [addingFundsId, setAddingFundsId] = useState(null);
  const [fundAmount, setFundAmount] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  const fetchGoals = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiCall("/goals");
      setGoals(data);
    } catch (err) {
      setError("Failed to load goals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    if (!targetAmount || isNaN(targetAmount) || Number(targetAmount) <= 0) {
      setError("Please enter a valid target amount.");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      await apiCall("/goals", "POST", { 
        title, 
        targetAmount: Number(targetAmount), 
        deadline: new Date(deadline).toISOString() 
      });
      setTitle("");
      setTargetAmount("");
      setDeadline("");
      setShowForm(false);
      fetchGoals();
    } catch (err) {
      setError(err.message || "Failed to create goal.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddFunds = async (goal, e) => {
    e.preventDefault();
    if (!fundAmount || isNaN(fundAmount) || Number(fundAmount) <= 0) return;

    try {
      setAddingFundsId(null);
      const newSavedAmount = goal.savedAmount + Number(fundAmount);
      await apiCall(`/goals/${goal._id}`, "PUT", { savedAmount: newSavedAmount });
      setFundAmount("");
      fetchGoals();
    } catch (err) {
      setError("Failed to add funds. Please try again.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goals</h1>
          <p className="text-muted-foreground mt-1">Set saving targets and track your progress.</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-emerald-600 hover:bg-emerald-700 self-start sm:self-auto"
        >
          {showForm ? "Cancel" : <><PlusCircle className="mr-2 h-4 w-4" /> Create Goal</>}
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
            <CardTitle>Create New Goal</CardTitle>
            <CardDescription>What are you saving for?</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Goal Title</label>
                  <input 
                    type="text" 
                    required
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. New Car, Vacation"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Amount ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0.01"
                    required
                    value={targetAmount} 
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="e.g. 5000"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Date</label>
                  <input 
                    type="date" 
                    required
                    value={deadline} 
                    onChange={(e) => setDeadline(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  {isSubmitting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : "Save Goal"}
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
      ) : goals.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No goals set</h3>
            <p className="text-muted-foreground mb-4">Start saving for your dreams today.</p>
            <Button variant="outline" onClick={() => setShowForm(true)}>Create your first goal</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const percentage = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
            const isCompleted = percentage >= 100;
            const daysRemaining = Math.max(0, Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)));

            return (
              <Card key={goal._id} className={`overflow-hidden hover:shadow-md transition-shadow ${isCompleted ? 'border-emerald-500/50 bg-emerald-500/5' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription>
                        {isCompleted ? "Goal Reached! 🎉" : `${daysRemaining} days left`}
                      </CardDescription>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end mb-2">
                    <div className="text-2xl font-bold">${goal.savedAmount.toFixed(2)}</div>
                    <div className="text-sm font-medium text-muted-foreground">/ ${goal.targetAmount.toFixed(2)}</div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-4">
                    <div 
                      className={`h-full ${isCompleted ? 'bg-emerald-500' : 'bg-primary'} transition-all duration-500`} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  
                  {addingFundsId === goal._id && !isCompleted ? (
                    <form onSubmit={(e) => handleAddFunds(goal, e)} className="flex items-center gap-2 mt-4 animate-in slide-in-from-top-2">
                      <input 
                        type="number" 
                        step="0.01"
                        min="0.01"
                        required
                        autoFocus
                        value={fundAmount} 
                        onChange={(e) => setFundAmount(e.target.value)}
                        placeholder="Amount"
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                      <Button type="submit" size="sm" className="h-9">Add</Button>
                      <Button type="button" variant="ghost" size="sm" className="h-9" onClick={() => setAddingFundsId(null)}>Cancel</Button>
                    </form>
                  ) : (
                    <div className="flex justify-between items-center text-xs mt-4">
                      <span className="text-muted-foreground">{percentage.toFixed(0)}% reached</span>
                      {!isCompleted && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 text-xs" 
                          onClick={() => {
                            setAddingFundsId(goal._id);
                            setFundAmount("");
                          }}
                        >
                          <TrendingUp className="h-3 w-3 mr-1" /> Add Funds
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
