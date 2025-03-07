'use client';

import { useState } from 'react'
import useCryptoData from '../hooks/useCryptoData'
import { IconArrowRight, IconWallet, IconChartBar, IconHistory, IconBook } from '@tabler/icons-react'

export default function ExchangePage() {
  const { cryptoData, isLoading } = useCryptoData()
  const [fromCrypto, setFromCrypto] = useState('')
  const [toCrypto, setToCrypto] = useState('')
  const [amount, setAmount] = useState('')
  const [orderType, setOrderType] = useState('market')
  const [activeTab, setActiveTab] = useState('exchange')

  // Mock order book data
  const orderBook = {
    bids: [
      { price: 65432.10, amount: 0.5, total: 32716.05 },
      { price: 65431.50, amount: 1.2, total: 78517.80 },
      { price: 65430.80, amount: 0.8, total: 52344.64 },
      { price: 65430.00, amount: 2.0, total: 130860.00 },
      { price: 65429.50, amount: 1.5, total: 98144.25 },
    ],
    asks: [
      { price: 65433.20, amount: 0.3, total: 19629.96 },
      { price: 65434.00, amount: 1.0, total: 65434.00 },
      { price: 65434.50, amount: 0.7, total: 45804.15 },
      { price: 65435.00, amount: 1.8, total: 117783.00 },
      { price: 65435.80, amount: 0.9, total: 58892.22 },
    ]
  }

  // Mock trade history
  const tradeHistory = [
    { type: 'buy', price: 65432.10, amount: 0.12, time: '14:30:25' },
    { type: 'sell', price: 65431.80, amount: 0.08, time: '14:30:15' },
    { type: 'buy', price: 65433.20, amount: 0.25, time: '14:30:05' },
    { type: 'sell', price: 65432.90, amount: 0.15, time: '14:29:55' },
    { type: 'buy', price: 65434.00, amount: 0.18, time: '14:29:45' },
  ]

  return (
    <div className="flex-1 p-3 sm:p-6 bg-gray-50 dark:bg-neutral-900 overflow-auto">
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Exchange Navigation */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-wrap gap-4">
            {[
              { id: 'exchange', label: 'Exchange', icon: <IconArrowRight /> },
              { id: 'orderbook', label: 'Order Book', icon: <IconBook /> },
              { id: 'charts', label: 'Charts', icon: <IconChartBar /> },
              { id: 'history', label: 'History', icon: <IconHistory /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${activeTab === tab.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700'
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Exchange Form */}
          <div className="lg:col-span-2 bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-6 text-neutral-900 dark:text-white">Exchange Crypto</h2>
            
            {/* Order Type Selection */}
            <div className="flex gap-4 mb-6">
              {['market', 'limit'].map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize
                    ${orderType === type
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700'
                    }`}
                >
                  {type} Order
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {/* From */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  From
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    value={fromCrypto}
                    onChange={(e) => setFromCrypto(e.target.value)}
                    className="flex-1 bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg px-4 py-2.5 text-neutral-900 dark:text-white"
                  >
                    <option value="">Select cryptocurrency</option>
                    {cryptoData?.map((crypto) => (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol.toUpperCase()})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="flex-1 bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg px-4 py-2.5 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <IconArrowRight className="text-neutral-400 dark:text-neutral-500" />
              </div>

              {/* To */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  To
                </label>
                <select
                  value={toCrypto}
                  onChange={(e) => setToCrypto(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg px-4 py-2.5 text-neutral-900 dark:text-white"
                >
                  <option value="">Select cryptocurrency</option>
                  {cryptoData?.map((crypto) => (
                    <option key={crypto.id} value={crypto.id}>
                      {crypto.name} ({crypto.symbol.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price (for limit orders) */}
              {orderType === 'limit' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Limit Price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    className="w-full bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg px-4 py-2.5 text-neutral-900 dark:text-white"
                  />
                </div>
              )}

              {/* Exchange Button */}
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                disabled={!fromCrypto || !toCrypto || !amount}
              >
                <IconWallet className="w-5 h-5" />
                Exchange Now
              </button>
            </div>
          </div>

          {/* Order Book */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-6 text-neutral-900 dark:text-white">Order Book</h2>
            
            {/* Asks */}
            <div className="mb-4">
              <div className="grid grid-cols-3 text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                <span>Price</span>
                <span>Amount</span>
                <span>Total</span>
              </div>
              <div className="space-y-1">
                {orderBook.asks.map((ask, index) => (
                  <div key={index} className="grid grid-cols-3 text-sm">
                    <span className="text-red-500">${ask.price.toLocaleString()}</span>
                    <span className="text-neutral-900 dark:text-white">{ask.amount}</span>
                    <span className="text-neutral-500 dark:text-neutral-400">${ask.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Price */}
            <div className="text-center py-3 border-y border-gray-200 dark:border-neutral-700">
              <span className="text-lg font-semibold text-neutral-900 dark:text-white">$65,432.50</span>
            </div>

            {/* Bids */}
            <div className="mt-4">
              <div className="space-y-1">
                {orderBook.bids.map((bid, index) => (
                  <div key={index} className="grid grid-cols-3 text-sm">
                    <span className="text-green-500">${bid.price.toLocaleString()}</span>
                    <span className="text-neutral-900 dark:text-white">{bid.amount}</span>
                    <span className="text-neutral-500 dark:text-neutral-400">${bid.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trade History */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Trade History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-neutral-700">
                  <th className="pb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Type</th>
                  <th className="pb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Price</th>
                  <th className="pb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Amount</th>
                  <th className="pb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {tradeHistory.map((trade, index) => (
                  <tr key={index} className="text-sm">
                    <td className="py-3">
                      <span className={`capitalize ${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="py-3 text-neutral-900 dark:text-white">
                      ${trade.price.toLocaleString()}
                    </td>
                    <td className="py-3 text-neutral-900 dark:text-white">
                      {trade.amount} BTC
                    </td>
                    <td className="py-3 text-neutral-500 dark:text-neutral-400">
                      {trade.time}
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