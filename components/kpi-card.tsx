"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface KPICardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: "cyan" | "green" | "blue" | "red"
}

export default function KPICard({ title, value, icon, color }: KPICardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const colorClasses = {
    cyan: {
      text: "text-cyan-400",
      border: "border-cyan-500/30",
      glow: "shadow-cyan-500/5",
      bg: "bg-cyan-500/10",
    },
    green: {
      text: "text-green-400",
      border: "border-green-500/30",
      glow: "shadow-green-500/20",
      bg: "bg-green-500/10",
    },
    blue: {
      text: "text-blue-400",
      border: "border-blue-500/30",
      glow: "shadow-blue-500/20",
      bg: "bg-blue-500/10",
    },
    red: {
      text: "text-red-400",
      border: "border-red-500/30",
      glow: "shadow-red-500/20",
      bg: "bg-red-500/10",
    },
  }

  const colors = colorClasses[color]

  return (
    <div
      className={`
      relative group transform transition-all duration-500 hover:scale-105 hover:animate-pulse-slow
      ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
      bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border-2 ${colors.border}
      shadow-2xl ${colors.glow} hover:shadow-3xl
      ${colors.bg}
    `}
    >
      {/* Effet de brillance */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>{icon}</div>
          <div className="text-right">
            <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">{title}</p>
          </div>
        </div>

        <div className="text-center relative">
          <div
            className={`
            text-5xl font-mono font-black ${colors.text}
            transition-all duration-300 group-hover:scale-110
            animate-count-up
          `}
          >
            {value}
          </div>

          {/* Effet de curseur clignotant */}
          <div
            className={`absolute -right-2 top-0 w-1 h-12 ${colors.text.replace("text-", "bg-")} animate-pulse opacity-60`}
          ></div>
        </div>
      </div>

      {/* Particules flottantes */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <div className={`w-2 h-2 rounded-full ${colors.text.replace("text-", "bg-")} animate-bounce`}></div>
      </div>
    </div>
  )
}
