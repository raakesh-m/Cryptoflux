'use client';

import { useState } from 'react'
import useCryptoData from '../hooks/useCryptoData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react'

export default function MarketPage() {
  const { cryptoData, isLoading, isError } = useCryptoData()
  const [selectedCrypto, setSelectedCrypto] = useState('')

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

  // Get chart data based on selection
  const chartData = selectedCrypto
    ? cryptoData?.find(crypto => crypto.id === selectedCrypto)?.priceHistory
    : cryptoData?.[0]?.priceHistory // Default to first crypto if none selected

  return (
    <div className="flex-1 p-3 sm:p-6 bg-gray-50 dark:bg-neutral-900 overflow-auto">
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Crypto Selector */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white whitespace-nowrap">Select Cryptocurrency</h2>
            <select
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              className="w-full sm:w-auto sm:flex-1 max-w-xs bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg px-4 py-2.5 text-neutral-900 dark:text-white"
            >
              <option value="">All Cryptocurrencies</option>
              {cryptoData?.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Chart */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-900 dark:text-white">
            {selectedCrypto 
              ? `${cryptoData?.find(c => c.id === selectedCrypto)?.name} Price Chart` 
              : 'Market Overview'}
          </h2>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp"
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return `${date.getMonth() + 1}/${date.getDate()}`
                  }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                  labelFormatter={(label) => {
                    const date = new Date(label)
                    return date.toLocaleDateString()
                  }}
                  contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Statistics */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Market Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {cryptoData?.map((crypto) => (
              <div 
                key={crypto.id} 
                className={`flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg cursor-pointer transition-colors
                  ${selectedCrypto === crypto.id ? 'ring-2 ring-blue-500' : ''}
                  hover:bg-gray-100 dark:hover:bg-neutral-600`}
                onClick={() => setSelectedCrypto(crypto.id)}
              >
                <div className="flex items-center gap-3">
                  <img src={crypto.image} alt={crypto.name} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
                  <div>
                    <p className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white">{crypto.name}</p>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">{crypto.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white">${crypto.price.toLocaleString()}</p>
                  <p className={`text-xs sm:text-sm flex items-center gap-1 ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.change >= 0 ? <IconTrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <IconTrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                    {crypto.change.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 