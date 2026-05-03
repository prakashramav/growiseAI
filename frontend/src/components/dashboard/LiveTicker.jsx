"use client";

import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp, RefreshCw } from "lucide-react";
import { apiCall } from "@/lib/api";

export default function LiveTicker() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchMarketData = async () => {
      try {
        const result = await apiCall("/market/live");
        if (isMounted && Array.isArray(result)) setData(result);
      } catch (err) {
        console.error("Failed to fetch live market data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Poll every 60s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading && data.length === 0) {
    return (
      <div className="w-full h-10 bg-muted/30 border-b flex items-center justify-center">
         <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (data.length === 0) return null;

  return (
    <div className="w-full bg-background border-b overflow-hidden flex items-center h-10 select-none relative z-40 shadow-sm">
      <div className="flex animate-marquee whitespace-nowrap">
        {data.concat(data).concat(data).map((item, index) => {
          const isPositive = item.change >= 0;
          return (
            <div key={`${item.symbol}-${index}`} className="flex items-center gap-2 mx-8 text-sm">
              <span className="font-bold text-foreground">{item.symbol}</span>
              <span className="text-muted-foreground">{item.currency === 'USD' ? '$' : ''}{Number(item.price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              <span className={`flex items-center text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-destructive'}`}>
                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(item.changePercent).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
