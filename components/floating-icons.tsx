"use client"

import { useEffect, useState } from "react"
import { Cpu, Zap, Activity, Wifi, Database, Shield } from "lucide-react"

const icons = [Cpu, Zap, Activity, Wifi, Database, Shield]

interface FloatingIcon {
  id: number
  Icon: typeof Cpu
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  scale: number
  opacity: number
}

export default function FloatingIcons() {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    const createIcon = (): FloatingIcon => ({
      id: Math.random(),
      Icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 2,
      scale: 0.5 + Math.random() * 0.5,
      opacity: 0.1 + Math.random() * 0.2,
    })

    const initialIcons = Array.from({ length: 8 }, createIcon)
    setFloatingIcons(initialIcons)

    const animateIcons = () => {
      setFloatingIcons((prev) =>
        prev.map((icon) => ({
          ...icon,
          x: icon.x + icon.vx,
          y: icon.y + icon.vy,
          rotation: icon.rotation + icon.rotationSpeed,
          // Wrap around screen
          x: icon.x < -50 ? window.innerWidth + 50 : icon.x > window.innerWidth + 50 ? -50 : icon.x + icon.vx,
          y: icon.y < -50 ? window.innerHeight + 50 : icon.y > window.innerHeight + 50 ? -50 : icon.y + icon.vy,
        })),
      )
    }

    const interval = setInterval(animateIcons, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingIcons.map((icon) => {
        const { Icon } = icon
        return (
          <div
            key={icon.id}
            className="absolute text-cyan-400/20"
            style={{
              left: icon.x,
              top: icon.y,
              transform: `rotate(${icon.rotation}deg) scale(${icon.scale})`,
              opacity: icon.opacity,
            }}
          >
            <Icon size={24} />
          </div>
        )
      })}
    </div>
  )
}
