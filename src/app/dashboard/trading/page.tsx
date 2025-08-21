
"use client"

import { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LineChart as LineChartIcon, DollarSign, TrendingUp, TrendingDown, History } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from '@/components/ui/scroll-area';

const generateInitialData = () => {
  const data = [];
  let lastPrice = 150;
  const startTime = new Date();
  startTime.setMinutes(startTime.getMinutes() - 30);

  for (let i = 0; i < 30; i++) {
    const time = new Date(startTime.getTime() + i * 60000); // one point per minute
    lastPrice += (Math.random() - 0.5) * 5;
    lastPrice = Math.max(lastPrice, 20); // ensure price doesn't go too low
    data.push({ time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), price: parseFloat(lastPrice.toFixed(2)) });
  }
  return data;
};

interface Transaction {
    type: 'Buy' | 'Sell';
    price: number;
    time: string;
}

export default function TradingPage() {
  const [data, setData] = useState(generateInitialData());
  const [balance, setBalance] = useState(10000);
  const [shares, setShares] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  const currentPrice = useMemo(() => data[data.length - 1]?.price || 0, [data]);
  const portfolioValue = useMemo(() => shares * currentPrice, [shares, currentPrice]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        let lastPrice = newData[newData.length - 1].price;
        lastPrice += (Math.random() - 0.5) * 2;
        lastPrice = Math.max(lastPrice, 20);
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        newData.push({ time, price: parseFloat(lastPrice.toFixed(2)) });
        return newData;
      });
    }, 2000); // update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const handleBuy = () => {
    if (balance >= currentPrice) {
      setBalance(prev => prev - currentPrice);
      setShares(prev => prev + 1);
      const newTransaction: Transaction = { type: 'Buy', price: currentPrice, time: new Date().toLocaleTimeString() };
      setTransactions(prev => [newTransaction, ...prev]);
      toast({ title: 'Purchase Successful', description: `Bought 1 share at $${currentPrice.toFixed(2)}` });
    } else {
      toast({ variant: 'destructive', title: 'Insufficient Funds', description: 'You do not have enough money to buy.' });
    }
  };

  const handleSell = () => {
    if (shares > 0) {
      setBalance(prev => prev + currentPrice);
      setShares(prev => prev - 1);
      const newTransaction: Transaction = { type: 'Sell', price: currentPrice, time: new Date().toLocaleTimeString() };
      setTransactions(prev => [newTransaction, ...prev]);
      toast({ title: 'Sale Successful', description: `Sold 1 share at $${currentPrice.toFixed(2)}` });
    } else {
      toast({ variant: 'destructive', title: 'No Shares to Sell', description: 'You do not own any shares to sell.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <LineChartIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Trading Simulator</h1>
          <p className="text-muted-foreground">Practice buying and selling in a simulated market.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Market View (AYUSH/USD)</CardTitle>
                <CardDescription>Live price action of AyushCoin.</CardDescription>
            </CardHeader>
          <CardContent className="h-[400px] p-0 pr-4 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))" 
                  }}
                  labelStyle={{color: "hsl(var(--foreground))"}}
                />
                <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Your Wallet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Balance</span>
                        <span className="font-bold text-lg">${balance.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Shares Owned</span>
                        <span className="font-bold text-lg">{shares}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Portfolio Value</span>
                        <span className="font-bold text-lg">${portfolioValue.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between items-center border-t pt-4 mt-2">
                        <span className="text-muted-foreground font-bold">Total Value</span>
                        <span className="font-bold text-xl text-primary">${(balance + portfolioValue).toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <Button onClick={handleBuy} className="bg-green-600 hover:bg-green-700 text-white"><TrendingUp className="mr-2"/>Buy</Button>
                    <Button onClick={handleSell} variant="destructive"><TrendingDown className="mr-2"/>Sell</Button>
                </CardContent>
            </Card>
        </div>
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><History className="mr-2"/>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-[200px] w-full">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Time</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {transactions.length > 0 ? transactions.map((tx, index) => (
                        <TableRow key={index}>
                            <TableCell className={tx.type === 'Buy' ? 'text-green-500' : 'text-red-500'}>{tx.type}</TableCell>
                            <TableCell>${tx.price.toFixed(2)}</TableCell>
                            <TableCell>{tx.time}</TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground">No transactions yet.</TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
