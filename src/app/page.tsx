import { Footer } from "@/components/Footer"
import { MarketCards } from "@/components/MarketCards"
import { MarketTable } from "@/components/MarketTable"
import { Navbar } from "@/components/Navbar"
import { PerformanceCards } from "@/components/PerformanceCards"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-24 space-y-12">
        <MarketCards />
        <PerformanceCards />
        <MarketTable />
      </div>
      <Footer />
    </>
  )
}
