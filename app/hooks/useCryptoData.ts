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

// Helper function to generate timestamps for the last 7 days
const generateTimestamps = () => {
  const timestamps = []
  const now = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    timestamps.push(date.toISOString().split('T')[0])
  }
  
  return timestamps
}

// Fetch function for SWR
const fetcher = (url: string) => axios.get(url).then(res => res.data)

// Custom hook for cryptocurrency data
const useCryptoData = () => {
  const { data, error } = useSWR<CryptoData[]>(
    `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true`,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: false
    }
  )

  const isLoading = !data && !error

  const timestamps = generateTimestamps()

  // Transform API data into required format
  const formattedData = data?.map((coin: CryptoData) => {
    const priceHistory = coin.sparkline_in_7d.price.slice(0, 7).map((price, index) => ({
      timestamp: timestamps[index],
      price: Number(price.toFixed(2))
    }))

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