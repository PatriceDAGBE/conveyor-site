# 🤖 TEKBOT 2K25 - Dashboard de Tri Intelligent

Un tableau de bord en temps réel moderne et spectaculaire pour le suivi d'un système de tri de déchets robotisé dans le cadre du challenge TEKBOT Robotics 2K25.

## ✨ Fonctionnalités

### 🎯 **Suivi en Temps Réel**
- Mise à jour automatique toutes les 2 secondes
- Compteurs animés pour chaque couleur de déchet (Rouge, Vert, Bleu, Jaune)
- Indicateurs de performance (Total, Précision, Efficacité)
- Aucun rechargement de page nécessaire

### 🎨 **Interface Spectaculaire**
- **Thème Dark Tech** avec dégradés et effets de lueur
- **Particules flottantes** avec connexions dynamiques
- **Ligne de scan futuriste** traversant l'écran
- **Animations fluides** pour tous les éléments
- **Effets interactifs** au survol et lors des mises à jour

### 📊 **Visualisation Avancée**
- Cartes KPI avec animations de compteur
- Statistiques détaillées par couleur
- Indicateurs visuels d'activité système
- Design responsive pour tous les écrans

## 🛠️ Technologies Utilisées

- **Framework** : Next.js 14+ (App Router)
- **Styling** : Tailwind CSS
- **Icons** : Lucide React
- **Animations** : CSS3 + Canvas API
- **TypeScript** : Support complet
- **API** : Route Handlers Next.js

## 🚀 Installation Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn ou pnpm

### 1. Cloner le projet
```bash
git clone git@github.com:Ced47/RL_Agent_TRC_2025.git
cd frontend
```

### 2. Installer les dépendances
```bash
pnpm install
```

### 3. Lancer en développement
```bash
pnpm run dev
```

### 4. Ouvrir dans le navigateur
Rendez-vous sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
tekbot-dashboard/
├── app/
│   ├── api/
│   │   └── data/
│   │       └── route.ts          # API simulée pour les données
│   ├── globals.css               # Styles globaux et animations
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Page dashboard principale
├── components/
│   ├── counter-card.tsx         # Cartes de compteurs animées
│   ├── kpi-card.tsx            # Cartes d'indicateurs clés
│   ├── particle-background.tsx  # Système de particules
│   ├── scan-line.tsx           # Ligne de scan futuriste
│   ├── data-pulse.tsx          # Pulsations de données
│   └── floating-icons.tsx      # Icônes flottantes
├── public/
│   ├── logo-tekbot.png         # Logo TEKBOT (à ajouter)
│   └── logo-trc2025.png        # Logo TRC 2025 (à ajouter)
├── tailwind.config.ts          # Configuration Tailwind
├── next.config.js              # Configuration Next.js
└── README.md                   # Cette documentation
```

## 🔌 API Documentation

### Endpoint Principal
```
GET /api/data
```

### Format de Réponse
```json
{
  "RED": 15,
  "GREEN": 23,
  "BLUE": 18,
  "YELLOW": 12,
  "total": 68,
  "success": 65,
  "accuracy": 95.59
}
```

### Champs Expliqués
- **RED/GREEN/BLUE/YELLOW** : Nombre d'objets triés par couleur
- **total** : Nombre total d'objets traités
- **success** : Nombre d'objets correctement triés
- **accuracy** : Pourcentage de précision (success/total * 100)

### Réinitialiser les Données
```bash
curl -X POST http://localhost:3000/api/data
```


## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier \`LICENSE\` pour plus de détails.