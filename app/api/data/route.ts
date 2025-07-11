import { NextRequest, NextResponse } from "next/server"

let lastColor: string | null = null

// POST – Reçoit une couleur JSON {"color": "RED"} depuis ROS2 ou autre
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const color = body.color?.toUpperCase()

    if (!color) {
      return NextResponse.json({ error: "Aucune couleur fournie" }, { status: 400 })
    }

    lastColor = color

    return NextResponse.json({ color }, {
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

// GET – Retourne la dernière couleur reçue
export async function GET() {
  if (!lastColor) {
    return NextResponse.json({ error: "Aucune couleur enregistrée" }, { status: 404 })
  }

  const response = NextResponse.json({ color: lastColor }, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  })

  // Vider après réponse
  // lastColor = null

  return response
}
