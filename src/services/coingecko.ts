import { CoinGeckoClient } from "coingecko-api-v3"

const client = new CoinGeckoClient({
  timeout: 10000,
})

export interface MarketData {
  id?: string
  symbol?: string
  name?: string
  current_price?: number
  market_cap?: number
  market_cap_rank?: number
  total_volume?: number
  circulating_supply?: number
  price_change_percentage_24h?: number
  image?: string
}

export interface GlobalData {
  total_market_cap: { [key: string]: number }
  market_cap_change_percentage_24h_usd: number
  total_volume: { [key: string]: number }
  market_cap_percentage: { [key: string]: number }
}

export interface FearGreedData {
  value: number
  value_classification: string
  timestamp: string
}

export async function getGlobalData(): Promise<GlobalData> {
  try {
    const response = await client.global()
    if (!response?.data) {
      throw new Error("No data received from CoinGecko")
    }
    return response.data
  } catch (error) {
    console.error("Error fetching global data:", error)
    throw error
  }
}

export async function getTopCryptos(): Promise<MarketData[]> {
  try {
    const response = await client.coinMarket({
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 100,
      page: 1,
      sparkline: false,
      price_change_percentage: "24h",
    })
    if (!response || !Array.isArray(response)) {
      throw new Error("Invalid response format from CoinGecko")
    }
    return response
  } catch (error) {
    console.error("Error fetching top cryptos:", error)
    throw error
  }
}

export async function getFearGreedIndex(): Promise<FearGreedData> {
  try {
    const response = await fetch(
      "https://api.alternative.me/fng/"
    ).then((res) => res.json())
    
    if (!response?.data?.[0]) {
      throw new Error("Invalid response format from Fear & Greed API")
    }

    return {
      value: parseInt(response.data[0].value),
      value_classification: response.data[0].value_classification,
      timestamp: response.data[0].timestamp,
    }
  } catch (error) {
    console.error("Error fetching Fear & Greed index:", error)
    throw error
  }
} 