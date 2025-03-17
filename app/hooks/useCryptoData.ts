'use client';

// Core imports
import useSWR from 'swr'
import axios from 'axios'

// Constants
const COINGECKO_API = 'https://api.coingecko.com/api/v3'

// Types
interface CryptoData {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  circulating_supply: number
  sparkline_in_7d: {
    price: number[]
  }
}

// Helper function to generate timestamps based on time range
const generateTimestamps = (range: string) => {
  const timestamps = []
  const now = new Date()
  let points = 7
  let interval = 1

  switch (range) {
    case '1D':
      points = 24
      interval = 1/24 // hourly for 1 day
      break
    case '1W':
      points = 7
      interval = 1 // daily for 1 week
      break
    case '1M':
      points = 30
      interval = 1 // daily for 1 month
      break
    case '3M':
      points = 90
      interval = 1 // daily for 3 months
      break
    case '1Y':
      points = 365
      interval = 1 // daily for 1 year
      break
    case 'ALL':
      points = 365 * 2 // 2 years of data
      interval = 1
      break
    default:
      points = 7
      interval = 1
  }
  
  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i * interval)
    timestamps.push(date.toISOString().split('T')[0])
  }
  
  return timestamps
}

// Fetch function for SWR
const fetcher = (url: string) => axios.get(url).then(res => res.data)

// Custom hook for cryptocurrency data
const useCryptoData = (timeRange: string = '1W') => {
  const { data, error } = useSWR<CryptoData[]>(
    `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true`,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: false
    }
  )

  const isLoading = !data && !error

  const timestamps = generateTimestamps(timeRange)

  // Transform API data into required format with mock price history for different time ranges
  const formattedData = data?.map((coin: CryptoData) => {
    // Generate mock price history based on current price and time range
    const basePrice = coin.current_price
    const volatility = 0.05 // 5% price variation
    
    const priceHistory = timestamps.map((timestamp, index) => {
      // Create somewhat realistic price variations based on the time range
      const dayOffset = Math.sin(index / timestamps.length * Math.PI * 2)
      const randomFactor = 1 + (Math.random() - 0.5) * volatility
      const price = basePrice * (1 + dayOffset * volatility) * randomFactor
      
      return {
        timestamp,
        price: Number(price.toFixed(2))
      }
    })

    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      price: coin.current_price,
      change: coin.price_change_percentage_24h,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
      supply: coin.circulating_supply,
      priceHistory
    }
  })

  return {
    cryptoData: formattedData,
    isLoading,
    isError: error
  }
}

export default useCryptoData 