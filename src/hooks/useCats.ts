import { useState } from 'react'
import { BattleCat } from '@/types/cats'
import { catNames, catAbilities, catDescriptions } from '@/hooks/useCatData'

export const useCats = () => {
  const [cats, setCats] = useState<BattleCat[]>([
    {
      id: 'default-cat',
      name: 'Космический Воин',
      level: 1,
      health: 100,
      maxHealth: 100,
      attack: 15,
      defense: 8,
      speed: 12,
      experience: 0,
      maxExperience: 100,
      abilities: [
        'Космический прыжок - телепортируется к врагу',
        'Звездная атака - наносит урон по площади',
        'Защитное поле - увеличивает защиту на 50%'
      ],
      description: 'Храбрый космический кот, защитник галактики. Обладает невероятной ловкостью и способностью использовать космическую энергию в бою.',
      rarity: 'common',
      image: '🐱‍🚀',
      equipment: {}
    }
  ])

  const [isCreating, setIsCreating] = useState(false)
  const [isTraining, setIsTraining] = useState<string | null>(null)
  const [levelUpMessage, setLevelUpMessage] = useState<string | null>(null)
  const [expGainMessage, setExpGainMessage] = useState<string | null>(null)

  const generateRandomCat = (): BattleCat => {
    const rarityRoll = Math.random()
    let rarity: 'common' | 'rare' | 'epic' | 'legendary'
    
    if (rarityRoll < 0.6) rarity = 'common'
    else if (rarityRoll < 0.85) rarity = 'rare'
    else if (rarityRoll < 0.96) rarity = 'epic'
    else rarity = 'legendary'

    const rarityMultipliers = {
      common: { stats: 1, exp: 1 },
      rare: { stats: 1.3, exp: 1.5 },
      epic: { stats: 1.6, exp: 2 },
      legendary: { stats: 2, exp: 3 }
    }

    const multiplier = rarityMultipliers[rarity]
    const name = catNames[Math.floor(Math.random() * catNames.length)]
    const baseHealth = Math.floor((80 + Math.random() * 40) * multiplier.stats)
    const baseAttack = Math.floor((10 + Math.random() * 10) * multiplier.stats)
    const baseDefense = Math.floor((5 + Math.random() * 8) * multiplier.stats)
    const baseSpeed = Math.floor((8 + Math.random() * 12) * multiplier.stats)
    const maxExp = Math.floor(100 * multiplier.exp)

    const abilityPool = catAbilities[rarity]
    const descriptionPool = catDescriptions[rarity]
    const numAbilities = rarity === 'common' ? 2 : rarity === 'rare' ? 3 : rarity === 'epic' ? 4 : 5
    
    const shuffledAbilities = [...abilityPool].sort(() => 0.5 - Math.random())
    const selectedAbilities = shuffledAbilities.slice(0, numAbilities)

    const catImages = ['🐱‍🚀', '🐱‍👤', '🐱‍💻', '🐱‍🏍', '🦁', '🐯', '🐱']
    const image = catImages[Math.floor(Math.random() * catImages.length)]

    return {
      id: `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      level: 1,
      health: baseHealth,
      maxHealth: baseHealth,
      attack: baseAttack,
      defense: baseDefense,
      speed: baseSpeed,
      experience: 0,
      maxExperience: maxExp,
      abilities: selectedAbilities,
      description: descriptionPool[Math.floor(Math.random() * descriptionPool.length)],
      rarity,
      image,
      equipment: {}
    }
  }

  const handleCreateNewCat = () => {
    setIsCreating(true)
    
    setTimeout(() => {
      const newCat = generateRandomCat()
      setCats(prev => [...prev, newCat])
      setIsCreating(false)
    }, 2000)
  }

  const handleDeleteCat = (catId: string) => {
    setCats(prev => prev.filter(cat => cat.id !== catId))
  }

  const handleTrainCat = (catId: string) => {
    setIsTraining(catId)
    
    setTimeout(() => {
      setCats(prev => prev.map(cat => {
        if (cat.id === catId) {
          const expGain = 25 + Math.floor(Math.random() * 25)
          const newExperience = cat.experience + expGain
          const isLevelUp = newExperience >= cat.maxExperience
          
          if (!isLevelUp) {
            setExpGainMessage(`${cat.name} получил ${expGain} опыта! 📈`)
            setTimeout(() => setExpGainMessage(null), 3000)
            
            return { ...cat, experience: newExperience }
          } else {
            const newLevel = cat.level + 1
            const remainingExp = newExperience - cat.maxExperience
            const newMaxExp = Math.floor(cat.maxExperience * 1.5)
            
            const statBoosts = {
              health: Math.floor(5 + Math.random() * 10),
              attack: Math.floor(2 + Math.random() * 5),
              defense: Math.floor(1 + Math.random() * 4),
              speed: Math.floor(1 + Math.random() * 3)
            }

            setLevelUpMessage(`🎉 ${cat.name} достиг ${newLevel} уровня! +${statBoosts.health} HP, +${statBoosts.attack} ATK, +${statBoosts.defense} DEF, +${statBoosts.speed} SPD`)
            setTimeout(() => setLevelUpMessage(null), 5000)

            return {
              ...cat,
              level: newLevel,
              experience: remainingExp,
              maxExperience: newMaxExp,
              maxHealth: cat.maxHealth + statBoosts.health,
              health: cat.health + statBoosts.health,
              attack: cat.attack + statBoosts.attack,
              defense: cat.defense + statBoosts.defense,
              speed: cat.speed + statBoosts.speed
            }
          }
        }
        return cat
      }))
      
      setIsTraining(null)
    }, 3000)
  }

  const getCollectionStats = () => {
    const total = cats.length
    const byRarity = {
      common: cats.filter(cat => cat.rarity === 'common').length,
      rare: cats.filter(cat => cat.rarity === 'rare').length,
      epic: cats.filter(cat => cat.rarity === 'epic').length,
      legendary: cats.filter(cat => cat.rarity === 'legendary').length
    }
    const totalLevel = cats.reduce((sum, cat) => sum + cat.level, 0)
    
    return { total, byRarity, totalLevel }
  }

  const calculateTotalStats = (cat: BattleCat) => {
    let totalAttack = cat.attack
    let totalDefense = cat.defense
    let totalSpeed = cat.speed
    let totalHealth = cat.maxHealth

    Object.values(cat.equipment).forEach(equipment => {
      if (equipment) {
        totalAttack += equipment.bonuses.attack || 0
        totalDefense += equipment.bonuses.defense || 0
        totalSpeed += equipment.bonuses.speed || 0
        totalHealth += equipment.bonuses.health || 0
      }
    })

    return { totalAttack, totalDefense, totalSpeed, totalHealth }
  }

  return {
    cats,
    setCats,
    isCreating,
    isTraining,
    levelUpMessage,
    expGainMessage,
    handleCreateNewCat,
    handleDeleteCat,
    handleTrainCat,
    getCollectionStats,
    calculateTotalStats
  }
}