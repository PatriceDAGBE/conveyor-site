import { NextRequest, NextResponse } from "next/server"

// Stockage global temporaire (en mémoire du serveur)
let counts = {
  RED: 0,
  GREEN: 0,
  BLUE: 0,
  YELLOW: 0,
  total: 0,
}

let lastColor: string | null = null

// POST – Reçoit une couleur {"color": "RED"} (ex: depuis ROS2)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const color = body.color?.toUpperCase()

    if (!color || !["RED", "GREEN", "BLUE", "YELLOW"].includes(color)) {
      return NextResponse.json({ error: "Couleur invalide" }, { status: 400 })
    }

    counts[color as keyof typeof counts] += 1
    counts.total += 1
    lastColor = color

    return NextResponse.json({ success: true }, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Erreur dans la requête" }, { status: 400 })
  }
}

// GET – Récupère l’état global actuel
export async function GET() {
  return NextResponse.json({
    RED: counts.RED,
    GREEN: counts.GREEN,
    BLUE: counts.BLUE,
    YELLOW: counts.YELLOW,
    total: counts.total,
    lastColor,
  }, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  })
}
