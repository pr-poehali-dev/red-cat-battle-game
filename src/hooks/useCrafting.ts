import { useState } from 'react'
import { Equipment, CraftingMaterial, UpgradeRecipe } from '@/types/cats'

export const useCrafting = () => {
  const [showCrafting, setShowCrafting] = useState(false)
  const [materials, setMaterials] = useState<Record<string, number>>({
    'star-fragment': 5,
    'cosmic-ore': 3,
    'energy-crystal': 2,
    'dark-matter': 1
  })
  const [gold, setGold] = useState(1000)
  const [isUpgrading, setIsUpgrading] = useState<string | null>(null)
  const [upgradeResult, setUpgradeResult] = useState<{ success: boolean; message: string } | null>(null)

  const craftingMaterials: Record<string, CraftingMaterial> = {
    'star-fragment': {
      id: 'star-fragment',
      name: 'Звездный осколок',
      icon: '⭐',
      rarity: 'common',
      description: 'Осколок упавшей звезды'
    },
    'cosmic-ore': {
      id: 'cosmic-ore', 
      name: 'Космическая руда',
      icon: '🪨',
      rarity: 'rare',
      description: 'Редкий металл из глубин космоса'
    },
    'energy-crystal': {
      id: 'energy-crystal',
      name: 'Энергетический кристалл',
      icon: '💎',
      rarity: 'epic', 
      description: 'Кристалл, пульсирующий энергией'
    },
    'dark-matter': {
      id: 'dark-matter',
      name: 'Темная материя',
      icon: '🌑',
      rarity: 'legendary',
      description: 'Загадочная субстанция вселенной'
    }
  }

  const getUpgradeRecipe = (equipment: Equipment): UpgradeRecipe => {
    const baseLevel = equipment.level || 1
    const rarityMultiplier = {
      common: 1,
      rare: 1.5, 
      epic: 2,
      legendary: 3
    }[equipment.rarity] || 1

    return {
      materialsCost: [
        { materialId: 'star-fragment', amount: Math.ceil(baseLevel * 2 * rarityMultiplier) },
        { materialId: 'cosmic-ore', amount: Math.ceil(baseLevel * 1 * rarityMultiplier) }
      ],
      goldCost: Math.ceil(baseLevel * 100 * rarityMultiplier),
      successRate: Math.max(40, 95 - baseLevel * 5 - (rarityMultiplier - 1) * 10)
    }
  }

  const handleUpgradeEquipment = async (equipmentId: string, inventory: Equipment[], setInventory: React.Dispatch<React.SetStateAction<Equipment[]>>) => {
    const equipment = inventory.find(item => item.id === equipmentId)
    if (!equipment) return

    const recipe = getUpgradeRecipe(equipment)
    
    for (const cost of recipe.materialsCost) {
      if ((materials[cost.materialId] || 0) < cost.amount) {
        setUpgradeResult({ success: false, message: 'Недостаточно материалов!' })
        setTimeout(() => setUpgradeResult(null), 3000)
        return
      }
    }

    if (gold < recipe.goldCost) {
      setUpgradeResult({ success: false, message: 'Недостаточно золота!' })
      setTimeout(() => setUpgradeResult(null), 3000)
      return
    }

    setIsUpgrading(equipmentId)

    setTimeout(() => {
      const success = Math.random() * 100 < recipe.successRate

      if (success) {
        setMaterials(prev => {
          const newMaterials = { ...prev }
          recipe.materialsCost.forEach(cost => {
            newMaterials[cost.materialId] = (newMaterials[cost.materialId] || 0) - cost.amount
          })
          return newMaterials
        })
        setGold(prev => prev - recipe.goldCost)

        setInventory(prev => prev.map(item => {
          if (item.id === equipmentId) {
            const newLevel = (item.level || 1) + 1
            const bonusMultiplier = 1.2
            
            return {
              ...item,
              level: newLevel,
              name: `${item.name} +${newLevel}`,
              bonuses: Object.fromEntries(
                Object.entries(item.bonuses).map(([key, value]) => [
                  key, 
                  Math.ceil((value || 0) * bonusMultiplier)
                ])
              )
            }
          }
          return item
        }))

        setUpgradeResult({ success: true, message: 'Улучшение успешно!' })
      } else {
        setMaterials(prev => {
          const newMaterials = { ...prev }
          recipe.materialsCost.forEach(cost => {
            newMaterials[cost.materialId] = (newMaterials[cost.materialId] || 0) - Math.ceil(cost.amount / 2)
          })
          return newMaterials
        })
        
        setUpgradeResult({ success: false, message: 'Улучшение провалилось!' })
      }

      setIsUpgrading(null)
      setTimeout(() => setUpgradeResult(null), 3000)
    }, 2000)
  }

  const handleGatherMaterials = () => {
    const possibleMaterials = Object.keys(craftingMaterials)
    const foundMaterial = possibleMaterials[Math.floor(Math.random() * possibleMaterials.length)]
    const amount = Math.floor(Math.random() * 3) + 1

    setMaterials(prev => ({
      ...prev,
      [foundMaterial]: (prev[foundMaterial] || 0) + amount
    }))

    const goldGain = Math.floor(Math.random() * 100) + 50
    setGold(prev => prev + goldGain)
  }

  return {
    showCrafting,
    setShowCrafting,
    materials,
    gold,
    isUpgrading,
    upgradeResult,
    craftingMaterials,
    getUpgradeRecipe,
    handleUpgradeEquipment,
    handleGatherMaterials
  }
}