export interface GameStats {
  level: number
  power: number
  coins: number
  experience: number
  maxExperience: number
  clickDamage: number
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