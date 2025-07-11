import { NextResponse } from "next/server"

const colors = ["RED", "GREEN", "BLUE", "YELLOW"]

// Données simulées pour tests (facultatif mais utile si tu veux un reset)
let counts = {
  RED: 0,
  GREEN: 0,
  BLUE: 0,
  YELLOW: 0,
}
// {color : "RED"}
// GET – Retourne une couleur aléatoire simulant un objet trié
export async function GET() {
  try {
    // Simulation aléatoire d'une couleur "triée"
    const randomIndex = Math.floor(Math.random() * colors.length)
    const color = colors[randomIndex]

    // Pour garder un état global si tu veux du debug ou un reset
    counts[color as keyof typeof counts]++

    return NextResponse.json(
      { color },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    )
  } catch (error) {
    console.error("Erreur API:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des données" }, { status: 500 })
  }
}

// POST – Réinitialise les compteurs (optionnel pour tests)
export async function POST() {
  counts = {
    RED: 0,
    GREEN: 0,
    BLUE: 0,
    YELLOW: 0,
  }

  return NextResponse.json({ message: "Données réinitialisées", data: counts })
}
