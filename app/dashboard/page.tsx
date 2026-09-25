"use client";

import { useMemo, useState } from "react";
import { Activity, DollarSign, Pause, Play, Settings, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trades = [
  { time: "14:32", strategy: "Matches", side: "Buy", amount: "$10", result: "Won", profit: "+$9.50" },
  { time: "14:30", strategy: "Differs", side: "Sell", amount: "$12", result: "Lost", profit: "-$12.00" },
  { time: "14:28", strategy: "Over/Under", side: "Buy", amount: "$18", result: "Won", profit: "+$17.10" },
  { time: "14:22", strategy: "Even/Odd", side: "Sell", amount: "$15", result: "Won", profit: "+$14.25" },
];

export default function DashboardPage() {
  const [running, setRunning] = useState(true);

  const stats = useMemo(
    () => [
      { label: "Total profit", value: "$12,450.50", delta: "+12.5%", icon: DollarSign },
      { label: "Win rate", value: "65.8%", delta: "+2.3%", icon: TrendingUp },
      { label: "Trades today", value: "1,243", delta: "+156", icon: Activity },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-xl font-bold">RBot Dashboard</div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
            <Button onClick={() => setRunning((value) => !value)} className={running ? "bg-rose-500 hover:bg-rose-400" : "bg-emerald-500 hover:bg-emerald-400"}>
              {running ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {running ? "Stop bot" : "Start bot"}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className={`rounded-2xl border p-4 ${running ? "border-emerald-500/30 bg-emerald-500/10" : "border-amber-500/30 bg-amber-500/10"}`}>
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${running ? "bg-emerald-400" : "bg-amber-400"}`} />
            <div>
              <div className="font-semibold">Bot status: {running ? "Running" : "Paused"}</div>
              <div className="text-sm text-slate-300">{running ? "Auto-trading is active across all enabled strategies." : "Bot is paused. Resume anytime from the control panel."}</div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map(({ label, value, delta, icon: Icon }) => (
            <Card key={label} className="border-slate-800 bg-slate-900">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Icon className="h-4 w-4 text-cyan-400" />
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{value}</div>
                <div className="mt-2 text-sm text-emerald-400">{delta}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <Card className="border-slate-800 bg-slate-900">
            <CardHeader>
              <CardTitle>Profit & loss trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-end gap-3">
                {[24, 40, 52, 36, 68, 72, 88].map((height, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center justify-end gap-3">
                    <div className="w-full rounded-t-xl bg-gradient-to-t from-cyan-500 to-blue-500" style={{ height: `${height}%` }} />
                    <div className="text-xs text-slate-400">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900">
            <CardHeader>
              <CardTitle>Active strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Matches", status: "active", trades: 342 },
                { name: "Differs", status: "active", trades: 287 },
                { name: "Over/Under", status: "paused", trades: 156 },
                { name: "Even/Odd", status: "active", trades: 458 },
              ].map((strategy) => (
                <div key={strategy.name} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${strategy.status === "active" ? "bg-emerald-400" : "bg-slate-500"}`} />
                    <div>
                      <div className="font-medium text-white">{strategy.name}</div>
                      <div className="text-xs text-slate-400">{strategy.trades} trades</div>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-wide text-slate-300">{strategy.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-800 bg-slate-900">
          <CardHeader>
            <CardTitle>Recent trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-400">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">Time</th>
                    <th className="pb-3 pr-4 font-medium">Strategy</th>
                    <th className="pb-3 pr-4 font-medium">Side</th>
                    <th className="pb-3 pr-4 font-medium">Amount</th>
                    <th className="pb-3 pr-4 font-medium">Result</th>
                    <th className="pb-3 font-medium">P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade) => (
                    <tr key={`${trade.time}-${trade.strategy}`} className="border-t border-slate-800 text-slate-200">
                      <td className="py-3 pr-4">{trade.time}</td>
                      <td className="py-3 pr-4">{trade.strategy}</td>
                      <td className="py-3 pr-4">{trade.side}</td>
                      <td className="py-3 pr-4">{trade.amount}</td>
                      <td className="py-3 pr-4">
                        <span className={`rounded-full px-2 py-1 text-xs ${trade.result === "Won" ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>
                          {trade.result}
                        </span>
                      </td>
                      <td className={`py-3 font-medium ${trade.profit.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}>{trade.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
