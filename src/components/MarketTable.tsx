"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Input } from "./ui/input"
import { getTopCryptos } from "@/services/coingecko"
import Image from "next/image"
import { ArrowUpDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

type SortField = "rank" | "price" | "change" | "volume" | "marketCap" | "circulatingSupply"
type SortDirection = "asc" | "desc"

type Category = {
  id: string
  name: string
  description: string
  examples: string[]
}

const categories: Category[] = [
  {
    id: "payment",
    name: "Moedas de Pagamento",
    description: "Criadas como alternativa ao dinheiro tradicional. Foco em velocidade, segurança e descentralização.",
    examples: ["bitcoin", "litecoin", "bitcoin-cash", "dash"]
  },
  {
    id: "smart-contract",
    name: "Plataformas de Contratos Inteligentes",
    description: "Blockchains que permitem a criação de aplicativos descentralizados (dApps).",
    examples: ["ethereum", "solana", "avalanche-2", "cardano", "polkadot"]
  },
  {
    id: "defi",
    name: "Finanças Descentralizadas (DeFi)",
    description: "Protocolos que oferecem serviços financeiros sem intermediários.",
    examples: ["uniswap", "sushi", "aave", "compound", "maker", "curve-dao-token", "lido-dao"]
  },
  {
    id: "stablecoin",
    name: "Stablecoins",
    description: "Moedas estáveis atreladas a ativos como o dólar (USD).",
    examples: ["tether", "usd-coin", "dai", "frax"]
  },
  {
    id: "gaming",
    name: "GameFi e NFTs",
    description: "Tokens usados em jogos blockchain e projetos de NFTs.",
    examples: ["axie-infinity", "the-sandbox", "decentraland", "gala"]
  },
  {
    id: "web3",
    name: "Web3 / Infraestrutura",
    description: "Soluções para descentralização da internet, armazenamento, oráculos, etc.",
    examples: ["chainlink", "filecoin", "arweave", "the-graph"]
  },
  {
    id: "bridge",
    name: "Bridges e Interoperabilidade",
    description: "Facilita a comunicação e troca de dados entre diferentes blockchains.",
    examples: ["cosmos", "polkadot", "synapse-network", "layerzero"]
  },
  {
    id: "layer2",
    name: "Camada 2 (Layer 2)",
    description: "Soluções construídas sobre blockchains principais para aumentar escalabilidade.",
    examples: ["arbitrum", "optimism", "zksync"]
  },
  {
    id: "governance",
    name: "Tokens de Governança",
    description: "Dão aos holders poder de voto em decisões do protocolo.",
    examples: ["uniswap", "compound", "aave", "maker"]
  }
]

export function MarketTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [cryptoData, setCryptoData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortField, setSortField] = useState<SortField>("rank")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const data = await getTopCryptos()
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format received")
        }
        setCryptoData(data)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Erro ao carregar dados. Tente novamente mais tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number | undefined) => {
    if (!num) return "N/A"
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toLocaleString()}`
  }

  const formatPrice = (price: number | undefined) => {
    if (!price) return "N/A"
    if (price >= 1000) return `$${price.toLocaleString()}`
    return `$${price.toFixed(2)}`
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortValue = (coin: any, field: SortField) => {
    switch (field) {
      case "rank":
        return coin?.market_cap_rank || 0
      case "price":
        return coin?.current_price || 0
      case "change":
        return coin?.price_change_percentage_24h || 0
      case "volume":
        return coin?.total_volume || 0
      case "marketCap":
        return coin?.market_cap || 0
      case "circulatingSupply":
        return coin?.circulating_supply || 0
      default:
        return 0
    }
  }

  const filteredData = cryptoData
    .filter((coin) => {
      const matchesSearch = 
        coin?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin?.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
      
      if (selectedCategory === "all") return matchesSearch
      
      const category = categories.find(cat => cat.id === selectedCategory)
      if (!category) return matchesSearch
      
      return matchesSearch && category.examples.includes(coin?.id?.toLowerCase())
    })
    .sort((a, b) => {
      const aValue = getSortValue(a, sortField)
      const bValue = getSortValue(b, sortField)
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    })

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="animate-pulse h-10 bg-gray-200 rounded w-64"></div>
        </div>
        <div className="border rounded-lg">
          <div className="animate-pulse h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-600">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Buscar por nome ou código..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="w-[80px] cursor-pointer hover:bg-accent"
                onClick={() => handleSort("rank")}
              >
                <div className="flex items-center gap-1">
                  Rank
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "rank" && (
                    <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[60px]"></TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-accent"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center justify-end gap-1">
                  Preço
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "price" && (
                    <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-accent"
                onClick={() => handleSort("change")}
              >
                <div className="flex items-center justify-end gap-1">
                  24h %
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "change" && (
                    <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-accent"
                onClick={() => handleSort("volume")}
              >
                <div className="flex items-center justify-end gap-1">
                  Volume 24h
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "volume" && (
                    <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-accent"
                onClick={() => handleSort("marketCap")}
              >
                <div className="flex items-center justify-end gap-1">
                  Market Cap
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "marketCap" && (
                    <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-accent"
                onClick={() => handleSort("circulatingSupply")}
              >
                <div className="flex items-center justify-end gap-1">
                  Circulação
                  <ArrowUpDown className="h-4 w-4" />
                  {sortField === "circulatingSupply" && (
                    <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((coin) => (
              <TableRow key={coin?.id || Math.random()}>
                <TableCell>{coin?.market_cap_rank || "N/A"}</TableCell>
                <TableCell>
                  {coin?.image && (
                    <div className="relative w-6 h-6">
                      <Image
                        src={coin.image}
                        alt={`${coin?.name || "Crypto"} icon`}
                        fill
                        className="rounded-full object-contain"
                        sizes="24px"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-mono font-medium uppercase">
                  {coin?.symbol || "N/A"}
                </TableCell>
                <TableCell>{coin?.name || "N/A"}</TableCell>
                <TableCell className="text-right font-mono">
                  {formatPrice(coin?.current_price)}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    (coin?.price_change_percentage_24h || 0) > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {coin?.price_change_percentage_24h?.toFixed(2) || "N/A"}%
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatNumber(coin?.total_volume)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatNumber(coin?.market_cap)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatNumber(coin?.circulating_supply)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 