export interface GameStats {
  level: number
  power: number
  coins: number
  premiumCoins?: number
  experience: number
  maxExperience: number
  clickDamage: number
  energy: number
  maxEnergy: number
  energyRechargeTime: number | null
  ownedCats: OwnedCat[]
  activeCatId?: string
}

export interface OwnedCat {
  id: string
  name: string
  level: number
  experience: number
  maxExperience: number
  baseHealth: number
  currentHealth: number
  maxHealth: number
  baseAttack: number
  currentAttack: number
  baseDefense: number
  currentDefense: number
  baseSpeed: number
  currentSpeed: number
  rarity: string
  rarityColor: string
  borderColor: string
  image: string
  upgradePoints: number
  expirationDate?: Date
}

export interface Enemy {
  name: string
  health: number
  maxHealth: number
  reward: number
}

export interface DamageNumber {
  id: number
  damage: number
  x: number
  y: number
}

export interface EnergyParticle {
  id: number
  x: number
  y: number
  angle: number
  color: string
}

export interface Upgrade {
  name: string
  cost: number
  powerIncrease: number
  description: string
}