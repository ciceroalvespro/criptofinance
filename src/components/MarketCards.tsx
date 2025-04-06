"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { getGlobalData, getFearGreedIndex } from "@/services/coingecko"
import { Globe, Bitcoin, Activity, RefreshCw } from "lucide-react"
import { Button } from "./ui/button"

export function MarketCards() {
  const [globalData, setGlobalData] = useState<any>(null)
  const [fearGreedData, setFearGreedData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setError(null)
      setLoading(true)
      const [global, fearGreed] = await Promise.all([
        getGlobalData(),
        getFearGreedIndex(),
      ])
      
      if (!global || !fearGreed) {
        throw new Error("Dados incompletos recebidos da API")
      }

      setGlobalData(global)
      setFearGreedData(fearGreed)
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Erro ao carregar dados. Clique em 'Tentar Novamente' para atualizar.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  if (loading && !error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-lg">Carregando...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse h-8 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-red-600">Erro</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={fetchData} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatNumber = (num: number) => {
    if (!num) return "N/A"
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toLocaleString()}`
  }

  const getFearGreedColor = (value: number) => {
    if (value <= 20) return "text-red-500" // Medo extremo
    if (value <= 40) return "text-orange-500" // Medo
    if (value <= 60) return "text-yellow-500" // Neutro
    if (value <= 80) return "text-lime-500" // Ganância
    return "text-green-500" // Ganância extrema
  }

  const getFearGreedStrokeColor = (value: number) => {
    if (value <= 20) return "#ef4444" // Medo extremo
    if (value <= 40) return "#f97316" // Medo
    if (value <= 60) return "#eab308" // Neutro
    if (value <= 80) return "#84cc16" // Ganância
    return "#22c55e" // Ganância extrema
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            Market Share Global
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {formatNumber(globalData?.total_market_cap?.usd)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {globalData?.market_cap_change_percentage_24h_usd?.toFixed(2) || "N/A"}% nas últimas 24h
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bitcoin className="h-5 w-5 text-orange-500" />
            Dominância Bitcoin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {globalData?.market_cap_percentage?.btc?.toFixed(1) || "N/A"}%
          </div>
          <Progress value={globalData?.market_cap_percentage?.btc || 0} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-500" />
            Índice Medo e Ganância
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-2xl font-bold ${getFearGreedColor(fearGreedData?.value || 0)}`}>
                  {fearGreedData?.value || "N/A"}
                </div>
              </div>
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke={getFearGreedStrokeColor(fearGreedData?.value || 0)}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="377"
                  strokeDashoffset={377 * (1 - (fearGreedData?.value || 0) / 100)}
                />
              </svg>
            </div>
          </div>
          <div className={`text-center font-medium mt-2 ${getFearGreedColor(fearGreedData?.value || 0)}`}>
            {fearGreedData?.value_classification || "N/A"}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 