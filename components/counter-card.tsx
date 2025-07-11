"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface CounterCardProps {
  title: string
  count: number
  colorClass: string
  borderClass: string
  glowClass: string
  bgClass: string
  icon: React.ReactNode
}

export default function CounterCard({
  title,
  count,
  colorClass,
  borderClass,
  glowClass,
  bgClass,
  icon,
}: CounterCardProps) {
  const [displayCount, setDisplayCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (count !== displayCount) {
      setIsAnimating(true)

      // Créer des particules de couleur
      const particleContainer = document.createElement("div")
      particleContainer.className = "absolute inset-0 pointer-events-none overflow-hidden"
      const cardElement = document.querySelector(`[data-card-id="${title}"]`)
      if (cardElement) {
        cardElement.appendChild(particleContainer)

        for (let i = 0; i < 5; i++) {
          const particle = document.createElement("div")
          particle.className = `absolute w-2 h-2 rounded-full ${colorClass.replace("text-", "bg-")} animate-bounce`
          particle.style.left = `${Math.random() * 100}%`
          particle.style.top = `${Math.random() * 100}%`
          particle.style.animationDelay = `${i * 100}ms`
          particleContainer.appendChild(particle)

          setTimeout(() => particle.remove(), 1000)
        }

        setTimeout(() => particleContainer.remove(), 1000)
      }

      // Animation de compteur
      const duration = 800
      const steps = 20
      const increment = (count - displayCount) / steps
      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        if (currentStep >= steps) {
          setDisplayCount(count)
          setIsAnimating(false)
          clearInterval(timer)
        } else {
          setDisplayCount((prev) => Math.round(prev + increment))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [count, displayCount, colorClass, title])

  return (
    <div
      data-card-id={title}
      className={`
        relative group cursor-pointer transform transition-all duration-300 hover:scale-105
        bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border-2 ${borderClass}
        shadow-xl ${glowClass} hover:shadow-2xl
        ${bgClass} hover:animate-pulse-slow
      `}
    >
      {/* Effet de lueur au survol */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-200 tracking-wide">{title}</h3>
          <div className={`${colorClass} opacity-70`}>{icon}</div>
        </div>

        <div className="text-center">
          <div
            className={`
            text-6xl font-mono font-black ${colorClass} 
            ${isAnimating ? "animate-pulse" : ""}
            transition-all duration-300
          `}
          >
            {displayCount}
          </div>
          <div className="mt-2 text-sm text-gray-400 uppercase tracking-widest">Objects</div>
        </div>
      </div>

      {/* Indicateur d'activité */}
      {isAnimating && (
        <div className="absolute top-2 right-2">
          <div className={`w-3 h-3 rounded-full ${colorClass.replace("text-", "bg-")} animate-ping`}></div>
        </div>
      )}
    </div>
  )
}
