"use client"

import { useEffect, useState } from "react"

interface DataPulseProps {
  isActive: boolean
}

export default function DataPulse({ isActive }: DataPulseProps) {
  const [pulses, setPulses] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (!isActive) return

    const createPulse = () => {
      const newPulse = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      }

      setPulses((prev) => [...prev, newPulse])

      // Remove pulse after animation
      setTimeout(() => {
        setPulses((prev) => prev.filter((pulse) => pulse.id !== newPulse.id))
      }, 2000)
    }

    const interval = setInterval(createPulse, 3000)
    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
      {pulses.map((pulse) => (
        <div
          key={pulse.id}
          className="absolute w-4 h-4 animate-ping"
          style={{
            left: `${pulse.x}%`,
            top: `${pulse.y}%`,
          }}
        >
          <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-75 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-50 animate-ping animation-delay-200"></div>
          <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-25 animate-ping animation-delay-400"></div>
        </div>
      ))}
    </div>
  )
}
