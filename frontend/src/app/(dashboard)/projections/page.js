"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, Briefcase, Bitcoin, LineChart as ChartIcon } from "lucide-react";

// Assumed historical annualized returns (for projection purposes)
const RATES = {
  Stocks: 0.10,      // 10% (e.g., S&P 500)
  MutualFunds: 0.12, // 12% (Active/Blend Equity)
  SIP: 0.15,         // 15% (Aggressive Equity SIP)
  Crypto: 0.30,      // 30% (Altcoins/Blend)
  Bitcoin: 0.40      // 40% (Historical Bitcoin avg)
};

const COLORS = {
  Stocks: "#3b82f6",      // Blue
  MutualFunds: "#8b5cf6", // Purple
  SIP: "#10b981",         // Emerald
  Crypto: "#f43f5e",      // Rose
  Bitcoin: "#f59e0b"      // Amber
};

export default function ProjectionsPage() {
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);

  // Future Value Formula: FV = P(1 + r/n)^(nt) + PMT * (((1 + r/n)^(nt) - 1) / (r/n))
  // n = 12 (compounded monthly)
  const calculateFV = (P, PMT, r, t) => {
    const n = 12;
    const ratePerPeriod = r / n;
    const totalPeriods = n * t;
    
    // If rate is 0 to avoid division by zero
    if (r === 0) return P + (PMT * totalPeriods);
    
    const compoundPrincipal = P * Math.pow(1 + ratePerPeriod, totalPeriods);
    const compoundPMT = PMT * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);
    
    return compoundPrincipal + compoundPMT;
  };

  // Generate data for the chart (0 to 10 years)
  const chartData = useMemo(() => {
    const data = [];
    const P = Number(initialInvestment) || 0;
    const PMT = Number(monthlyContribution) || 0;

    for (let year = 0; year <= 10; year++) {
      data.push({
        year: `Year ${year}`,
        Stocks: Math.round(calculateFV(P, PMT, RATES.Stocks, year)),
        MutualFunds: Math.round(calculateFV(P, PMT, RATES.MutualFunds, year)),
        SIP: Math.round(calculateFV(P, PMT, RATES.SIP, year)),
        Crypto: Math.round(calculateFV(P, PMT, RATES.Crypto, year)),
        Bitcoin: Math.round(calculateFV(P, PMT, RATES.Bitcoin, year)),
      });
    }
    return data;
  }, [initialInvestment, monthlyContribution]);

  // Generate snapshot data for the table
  const snapshots = [1, 5, 10].map(year => {
    const P = Number(initialInvestment) || 0;
    const PMT = Number(monthlyContribution) || 0;
    const totalInvested = P + (PMT * 12 * year);
    
    return {
      year,
      totalInvested,
      Stocks: calculateFV(P, PMT, RATES.Stocks, year),
      MutualFunds: calculateFV(P, PMT, RATES.MutualFunds, year),
      SIP: calculateFV(P, PMT, RATES.SIP, year),
      Crypto: calculateFV(P, PMT, RATES.Crypto, year),
      Bitcoin: calculateFV(P, PMT, RATES.Bitcoin, year),
    };
  });

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
    return `$${value.toFixed(0)}`;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Investment Projections</h1>
        <p className="text-muted-foreground mt-1">Forecast your wealth growth across different asset classes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Parameters */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-emerald-500" /> Investment Plan</CardTitle>
            <CardDescription>Adjust your starting amount and monthly SIP to see the projected impact.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                Initial Investment
                <span className="text-emerald-600 font-bold">${initialInvestment}</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="500"
                value={initialInvestment} 
                onChange={(e) => setInitialInvestment(e.target.value)}
                className="w-full accent-emerald-600"
              />
              <input 
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                Monthly Contribution (SIP)
                <span className="text-emerald-600 font-bold">${monthlyContribution}</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="50"
                value={monthlyContribution} 
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full accent-emerald-600"
              />
              <input 
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="p-4 bg-muted/50 rounded-xl border border-white/5 text-sm">
              <p className="text-muted-foreground mb-2"><strong className="text-foreground">Disclaimer:</strong> These projections are based on historical annualized averages and do not guarantee future performance. Cryptocurrencies are highly volatile.</p>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                <li>Stocks: 10%</li>
                <li>Mutual Funds: 12%</li>
                <li>SIP: 15%</li>
                <li>Crypto: 30%</li>
                <li>Bitcoin: 40%</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> 10-Year Growth Trajectory</CardTitle>
            <CardDescription>Visualizing the power of compound interest.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0 min-h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{fill: 'hsl(var(--muted-foreground))'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: 'hsl(var(--muted-foreground))'}} axisLine={false} tickLine={false} tickFormatter={formatCurrency} />
                  <RechartsTooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Legend />
                  {Object.keys(RATES).map((key) => (
                    <Line 
                      key={key}
                      type="monotone" 
                      dataKey={key} 
                      stroke={COLORS[key]} 
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {snapshots.map((snap) => (
          <Card key={snap.year} className="overflow-hidden border-t-4 border-t-primary/50 hover:shadow-md transition-shadow">
            <CardHeader className="bg-muted/10 pb-4">
              <CardTitle className="text-xl">After {snap.year} Year{snap.year > 1 ? 's' : ''}</CardTitle>
              <CardDescription>Total Invested: <strong className="text-foreground">${snap.totalInvested.toLocaleString()}</strong></CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {Object.keys(RATES).map((key) => {
                const projectedValue = snap[key];
                const profit = projectedValue - snap.totalInvested;
                const roi = ((profit / snap.totalInvested) * 100).toFixed(1);
                
                let Icon = ChartIcon;
                if (key === 'Bitcoin' || key === 'Crypto') Icon = Bitcoin;
                else if (key === 'Stocks') Icon = TrendingUp;
                else if (key === 'MutualFunds') Icon = Briefcase;

                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[key] }}></div>
                      <div>
                        <p className="text-sm font-medium">{key}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                           <Icon className="h-3 w-3" /> {RATES[key] * 100}% p.a.
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">${Math.round(projectedValue).toLocaleString()}</p>
                      <p className="text-xs text-emerald-500 font-medium">+{roi}%</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
