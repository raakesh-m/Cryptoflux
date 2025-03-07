'use client';

import useCryptoData from '../hooks/useCryptoData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { IconTrendingUp, IconTrendingDown, IconBell, IconNews, IconHistory } from '@tabler/icons-react'

export const Dashboard = () => {
  const { cryptoData, isLoading, isError } = useCryptoData()

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neutral-900"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center text-red-500">
        Error loading cryptocurrency data
      </div>
    )
  }

  // Get top 5 cryptos by market cap
  const top5Cryptos = cryptoData
    ?.sort((a, b) => b.marketCap - a.marketCap)
    .slice(0, 5)
    .map(crypto => ({
      name: crypto.symbol.toUpperCase(),
      marketCap: crypto.marketCap / 1e9, // Convert to billions
      color: '#2563eb'
    }))

  return (
    <div className="flex-1 p-3 sm:p-6 bg-gray-50 dark:bg-neutral-900 overflow-auto">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <OverviewCard
          title="Portfolio Value"
          value="$25,432.89"
          change="+5.23%"
          isPositive={true}
        />
        <OverviewCard
          title="24h Volume"
          value="$1.2M"
          change="-2.45%"
          isPositive={false}
        />
        <OverviewCard
          title="Active Positions"
          value="8"
          change="+2"
          isPositive={true}
        />
        <OverviewCard
          title="Profit/Loss"
          value="$1,234.56"
          change="+12.3%"
          isPositive={true}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Top 5 Cryptos by Market Cap */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Top 5 Cryptos by Market Cap</h2>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top5Cryptos} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" 
                  tickFormatter={(value) => `$${value.toFixed(0)}B`}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fontSize: 12  }} 
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}B`, 'Market Cap']}
                  contentStyle={{ backgroundColor: 'white', borderRadius: '8px', color: 'black' }}
                />
                <Bar 
                  dataKey="marketCap" 
                  fill="#2563eb"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Overview */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Market Overview</h2>
          <div className="space-y-3 sm:space-y-4">
            {cryptoData?.slice(0, 5).map((crypto) => (
              <div key={crypto.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white">{crypto.name}</p>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">{crypto.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white">${crypto.price.toLocaleString()}</p>
                  <p className={`text-xs sm:text-sm ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Recent Activity</h2>
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <IconHistory className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white">Bought BTC</p>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">2024-03-12 14:30</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white">+0.05 BTC</p>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">$2,345.67</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Feed */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Crypto News</h2>
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="p-3 sm:p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <IconNews className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">2h ago</p>
                </div>
                <p className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white">Bitcoin Surges Past $60,000 as Institutional Interest Grows</p>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">Major financial institutions continue to show interest in cryptocurrency investments...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const OverviewCard = ({ title, value, change, isPositive }: { 
  title: string
  value: string
  change: string
  isPositive: boolean 
}) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
      <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">{value}</p>
        <span className={`flex items-center text-xs sm:text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <IconTrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <IconTrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />}
          {change}
        </span>
      </div>
    </div>
  )
} 