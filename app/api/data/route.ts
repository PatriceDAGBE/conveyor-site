// app/api/data/route.ts
import { NextRequest, NextResponse } from "next/server"
import { redis } from "@/lib/redis"

const COLORS = ["RED", "GREEN", "BLUE", "YELLOW"]

// POST – reçoit une couleur {"color": "RED"} depuis ROS2
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const color = body.color?.toUpperCase()

    if (!COLORS.includes(color)) {
      return NextResponse.json({ error: "Couleur invalide" }, { status: 400 })
    }

    await redis.incr(color)
    await redis.incr("TOTAL")

    return NextResponse.json({ color })
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// GET – retourne toutes les valeurs
export async function GET() {
  try {
    const values = await redis.mget<number[]>(...COLORS)
    const total = (await redis.get<number>("TOTAL")) ?? 0

    const data = Object.fromEntries(COLORS.map((c, i) => [c, values[i] ?? 0]))

    return NextResponse.json({ ...data, total }, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
