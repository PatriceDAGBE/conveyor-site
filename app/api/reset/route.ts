// app/api/reset/route.ts
import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"

const COLORS = ["RED", "GREEN", "BLUE", "YELLOW"]

export async function POST() {
  try {
    const reset = await Promise.all([
      ...COLORS.map((color) => redis.set(color, 0)),
      redis.set("TOTAL", 0),
    ])
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
