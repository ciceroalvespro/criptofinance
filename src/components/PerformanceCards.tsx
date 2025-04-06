"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { getTopCryptos } from "@/services/coingecko"

export function PerformanceCards() {
  const [cryptoData, setCryptoData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopCryptos()
        setCryptoData(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-lg">Carregando...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="animate-pulse h-8 bg-gray-200 rounded"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const topPerformers = cryptoData
    .filter((coin) => coin.price_change_percentage_24h > 0)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5)

  const worstPerformers = cryptoData
    .filter((coin) => coin.price_change_percentage_24h < 0)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5)

  const formatPrice = (price: number) => {
    if (price >= 1000) return `$${price.toLocaleString()}`
    return `$${price.toFixed(2)}`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Melhores Desempenhos (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="font-mono font-bold uppercase">
                    {coin.symbol}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {coin.name}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-green-600 font-medium">
                    +{coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                  <div className="font-mono">{formatPrice(coin.current_price)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Piores Desempenhos (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {worstPerformers.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="font-mono font-bold uppercase">
                    {coin.symbol}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {coin.name}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-red-600 font-medium">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </div>
                  <div className="font-mono">{formatPrice(coin.current_price)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 