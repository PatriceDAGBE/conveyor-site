"use client"

import { useState, useEffect } from "react"
import { Recycle, Target } from "lucide-react"
import CounterCard from "@/components/counter-card"
import KPICard from "@/components/kpi-card"
import DataPulse from "@/components/data-pulse"
import LogoTekbot from "@/components/LogoTekbot"
import LogoTRC from "@/components/LogoTRC"

interface DashboardData {
  RED: number
  GREEN: number
  BLUE: number
  YELLOW: number
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    RED: 0,
    GREEN: 0,
    BLUE: 0,
    YELLOW: 0,
  })

  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchData = async () => {
    try {
      const response = await fetch("/api/data")
      const result = await response.json() // Ex: { color: "RED" }
      const color = result.color?.toUpperCase()

      if (!["RED", "GREEN", "BLUE", "YELLOW"].includes(color)) return

      setData((prev) => ({
        ...prev,
        [color]: prev[color as keyof DashboardData] + 1,
      }))
      setTotal((prev) => prev + 1)
      setLastUpdate(new Date())
      setIsLoading(false)
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 1000)
    return () => clearInterval(interval)
  }, [])

  const colorConfig = {
    RED: {
      name: "RED",
      color: "text-red-400",
      border: "border-red-500",
      glow: "shadow-red-500/20",
      bg: "bg-red-500/10",
    },
    GREEN: {
      name: "GREEN",
      color: "text-green-400",
      border: "border-green-500",
      glow: "shadow-green-500/20",
      bg: "bg-green-500/10",
    },
    BLUE: {
      name: "BLUE",
      color: "text-blue-400",
      border: "border-blue-500",
      glow: "shadow-blue-500/20",
      bg: "bg-blue-500/10",
    },
    YELLOW: {
      name: "YELLOW",
      color: "text-yellow-400",
      border: "border-yellow-500",
      glow: "shadow-yellow-500/20",
      bg: "bg-yellow-500/10",
    },
  }

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-[#167687] flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
  //         <p className="text-cyan-400 text-lg font-medium">loading...</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="flex flex-col min-h-screen bg-[#167687] text-white">
      {/* Motif de fond */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23374151' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      ></div>

      <DataPulse isActive={false} />

      <div className="relative z-10 container mx-auto px-6 py-8 grow">
        {/* Header */}
        <header className="w-full p-4 flex flex-col items-center text-white">
          <div className="w-full max-w-6xl flex justify-between items-center px-4 mb-4">
            <LogoTRC />
            <LogoTekbot />
          </div>
          <div className="text-center">
            <p className="text-xl text-cyan-400 font-medium tracking-wide">
              TEKBOT Robotics Challenge 2K25
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Last Update : {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </header>

        {/* KPI Total */}
        <section className="mb-12">
          <div className="grid grid-cols-1 justify-center items-center md:grid-cols-1">
            <KPICard
              title="Total Sorted Items"
              value={total}
              icon={<Target className="h-8 w-8" />}
              color="cyan"
            />
          </div>
        </section>

        {/* Compteurs */}
        <section>
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-200">
            Counters by Color
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(colorConfig).map(([key, config]) => (
              <CounterCard
                key={key}
                title={config.name}
                count={data[key as keyof DashboardData]}
                colorClass={config.color}
                borderClass={config.border}
                glowClass={config.glow}
                bgClass={config.bg}
                icon={<Recycle className="h-6 w-6" />}
              />
            ))}
          </div>
        </section>
      </div>

      <footer className="z-10 bg-[#167687] py-4 text-center text-sm text-gray-300">
        <p className="text-foreground/80">Copyright © 2025 ©Epibot-Epitech</p>
      </footer>
    </div>
  )
}
