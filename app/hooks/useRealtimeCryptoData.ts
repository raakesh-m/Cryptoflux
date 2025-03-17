'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Generate realistic price movements
const generateRealisticPriceChange = (basePrice: number) => {
  const volatility = 0.001; // 0.1% volatility per update
  const randomChange = (Math.random() - 0.5) * 2 * volatility;
  return basePrice * (1 + randomChange);
};

// Generate historical data points
const generateHistoricalData = (basePrice: number, numPoints: number, volatility: number) => {
  const data = [];
  let currentPrice = basePrice;

  for (let i = numPoints - 1; i >= 0; i--) {
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - i * 5); // 5-minute intervals

    // Add some randomness and trend
    const trend = Math.sin(i / numPoints * Math.PI * 2) * volatility;
    const random = (Math.random() - 0.5) * volatility;
    currentPrice = basePrice * (1 + trend + random);

    data.push({
      timestamp: timestamp.toISOString(),
      price: Number(currentPrice.toFixed(2))
    });
  }

  return data;
};

const getTimeRangeParams = (range: string) => {
  switch (range) {
    case '1D':
      return { points: 288, volatility: 0.02 }; // 5-minute intervals
    case '1W':
      return { points: 168, volatility: 0.05 }; // 1-hour intervals
    case '1M':
      return { points: 30, volatility: 0.08 }; // 1-day intervals
    case '3M':
      return { points: 90, volatility: 0.12 }; // 1-day intervals
    case '1Y':
      return { points: 365, volatility: 0.15 }; // 1-day intervals
    default:
      return { points: 288, volatility: 0.02 };
  }
};

const useRealtimeCryptoData = (timeRange: string = '1D') => {
  const [realtimeData, setRealtimeData] = useState<any[]>([]);
  
  // Fetch initial data from CoinGecko
  const { data: initialData, error } = useSWR(
    `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true`,
    (url) => axios.get(url).then(res => res.data),
    {
      refreshInterval: 30000,
      revalidateOnFocus: false
    }
  );

  useEffect(() => {
    if (!initialData) return;

    // Initialize with historical data
    const { points, volatility } = getTimeRangeParams(timeRange);
    const formattedData = initialData.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      price: coin.current_price,
      change: coin.price_change_percentage_24h,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
      supply: coin.circulating_supply,
      priceHistory: generateHistoricalData(coin.current_price, points, volatility)
    }));

    setRealtimeData(formattedData);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealtimeData(prevData => 
        prevData.map(coin => {
          const newPrice = generateRealisticPriceChange(coin.price);
          const priceChange = ((newPrice - coin.price) / coin.price) * 100;
          
          return {
            ...coin,
            price: Number(newPrice.toFixed(2)),
            change: Number((coin.change + priceChange).toFixed(2)),
            priceHistory: [
              ...coin.priceHistory.slice(1),
              {
                timestamp: new Date().toISOString(),
                price: Number(newPrice.toFixed(2))
              }
            ]
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [initialData, timeRange]);

  return {
    cryptoData: realtimeData,
    isLoading: !initialData && !error,
    isError: error
  };
};

export default useRealtimeCryptoData; 