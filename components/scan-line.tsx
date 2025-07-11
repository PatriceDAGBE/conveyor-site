"use client"

import { useEffect, useState } from "react"

export default function ScanLine() {
  const [position, setPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev >= 100) {
          setIsVisible(false)
          setTimeout(() => {
            setIsVisible(true)
          }, 1000)
          return 0
        }
        return prev + 0.5
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
      <div
        className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 shadow-lg shadow-cyan-400/50"
        style={{
          top: `${position}%`,
          transition: "top 0.05s linear",
          boxShadow: "0 0 20px rgba(56, 189, 248, 0.8), 0 0 40px rgba(56, 189, 248, 0.4)",
        }}
      />

      {/* Effet de réflexion */}
      <div
        className="absolute w-full h-8 bg-gradient-to-b from-cyan-400/10 to-transparent"
        style={{
          top: `${position}%`,
          transition: "top 0.05s linear",
        }}
      />
    </div>
  )
}
