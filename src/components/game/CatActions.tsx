import { GameStats } from '@/types/game'
import type { AudioSystem } from '@/hooks/useAudioSystem'

// Шаблоны котов
export const CAT_TEMPLATES = {
  murka: {
    id: 'murka',
    name: 'Котёнок Мурка',
    level: 1,
    experience: 0,
    maxExperience: 100,
    baseHealth: 100,
    currentHealth: 100,
    maxHealth: 100,
    baseAttack: 15,
    currentAttack: 15,
    baseDefense: 8,
    currentDefense: 8,
    baseSpeed: 12,
    currentSpeed: 12,
    rarity: 'Обычный',
    rarityColor: 'emerald',
    borderColor: 'emerald-500',
    image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg',
    upgradePoints: 0
  },
  'robot-cat': {
    id: 'robot-cat',
    name: 'Кот робот',
    level: 1,
    experience: 0,
    maxExperience: 100,
    baseHealth: 250,
    currentHealth: 250,
    maxHealth: 250,
    baseAttack: 35,
    currentAttack: 35,
    baseDefense: 25,
    currentDefense: 25,
    baseSpeed: 30,
    currentSpeed: 30,
    rarity: 'Редкий',
    rarityColor: 'blue',
    borderColor: 'blue-500',
    image: '/img/f2aba26e-158d-4425-a236-8e9bde734359.jpg',
    upgradePoints: 0
  },
  'volcano-cat': {
    id: 'volcano-cat',
    name: 'Кот Вулкан',
    level: 1,
    experience: 0,
    maxExperience: 100,
    baseHealth: 500,
    currentHealth: 500,
    maxHealth: 500,
    baseAttack: 75,
    currentAttack: 75,
    baseDefense: 50,
    currentDefense: 50,
    baseSpeed: 60,
    currentSpeed: 60,
    rarity: 'Легендарный',
    rarityColor: 'red',
    borderColor: 'red-500',
    image: '/img/13f48431-647c-4a9e-b873-9a11a4edc0f4.jpg',
    upgradePoints: 0
  },
  'lightning-cat': {
    id: 'lightning-cat',
    name: 'Кот молния',
    level: 1,
    experience: 0,
    maxExperience: 100,
    baseHealth: 1000,
    currentHealth: 1000,
    maxHealth: 1000,
    baseAttack: 150,
    currentAttack: 150,
    baseDefense: 100,
    currentDefense: 100,
    baseSpeed: 120,
    currentSpeed: 120,
    rarity: 'Мифический',
    rarityColor: 'purple',
    borderColor: 'purple-500',
    image: '/img/ddfb6b04-6eaa-40fb-bc99-d8c65369c188.jpg',
    upgradePoints: 0
  },
  'metal-cat': {
    id: 'metal-cat',
    name: 'Кот Металл',
    level: 1,
    experience: 0,
    maxExperience: 100,
    baseHealth: 2000,
    currentHealth: 2000,
    maxHealth: 2000,
    baseAttack: 300,
    currentAttack: 300,
    baseDefense: 200,
    currentDefense: 200,
    baseSpeed: 240,
    currentSpeed: 240,
    rarity: 'Эпический',
    rarityColor: 'slate',
    borderColor: 'slate-500',
    image: '/img/fa782b11-875d-421e-9999-f7b7abe5bb07.jpg',
    upgradePoints: 0
  },
  'water-cat': {
    id: 'water-cat',
    name: 'Кот Водяной',
    level: 1,
    experience: 0,
    maxExperience: 100,
    baseHealth: 3500,
    currentHealth: 3500,
    maxHealth: 3500,
    baseAttack: 500,
    currentAttack: 500,
    baseDefense: 350,
    currentDefense: 350,
    baseSpeed: 400,
    currentSpeed: 400,
    rarity: 'Божественный',
    rarityColor: 'cyan',
    borderColor: 'cyan-500',
    image: '/img/c58f1707-e8a4-4245-8490-c44a714dce03.jpg',
    upgradePoints: 0
  },
  'cosmic-guardian': {
    id: 'cosmic-guardian',
    name: 'Космический Страж',
    level: 1,
    experience: 0,
    maxExperience: 100,
    baseHealth: 8000,
    currentHealth: 8000,
    maxHealth: 8000,
    baseAttack: 1200,
    currentAttack: 1200,
    baseDefense: 800,
    currentDefense: 800,
    baseSpeed: 950,
    currentSpeed: 950,
    rarity: 'Титанический',
    rarityColor: 'violet',
    borderColor: 'violet-500',
    image: 'https://cdn.poehali.dev/files/ae6f6ac1-ff18-48d0-b10f-891f56787a1e.jpg',
    upgradePoints: 0
  },
  'dragon-cat': {
    id: 'dragon-cat',
    name: 'Кот Дракон',
    level: 1,
    experience: 0,
    maxExperience: 100,
    baseHealth: 12000,
    currentHealth: 12000,
    maxHealth: 12000,
    baseAttack: 1800,
    currentAttack: 1800,
    baseDefense: 1200,
    currentDefense: 1200,
    baseSpeed: 1400,
    currentSpeed: 1400,
    rarity: 'Драконический',
    rarityColor: 'rose',
    borderColor: 'rose-500',
    image: '/img/81ddf2e3-ddbf-4716-bbc5-9fb39883ecd8.jpg',
    upgradePoints: 0
  },
  'wind-cat': {
    id: 'wind-cat',
    name: 'Кот Ветер',
    level: 1,
    experience: 0,
    maxExperience: 100,
    baseHealth: 15000,
    currentHealth: 15000,
    maxHealth: 15000,
    baseAttack: 2500,
    currentAttack: 2500,
    baseDefense: 1800,
    currentDefense: 1800,
    baseSpeed: 2200,
    currentSpeed: 2200,
    rarity: 'Ветряной',
    rarityColor: 'sky',
    borderColor: 'sky-500',
    image: '/img/be286536-1877-4f86-97d0-99d0f2505c42.jpg',
    upgradePoints: 0
  },
  'autumn-cat': {
    id: 'autumn-cat',
    name: 'Кот Осень',
    level: 1,
    experience: 0,
    maxExperience: 100,
    baseHealth: 18000,
    currentHealth: 18000,
    maxHealth: 18000,
    baseAttack: 3200,
    currentAttack: 3200,
    baseDefense: 2400,
    currentDefense: 2400,
    baseSpeed: 2800,
    currentSpeed: 2800,
    rarity: 'Осенний',
    rarityColor: 'amber',
    borderColor: 'amber-500',
    image: '/img/86baff1c-a4b7-4abb-95a0-472d446b2798.jpg',
    upgradePoints: 0,
    expirationDate: new Date('2025-12-01T00:00:00+05:00')
  },
  'hurricane-cat': {
    id: 'hurricane-cat',
    name: 'Кот Ураган',
    level: 1,
    experience: 0,
    maxExperience: 100,
    baseHealth: 25000,
    currentHealth: 25000,
    maxHealth: 25000,
    baseAttack: 4000,
    currentAttack: 4000,
    baseDefense: 3000,
    currentDefense: 3000,
    baseSpeed: 3500,
    currentSpeed: 3500,
    rarity: 'Премиум Майнер',
    rarityColor: 'purple',
    borderColor: 'purple-500',
    image: '/img/d64a99e1-8e53-48a8-a448-d6f4ad8626da.jpg',
    upgradePoints: 0,
    isPremiumMiner: true,
    premiumMiningEnergyCost: 3000,
    premiumMiningRechargeHours: 6
  },
  'dust-cat': {
    id: 'dust-cat',
    name: 'Кот Пыль',
    level: 1,
    experience: 0,
    maxExperience: 100,
    baseHealth: 50000,
    currentHealth: 50000,
    maxHealth: 50000,
    baseAttack: 8000,
    currentAttack: 8000,
    baseDefense: 6500,
    currentDefense: 6500,
    baseSpeed: 7000,
    currentSpeed: 7000,
    rarity: 'Легендарный Воин',
    rarityColor: 'cyan',
    borderColor: 'cyan-400',
    image: 'https://cdn.poehali.dev/projects/9a98f0ea-78b6-43e3-a2d7-efc2e95278f5/files/045df2ef-bd1f-43c3-9511-77e5fc4d6f32.jpg',
    upgradePoints: 0,
    hasSpecialAbility: true,
    specialAbilityCooldown: 30000,
    specialAbilityLastUsed: 0
  }
}

// Функции для работы с котами
export const useCatActions = (
  gameStats: GameStats,
  audioSystem: AudioSystem,
  setGameStats: React.Dispatch<React.SetStateAction<GameStats>>
) => {

  const handlePurchaseCat = (catId: string, cost: number) => {
    if (cost === 0 || gameStats.coins >= cost) {
      audioSystem.playUpgradeSound()
      
      const template = CAT_TEMPLATES[catId as keyof typeof CAT_TEMPLATES]
      
      if (template) {
        const newCat = { ...template }
        setGameStats(prev => ({
          ...prev,
          coins: prev.coins - cost,
          ownedCats: [...(prev.ownedCats || []), newCat],
          activeCatId: catId
        }))
      }
    }
  }

  const handleUpgradeStat = (catId: string, stat: 'attack' | 'defense' | 'health' | 'speed', cost: number) => {
    if (gameStats.coins >= cost) {
      audioSystem.playUpgradeSound()
      
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins - cost,
        ownedCats: (prev.ownedCats || []).map(cat => {
          if (cat.id === catId) {
            const updates = {
              attack: { currentAttack: cat.currentAttack + 5 },
              defense: { currentDefense: cat.currentDefense + 3 },
              health: { currentHealth: cat.currentHealth + 20, maxHealth: cat.maxHealth + 20 },
              speed: { currentSpeed: cat.currentSpeed + 4 }
            }
            return { ...cat, ...updates[stat] }
          }
          return cat
        })
      }))
    }
  }

  const handleLevelUpCat = (catId: string, cost: number) => {
    if (gameStats.coins >= cost) {
      audioSystem.playLevelUpSound()
      
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins - cost,
        ownedCats: (prev.ownedCats || []).map(cat => {
          if (cat.id === catId) {
            return {
              ...cat,
              level: cat.level + 1,
              maxExperience: Math.floor(cat.maxExperience * 1.2),
              currentAttack: cat.currentAttack + 5,
              currentDefense: cat.currentDefense + 5,
              currentHealth: cat.currentHealth + 5,
              maxHealth: cat.maxHealth + 5,
              currentSpeed: cat.currentSpeed + 5,
              upgradePoints: cat.upgradePoints + 1
            }
          }
          return cat
        })
      }))
    }
  }

  const handleSelectCat = (catId: string) => {
    setGameStats(prev => ({
      ...prev,
      activeCatId: catId
    }))
  }

  return {
    handlePurchaseCat,
    handleUpgradeStat,
    handleLevelUpCat,
    handleSelectCat
  }
}