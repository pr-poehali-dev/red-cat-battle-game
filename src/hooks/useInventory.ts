import { useState } from 'react'
import { Equipment, BattleCat } from '@/types/cats'
import { equipmentData } from '@/hooks/useCatData'

export const useInventory = () => {
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

  const [selectedCat, setSelectedCat] = useState<string | null>(null)
  const [showEquipment, setShowEquipment] = useState(false)

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

  const handleFindEquipment = () => {
    const newEquipment = generateRandomEquipment()
    setInventory(prev => [...prev, newEquipment])
  }

  const handleEquipItem = (catId: string, equipment: Equipment, setCats: React.Dispatch<React.SetStateAction<BattleCat[]>>) => {
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

  const handleUnequipItem = (catId: string, equipmentType: 'weapon' | 'armor' | 'accessory', cats: BattleCat[], setCats: React.Dispatch<React.SetStateAction<BattleCat[]>>) => {
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

  return {
    inventory,
    setInventory,
    selectedCat,
    setSelectedCat,
    showEquipment,
    setShowEquipment,
    handleFindEquipment,
    handleEquipItem,
    handleUnequipItem
  }
}