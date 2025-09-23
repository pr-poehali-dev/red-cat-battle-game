export interface Equipment {
  id: string
  name: string
  type: 'weapon' | 'armor' | 'accessory'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  level: number
  bonuses: {
    attack?: number
    defense?: number
    speed?: number
    health?: number
  }
  description: string
  icon: string
}

export interface CraftingMaterial {
  id: string
  name: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  description: string
}

export interface UpgradeRecipe {
  materialsCost: { materialId: string; amount: number }[]
  goldCost: number
  successRate: number
}

export interface BattleCat {
  id: string
  name: string
  level: number
  health: number
  maxHealth: number
  attack: number
  defense: number
  speed: number
  experience: number
  maxExperience: number
  abilities: string[]
  description: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  image: string
  equipment: {
    weapon?: Equipment
    armor?: Equipment
    accessory?: Equipment
  }
}