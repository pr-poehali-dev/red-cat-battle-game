import React, { useState } from 'react'
import Icon from '@/components/ui/icon'
import CatCard from '@/components/cats/CatCard'
import InventoryModal from '@/components/cats/InventoryModal'
import CraftingModal from '@/components/cats/CraftingModal'
import ActionButtons from '@/components/cats/ActionButtons'
import { BattleCat, Equipment, CraftingMaterial, UpgradeRecipe } from '@/types/cats'
import { getRarityColor } from '@/utils/catHelpers'
import { catNames, catAbilities, catDescriptions, equipmentData } from '@/hooks/useCatData'

const CatsSection: React.FC = () => {
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
  const [selectedCat, setSelectedCat] = useState<string | null>(null)
  const [showEquipment, setShowEquipment] = useState(false)

  // Инвентарь экипировки
  const [inventory, setInventory] = useState<Equipment[]>([
    {
      id: 'laser-sword',
      name: 'Лазерный меч',
      type: 'weapon',
      rarity: 'rare',
      level: 1,
      bonuses: { attack: 8 },
      description: 'Светящийся клинок из чистой энергии',
      icon: '⚔️'
    },
    {
      id: 'cosmic-armor',
      name: 'Космическая броня',
      type: 'armor',
      rarity: 'epic',
      level: 1,
      bonuses: { defense: 12, health: 25 },
      description: 'Защитный костюм из звездного металла',
      icon: '🛡️'
    },
    {
      id: 'speed-boots',
      name: 'Ускорительные сапоги',
      type: 'accessory',
      rarity: 'rare',
      level: 1,
      bonuses: { speed: 10 },
      description: 'Увеличивают скорость передвижения',
      icon: '👢'
    }
  ])

  // Состояния для крафта
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

  // База материалов для крафта
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

  const generateRandomEquipment = () => {
    const types: ('weapon' | 'armor' | 'accessory')[] = ['weapon', 'armor', 'accessory']
    const type = types[Math.floor(Math.random() * types.length)]
    
    const rarityRoll = Math.random()
    let rarity: 'common' | 'rare' | 'epic' | 'legendary'
    
    if (rarityRoll < 0.5) rarity = 'common'
    else if (rarityRoll < 0.8) rarity = 'rare'
    else if (rarityRoll < 0.95) rarity = 'epic'
    else rarity = 'legendary'

    const data = equipmentData[type]
    const name = data.names[Math.floor(Math.random() * data.names.length)]
    const icon = data.icons[Math.floor(Math.random() * data.icons.length)]
    const bonuses = data.bonuses(rarity)

    return {
      id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      type,
      rarity,
      level: 1,
      bonuses,
      description: `${rarity === 'legendary' ? 'Легендарный' : rarity === 'epic' ? 'Эпический' : rarity === 'rare' ? 'Редкий' : 'Обычный'} предмет экипировки`,
      icon
    }
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

  const handleEquipItem = (catId: string, equipment: Equipment) => {
    setCats(prev => prev.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          equipment: {
            ...cat.equipment,
            [equipment.type]: equipment
          }
        }
      }
      return cat
    }))

    setInventory(prev => prev.filter(item => item.id !== equipment.id))
  }

  const handleUnequipItem = (catId: string, equipmentType: 'weapon' | 'armor' | 'accessory') => {
    const cat = cats.find(c => c.id === catId)
    const equipment = cat?.equipment[equipmentType]
    
    if (equipment) {
      setInventory(prev => [...prev, equipment])
      
      setCats(prev => prev.map(c => {
        if (c.id === catId) {
          const newEquipment = { ...c.equipment }
          delete newEquipment[equipmentType]
          return { ...c, equipment: newEquipment }
        }
        return c
      }))
    }
  }

  const handleFindEquipment = () => {
    const newEquipment = generateRandomEquipment()
    setInventory(prev => [...prev, newEquipment])
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

  // Функции системы крафта
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

  const handleUpgradeEquipment = async (equipmentId: string) => {
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

  const stats = getCollectionStats()

  return (
    <div className="p-4 space-y-6">
      {/* Заголовок и статистика */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Космические Коты-Воители 🚀</h2>
        <div className="flex justify-center gap-6 text-sm">
          <div className="text-white/70">
            Всего котов: <span className="text-white font-semibold">{stats.total}</span>
          </div>
          <div className="text-white/70">
            Общий уровень: <span className="text-white font-semibold">{stats.totalLevel}</span>
          </div>
        </div>
        <div className="flex justify-center gap-4 text-xs">
          <div className={`${getRarityColor('common').split(' ')[0]} font-semibold`}>
            Обычные: {stats.byRarity.common}
          </div>
          <div className={`${getRarityColor('rare').split(' ')[0]} font-semibold`}>
            Редкие: {stats.byRarity.rare}
          </div>
          <div className={`${getRarityColor('epic').split(' ')[0]} font-semibold`}>
            Эпические: {stats.byRarity.epic}
          </div>
          <div className={`${getRarityColor('legendary').split(' ')[0]} font-semibold`}>
            Легендарные: {stats.byRarity.legendary}
          </div>
        </div>
      </div>

      {/* Уведомления */}
      {levelUpMessage && (
        <div className="bg-gradient-to-r from-cosmic-purple/30 to-cosmic-cyan/30 border border-cosmic-purple/50 rounded-lg p-3 text-center">
          <p className="text-white font-semibold">{levelUpMessage}</p>
        </div>
      )}

      {expGainMessage && (
        <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 text-center">
          <p className="text-blue-300 font-semibold">{expGainMessage}</p>
        </div>
      )}

      {/* Сетка котов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cats.map(cat => (
          <CatCard
            key={cat.id}
            cat={cat}
            isTraining={isTraining === cat.id}
            onTrain={() => handleTrainCat(cat.id)}
            onEquip={() => {
              setSelectedCat(cat.id)
              setShowEquipment(true)
            }}
            onDelete={() => handleDeleteCat(cat.id)}
            canDelete={cats.length > 1 && cat.id !== 'default-cat'}
            calculateTotalStats={calculateTotalStats}
          />
        ))}
      </div>

      {/* Кнопки действий */}
      <ActionButtons
        isCreating={isCreating}
        onCreateNewCat={handleCreateNewCat}
        onFindEquipment={handleFindEquipment}
        onShowCrafting={() => setShowCrafting(true)}
        onGatherMaterials={handleGatherMaterials}
      />

      {/* Модальные окна */}
      <InventoryModal
        isOpen={showEquipment && selectedCat !== null}
        onClose={() => setShowEquipment(false)}
        inventory={inventory}
        onEquipItem={(equipmentId) => {
          if (selectedCat) {
            const equipment = inventory.find(item => item.id === equipmentId)
            if (equipment) {
              handleEquipItem(selectedCat, equipment)
            }
          }
        }}
      />

      <CraftingModal
        isOpen={showCrafting}
        onClose={() => setShowCrafting(false)}
        inventory={inventory}
        materials={materials}
        gold={gold}
        craftingMaterials={craftingMaterials}
        isUpgrading={isUpgrading}
        upgradeResult={upgradeResult}
        onUpgradeEquipment={handleUpgradeEquipment}
        getUpgradeRecipe={getUpgradeRecipe}
      />
    </div>
  )
}

export default CatsSection