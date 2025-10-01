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
    image: '/img/ff564f1e-cbfe-4cd1-930d-f1147b9270d5.jpg',
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
          ownedCats: [...(prev.ownedCats || []), newCat],
          activeCatId: catId // Устанавливаем купленного кота как активного
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