'use client';

import { useState } from 'react'
import useCryptoData from '../hooks/useCryptoData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { IconTrendingUp, IconTrendingDown, IconWallet, IconHistory, IconChartPie } from '@tabler/icons-react'

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#eab308', '#6366f1']

export default function PortfolioPage() {
  const { cryptoData, isLoading, isError } = useCryptoData()
  const [timeRange, setTimeRange] = useState('1W')

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

  // Mock portfolio data
  const portfolioData = [
    { name: 'BTC', value: 45, amount: 0.75, price: 45000 },
    { name: 'ETH', value: 30, amount: 12.5, price: 2800 },
    { name: 'SOL', value: 15, amount: 150, price: 110 },
    { name: 'ADA', value: 7, amount: 5000, price: 1.2 },
    { name: 'DOT', value: 3, amount: 200, price: 15 }
  ]

  const transactions = [
    { type: 'Buy', crypto: 'Bitcoin', amount: '0.25 BTC', value: '$11,250', date: '2024-03-15', status: 'Completed' },
    { type: 'Sell', crypto: 'Ethereum', amount: '5 ETH', value: '$14,000', date: '2024-03-14', status: 'Completed' },
    { type: 'Buy', crypto: 'Solana', amount: '50 SOL', value: '$5,500', date: '2024-03-13', status: 'Completed' },
    { type: 'Buy', crypto: 'Cardano', amount: '2000 ADA', value: '$2,400', date: '2024-03-12', status: 'Completed' },
    { type: 'Sell', crypto: 'Polkadot', amount: '100 DOT', value: '$1,500', date: '2024-03-11', status: 'Completed' }
  ]

  return (
    <div className="flex-1 p-3 sm:p-6 bg-gray-50 dark:bg-neutral-900 overflow-auto">
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total Value</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">$125,750.00</p>
              <span className="flex items-center text-xs sm:text-sm text-green-500">
                <IconTrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                +12.5%
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">24h Change</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">+$1,234.56</p>
              <span className="flex items-center text-xs sm:text-sm text-green-500">
                <IconTrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                +0.98%
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Total Profit</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">$15,678.90</p>
              <span className="flex items-center text-xs sm:text-sm text-green-500">
                <IconTrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                +14.3%
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Number of Assets</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">5</p>
              <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">Cryptocurrencies</span>
            </div>
          </div>
        </div>

        {/* Portfolio Chart and Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white">Portfolio Performance</h2>
              <div className="flex gap-2">
                {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg text-xs sm:text-sm ${
                      timeRange === range
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cryptoData?.[0]?.priceHistory}>
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
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                    labelFormatter={(label) => {
                      const date = new Date(label)
                      return date.toLocaleDateString()
                    }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px',color: 'black' }}
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

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Asset Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Allocation']}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {portfolioData.map((asset, index) => (
                <div key={asset.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm text-neutral-900 dark:text-white">{asset.name}</span>
                  </div>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {asset.amount} (${(asset.amount * asset.price).toLocaleString()})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-neutral-700">
                  <th className="pb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Type</th>
                  <th className="pb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Crypto</th>
                  <th className="pb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Amount</th>
                  <th className="pb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Value</th>
                  <th className="pb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Date</th>
                  <th className="pb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {transactions.map((tx, index) => (
                  <tr key={index} className="text-sm">
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 ${
                        tx.type === 'Buy' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {tx.type === 'Buy' ? <IconTrendingUp className="w-4 h-4" /> : <IconTrendingDown className="w-4 h-4" />}
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 text-neutral-900 dark:text-white">{tx.crypto}</td>
                    <td className="py-3 text-neutral-900 dark:text-white">{tx.amount}</td>
                    <td className="py-3 text-neutral-900 dark:text-white">{tx.value}</td>
                    <td className="py-3 text-neutral-500 dark:text-neutral-400">{tx.date}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 