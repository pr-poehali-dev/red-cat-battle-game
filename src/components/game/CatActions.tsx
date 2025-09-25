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
  tiger: {
    id: 'tiger',
    name: 'Космический Тигр',
    level: 5,
    experience: 0,
    maxExperience: 500,
    baseHealth: 250,
    currentHealth: 250,
    maxHealth: 250,
    baseAttack: 35,
    currentAttack: 35,
    baseDefense: 20,
    currentDefense: 20,
    baseSpeed: 25,
    currentSpeed: 25,
    rarity: 'Редкий',
    rarityColor: 'blue',
    borderColor: 'blue-500',
    image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg',
    upgradePoints: 5
  },
  phoenix: {
    id: 'phoenix',
    name: 'Звёздный Феникс',
    level: 10,
    experience: 0,
    maxExperience: 1000,
    baseHealth: 400,
    currentHealth: 400,
    maxHealth: 400,
    baseAttack: 60,
    currentAttack: 60,
    baseDefense: 35,
    currentDefense: 35,
    baseSpeed: 45,
    currentSpeed: 45,
    rarity: 'Эпический',
    rarityColor: 'purple',
    borderColor: 'purple-500',
    image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg',
    upgradePoints: 10
  },
  dragon: {
    id: 'dragon',
    name: 'Космический Дракон',
    level: 15,
    experience: 0,
    maxExperience: 1500,
    baseHealth: 600,
    currentHealth: 600,
    maxHealth: 600,
    baseAttack: 90,
    currentAttack: 90,
    baseDefense: 55,
    currentDefense: 55,
    baseSpeed: 35,
    currentSpeed: 35,
    rarity: 'Легендарный',
    rarityColor: 'yellow',
    borderColor: 'yellow-500',
    image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg',
    upgradePoints: 15
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
      
      const newCat = CAT_TEMPLATES[catId as keyof typeof CAT_TEMPLATES]
      
      if (newCat) {
        setGameStats(prev => ({
          ...prev,
          coins: prev.coins - cost,
          ownedCats: [...(prev.ownedCats || []), newCat]
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

  return {
    handlePurchaseCat,
    handleUpgradeStat,
    handleLevelUpCat
  }
}