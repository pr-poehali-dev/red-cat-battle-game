import type { Cat } from '@/types/game'

export interface Enemy {
  name: string
  level: number
  attack: number
  defense: number
  health: number
  maxHealth: number
  speed: number
  emoji: string
  reward: number
  experience: number
}

export interface Tournament {
  name: string
  emoji: string
  requiredLevel: number
  enemies: Enemy[]
  finalReward: number
  description: string
  color: string
}

export interface TournamentProps {
  ownedCats: Cat[]
  playerCoins: number
  onTournamentWin: (reward: number, experience: number) => void
  onCatExperience: (catId: string, experience: number) => void
}

export const tournaments: Tournament[] = [
  {
    name: "Межпланетная Лига",
    emoji: "🌍",
    requiredLevel: 1,
    enemies: [
      { name: "Марсианский Скаут", level: 1, attack: 15, defense: 10, health: 50, maxHealth: 50, speed: 15, emoji: "👽", reward: 30, experience: 25 },
      { name: "Лунный Страж", level: 2, attack: 20, defense: 12, health: 70, maxHealth: 70, speed: 18, emoji: "🛡️", reward: 45, experience: 35 },
      { name: "Венерианский Чемпион", level: 3, attack: 28, defense: 15, health: 90, maxHealth: 90, speed: 22, emoji: "⭐", reward: 60, experience: 50 }
    ],
    finalReward: 200,
    description: "3 боя против инопланетных бойцов",
    color: "from-blue-500 to-purple-600"
  },
  {
    name: "Галактический Чемпионат",
    emoji: "🌌",
    requiredLevel: 5,
    enemies: [
      { name: "Андромедский Воин", level: 5, attack: 40, defense: 25, health: 120, maxHealth: 120, speed: 30, emoji: "⚔️", reward: 80, experience: 70 },
      { name: "Нейтронная Машина", level: 6, attack: 50, defense: 30, health: 150, maxHealth: 150, speed: 25, emoji: "🤖", reward: 100, experience: 85 },
      { name: "Квазарный Титан", level: 7, attack: 60, defense: 35, health: 180, maxHealth: 180, speed: 35, emoji: "💫", reward: 120, experience: 100 },
      { name: "Чёрная Дыра", level: 8, attack: 75, defense: 40, health: 220, maxHealth: 220, speed: 40, emoji: "⚫", reward: 150, experience: 120 }
    ],
    finalReward: 500,
    description: "4 боя против галактических титанов",
    color: "from-purple-600 to-pink-600"
  },
  {
    name: "Турнир Богов",
    emoji: "👑",
    requiredLevel: 10,
    enemies: [
      { name: "Космический Архангел", level: 10, attack: 90, defense: 50, health: 300, maxHealth: 300, speed: 50, emoji: "😇", reward: 200, experience: 150 },
      { name: "Повелитель Времени", level: 12, attack: 110, defense: 60, health: 350, maxHealth: 350, speed: 55, emoji: "⏰", reward: 250, experience: 180 },
      { name: "Создатель Вселенной", level: 15, attack: 140, defense: 80, health: 450, maxHealth: 450, speed: 65, emoji: "🌟", reward: 300, experience: 220 },
      { name: "Абсолютное Бытие", level: 18, attack: 180, defense: 100, health: 600, maxHealth: 600, speed: 80, emoji: "💎", reward: 400, experience: 300 },
      { name: "Альфа и Омега", level: 20, attack: 250, defense: 150, health: 1000, maxHealth: 1000, speed: 100, emoji: "∞", reward: 666, experience: 500 }
    ],
    finalReward: 2000,
    description: "5 боёв против божественных сущностей",
    color: "from-yellow-400 to-orange-600"
  }
]