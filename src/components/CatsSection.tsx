import React, { useState } from 'react'
import Icon from '@/components/ui/icon'

interface Equipment {
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

interface CraftingMaterial {
  id: string
  name: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  description: string
}

interface UpgradeRecipe {
  materialsCost: { materialId: string; amount: number }[]
  goldCost: number
  successRate: number
}

interface BattleCat {
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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-500'
      case 'rare': return 'text-blue-400 border-blue-500'
      case 'epic': return 'text-purple-400 border-purple-500'
      case 'legendary': return 'text-yellow-400 border-yellow-500'
      default: return 'text-gray-400 border-gray-500'
    }
  }

  const getRarityName = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Обычный'
      case 'rare': return 'Редкий'
      case 'epic': return 'Эпический'
      case 'legendary': return 'Легендарный'
      default: return 'Обычный'
    }
  }

  // Базы данных для генерации котов
  const catNames = [
    'Космический Страж', 'Звездный Охотник', 'Галактический Воин', 'Небесный Защитник',
    'Лунный Рыцарь', 'Солнечный Боец', 'Кометный Ас', 'Астральный Хищник',
    'Планетарный Герой', 'Межзвездный Капитан', 'Орбитальный Снайпер', 'Космический Ниндзя',
    'Звездолетный Пилот', 'Галактический Командир', 'Туманный Призрак', 'Черная Дыра'
  ]

  const catAbilities = {
    common: [
      'Быстрый удар - наносит обычный урон',
      'Прыжок - увеличивает уклонение',
      'Царапины - базовая атака когтями'
    ],
    rare: [
      'Энергетический залп - стреляет лучами',
      'Щит защиты - блокирует урон',
      'Ускорение - увеличивает скорость на 30%',
      'Лечение - восстанавливает здоровье'
    ],
    epic: [
      'Плазменная атака - наносит урон по области',
      'Телепортация - мгновенно перемещается',
      'Временное замедление - замедляет врагов',
      'Энергетический барьер - отражает атаки'
    ],
    legendary: [
      'Звездная буря - опустошительная атака',
      'Квантовый прыжок - неуязвимость на 3 секунды',
      'Галактическое господство - удваивает все характеристики',
      'Черная дыра - засасывает всех врагов'
    ]
  }

  const catDescriptions = [
    'Ветеран многих космических войн, закаленный в боях',
    'Молодой, но талантливый воин с большим потенциалом',
    'Загадочный кот из далекой галактики с древними знаниями',
    'Бывший космический пират, перешедший на сторону добра',
    'Элитный боец специальных космических сил',
    'Мудрый стратег, предпочитающий думать, а потом драться',
    'Отважный исследователь неизвестных миров',
    'Технический гений, создающий собственное оружие'
  ]

  const catEmojis = ['🐱‍🚀', '🐱‍👤', '🦁', '🐯', '🐆', '😸', '😼', '🙀']

  const generateRandomCat = (): BattleCat => {
    // Определяем редкость (чем реже, тем меньше шанс)
    const rarityRoll = Math.random()
    let rarity: 'common' | 'rare' | 'epic' | 'legendary'
    
    if (rarityRoll < 0.6) rarity = 'common'
    else if (rarityRoll < 0.85) rarity = 'rare'
    else if (rarityRoll < 0.97) rarity = 'epic'
    else rarity = 'legendary'

    // Базовые характеристики зависят от редкости
    const baseStats = {
      common: { health: 80, attack: 10, defense: 5, speed: 8 },
      rare: { health: 120, attack: 18, defense: 12, speed: 15 },
      epic: { health: 180, attack: 28, defense: 20, speed: 22 },
      legendary: { health: 300, attack: 45, defense: 35, speed: 35 }
    }

    const stats = baseStats[rarity]
    
    // Добавляем случайные вариации (±20%)
    const randomVariation = () => 0.8 + Math.random() * 0.4
    
    const health = Math.floor(stats.health * randomVariation())
    const attack = Math.floor(stats.attack * randomVariation())
    const defense = Math.floor(stats.defense * randomVariation())
    const speed = Math.floor(stats.speed * randomVariation())

    // Выбираем случайные способности для редкости
    const availableAbilities = catAbilities[rarity]
    const numAbilities = rarity === 'common' ? 2 : rarity === 'rare' ? 3 : rarity === 'epic' ? 4 : 5
    const selectedAbilities = []
    
    for (let i = 0; i < numAbilities; i++) {
      const randomAbility = availableAbilities[Math.floor(Math.random() * availableAbilities.length)]
      if (!selectedAbilities.includes(randomAbility)) {
        selectedAbilities.push(randomAbility)
      }
    }

    return {
      id: `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: catNames[Math.floor(Math.random() * catNames.length)],
      level: 1,
      health,
      maxHealth: health,
      attack,
      defense,
      speed,
      experience: 0,
      maxExperience: 100,
      abilities: selectedAbilities,
      description: catDescriptions[Math.floor(Math.random() * catDescriptions.length)],
      rarity,
      image: catEmojis[Math.floor(Math.random() * catEmojis.length)],
      equipment: {}
    }
  }

  const [isCreating, setIsCreating] = useState(false)

  const handleCreateNewCat = () => {
    setIsCreating(true)
    
    // Имитация поиска в космосе
    setTimeout(() => {
      const newCat = generateRandomCat()
      setCats(prev => [...prev, newCat])
      setIsCreating(false)
    }, 1500)
  }

  const handleDeleteCat = (catId: string) => {
    if (cats.length > 1) { // Не позволяем удалить последнего кота
      setCats(prev => prev.filter(cat => cat.id !== catId))
    }
  }

  // Статистика коллекции
  const getCollectionStats = () => {
    const rarityCount = cats.reduce((acc, cat) => {
      acc[cat.rarity] = (acc[cat.rarity] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const totalPower = cats.reduce((sum, cat) => sum + cat.attack + cat.defense + cat.speed, 0)
    
    return { rarityCount, totalPower }
  }

  const { rarityCount, totalPower } = getCollectionStats()
  
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

  // Базы данных экипировки
  const equipmentData = {
    weapon: {
      names: ['Плазменный бластер', 'Квантовая катана', 'Звездный посох', 'Космический молот', 'Нейтронная пушка'],
      icons: ['🔫', '⚔️', '🪄', '🔨', '💥'],
      bonuses: (rarity: string) => ({
        common: { attack: 3 + Math.floor(Math.random() * 3) },
        rare: { attack: 6 + Math.floor(Math.random() * 5) },
        epic: { attack: 12 + Math.floor(Math.random() * 8) },
        legendary: { attack: 20 + Math.floor(Math.random() * 15) }
      }[rarity])
    },
    armor: {
      names: ['Энергетический щит', 'Нанокостюм', 'Плазменная защита', 'Астральный панцирь', 'Квантовая оболочка'],
      icons: ['🛡️', '🥋', '🦺', '⚔️', '🔮'],
      bonuses: (rarity: string) => ({
        common: { defense: 2 + Math.floor(Math.random() * 2), health: 10 + Math.floor(Math.random() * 10) },
        rare: { defense: 5 + Math.floor(Math.random() * 4), health: 20 + Math.floor(Math.random() * 15) },
        epic: { defense: 10 + Math.floor(Math.random() * 6), health: 35 + Math.floor(Math.random() * 25) },
        legendary: { defense: 18 + Math.floor(Math.random() * 12), health: 60 + Math.floor(Math.random() * 40) }
      }[rarity])
    },
    accessory: {
      names: ['Космические очки', 'Гравитационные перчатки', 'Телепортер', 'Энергетическое кольцо', 'Временной браслет'],
      icons: ['🕶️', '🧤', '⚡', '💍', '⌚'],
      bonuses: (rarity: string) => ({
        common: { speed: 2 + Math.floor(Math.random() * 3) },
        rare: { speed: 5 + Math.floor(Math.random() * 5), attack: 2 },
        epic: { speed: 10 + Math.floor(Math.random() * 8), attack: 5, defense: 3 },
        legendary: { speed: 18 + Math.floor(Math.random() * 12), attack: 10, defense: 8, health: 20 }
      }[rarity])
    }
  }

  const generateRandomEquipment = (): Equipment => {
    const types = ['weapon', 'armor', 'accessory'] as const
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
    
    // Имитация тренировки
    setTimeout(() => {
      setCats(prev => prev.map(cat => {
        if (cat.id === catId) {
          const expGain = 25 + Math.floor(Math.random() * 25) // 25-50 опыта
          const newExperience = cat.experience + expGain
          const isLevelUp = newExperience >= cat.maxExperience
          
          // Показываем сообщение о получении опыта
          if (!isLevelUp) {
            setExpGainMessage(`${cat.name} получил ${expGain} опыта! 📈`)
            setTimeout(() => setExpGainMessage(null), 2000)
          }
          
          if (isLevelUp) {
            // Повышение уровня с улучшением характеристик
            const healthBonus = Math.floor(cat.maxHealth * 0.15) // +15% к здоровью
            const attackBonus = Math.floor(cat.attack * 0.12) // +12% к атаке
            const defenseBonus = Math.floor(cat.defense * 0.1) // +10% к защите
            const speedBonus = Math.floor(cat.speed * 0.08) // +8% к скорости
            
            const newMaxHealth = cat.maxHealth + healthBonus
            
            // Показываем сообщение о повышении уровня
            setLevelUpMessage(`${cat.name} достиг ${cat.level + 1} уровня! ⭐`)
            setTimeout(() => setLevelUpMessage(null), 3000)
            
            return {
              ...cat,
              level: cat.level + 1,
              experience: newExperience - cat.maxExperience,
              maxExperience: Math.floor(cat.maxExperience * 1.3), // +30% к требуемому опыту
              health: newMaxHealth, // Полное восстановление при повышении уровня
              maxHealth: newMaxHealth,
              attack: cat.attack + attackBonus,
              defense: cat.defense + defenseBonus,
              speed: cat.speed + speedBonus
            }
          } else {
            // Просто добавляем опыт
            return {
              ...cat,
              experience: newExperience
            }
          }
        }
        return cat
      }))
      setIsTraining(null)
    }, 2000)
  }

  const handleEquipItem = (catId: string, equipment: Equipment) => {
    setCats(prev => prev.map(cat => {
      if (cat.id === catId) {
        const newEquipment = { ...cat.equipment }
        newEquipment[equipment.type] = equipment
        
        return {
          ...cat,
          equipment: newEquipment
        }
      }
      return cat
    }))
    
    // Удаляем из инвентаря
    setInventory(prev => prev.filter(item => item.id !== equipment.id))
    setShowEquipment(false)
  }

  const handleUnequipItem = (catId: string, type: 'weapon' | 'armor' | 'accessory') => {
    const cat = cats.find(c => c.id === catId)
    const equipment = cat?.equipment[type]
    
    if (equipment) {
      // Возвращаем в инвентарь
      setInventory(prev => [...prev, equipment])
      
      // Убираем с кота
      setCats(prev => prev.map(c => {
        if (c.id === catId) {
          const newEquipment = { ...c.equipment }
          delete newEquipment[type]
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
    
    // Проверяем наличие материалов
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

    // Имитация процесса улучшения
    setTimeout(() => {
      const success = Math.random() * 100 < recipe.successRate

      if (success) {
        // Снимаем материалы и золото
        setMaterials(prev => {
          const newMaterials = { ...prev }
          recipe.materialsCost.forEach(cost => {
            newMaterials[cost.materialId] = (newMaterials[cost.materialId] || 0) - cost.amount
          })
          return newMaterials
        })
        setGold(prev => prev - recipe.goldCost)

        // Улучшаем предмет
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
        // При неудаче теряем только половину материалов
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
    // Случайно находим материалы
    const possibleMaterials = Object.keys(craftingMaterials)
    const foundMaterial = possibleMaterials[Math.floor(Math.random() * possibleMaterials.length)]
    const amount = Math.floor(Math.random() * 3) + 1

    setMaterials(prev => ({
      ...prev,
      [foundMaterial]: (prev[foundMaterial] || 0) + amount
    }))

    // Также добавляем немного золота
    const goldGain = Math.floor(Math.random() * 100) + 50
    setGold(prev => prev + goldGain)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Уведомления */}
      {levelUpMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white py-3 px-6 rounded-full shadow-lg animate-bounce">
          <div className="flex items-center gap-2">
            <Icon name="Star" size={20} />
            {levelUpMessage}
          </div>
        </div>
      )}
      
      {expGainMessage && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-green-600/90 text-white py-2 px-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={16} />
            {expGainMessage}
          </div>
        </div>
      )}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Icon name="Cat" size={28} />
          Боевые Коты
        </h1>
        <p className="text-white/70">Управляйте своей армией космических котов-воинов</p>
      </div>

      {/* Статистика коллекции */}
      <div className="bg-space-dark/40 border border-cosmic-purple/40 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Icon name="BarChart3" size={18} />
          Статистика коллекции
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{cats.length}</div>
            <div className="text-xs text-white/60">Всего котов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cosmic-cyan">{totalPower}</div>
            <div className="text-xs text-white/60">Общая мощь</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="text-center p-2 bg-gray-500/20 rounded">
            <div className="font-semibold text-gray-400">{rarityCount.common || 0}</div>
            <div className="text-gray-500">Обычных</div>
          </div>
          <div className="text-center p-2 bg-blue-500/20 rounded">
            <div className="font-semibold text-blue-400">{rarityCount.rare || 0}</div>
            <div className="text-blue-500">Редких</div>
          </div>
          <div className="text-center p-2 bg-purple-500/20 rounded">
            <div className="font-semibold text-purple-400">{rarityCount.epic || 0}</div>
            <div className="text-purple-500">Эпических</div>
          </div>
          <div className="text-center p-2 bg-yellow-500/20 rounded">
            <div className="font-semibold text-yellow-400">{rarityCount.legendary || 0}</div>
            <div className="text-yellow-500">Легендарных</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {cats.map(cat => (
          <div key={cat.id} className={`bg-space-dark/60 backdrop-blur-lg border-2 rounded-lg p-4 ${getRarityColor(cat.rarity)}`}>
            <div className="flex items-start gap-4">
              <div className="text-4xl">{cat.image}</div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                    <p className={`text-sm ${getRarityColor(cat.rarity).split(' ')[0]}`}>
                      {getRarityName(cat.rarity)} • Уровень {cat.level}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right min-w-[80px]">
                      <div className="text-sm text-white/70">Опыт</div>
                      <div className="text-white font-semibold">{cat.experience}/{cat.maxExperience}</div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-gradient-to-r from-cosmic-purple to-cosmic-cyan h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${(cat.experience / cat.maxExperience) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    {cats.length > 1 && cat.id !== 'default-cat' && (
                      <button
                        onClick={() => handleDeleteCat(cat.id)}
                        className="text-red-400 hover:text-red-300 p-1 transition-colors"
                        title="Удалить кота"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon name="Heart" size={14} className="text-red-400" />
                      <span className="text-white/70">Здоровье:</span>
                      <span className="text-white font-semibold">
                        {cat.health}/{calculateTotalStats(cat).totalHealth}
                        {calculateTotalStats(cat).totalHealth > cat.maxHealth && (
                          <span className="text-green-400 text-xs"> (+{calculateTotalStats(cat).totalHealth - cat.maxHealth})</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Sword" size={14} className="text-orange-400" />
                      <span className="text-white/70">Атака:</span>
                      <span className="text-white font-semibold">
                        {calculateTotalStats(cat).totalAttack}
                        {calculateTotalStats(cat).totalAttack > cat.attack && (
                          <span className="text-green-400 text-xs"> (+{calculateTotalStats(cat).totalAttack - cat.attack})</span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon name="Shield" size={14} className="text-blue-400" />
                      <span className="text-white/70">Защита:</span>
                      <span className="text-white font-semibold">
                        {calculateTotalStats(cat).totalDefense}
                        {calculateTotalStats(cat).totalDefense > cat.defense && (
                          <span className="text-green-400 text-xs"> (+{calculateTotalStats(cat).totalDefense - cat.defense})</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Zap" size={14} className="text-yellow-400" />
                      <span className="text-white/70">Скорость:</span>
                      <span className="text-white font-semibold">
                        {calculateTotalStats(cat).totalSpeed}
                        {calculateTotalStats(cat).totalSpeed > cat.speed && (
                          <span className="text-green-400 text-xs"> (+{calculateTotalStats(cat).totalSpeed - cat.speed})</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Экипировка */}
                <div className="bg-space-dark/40 rounded p-3 space-y-2">
                  <h4 className="text-white font-semibold text-sm flex items-center gap-1">
                    <Icon name="Package" size={14} />
                    Экипировка:
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(['weapon', 'armor', 'accessory'] as const).map(type => {
                      const equipment = cat.equipment[type]
                      const typeNames = { weapon: 'Оружие', armor: 'Броня', accessory: 'Аксессуар' }
                      
                      return (
                        <div key={type} className="text-center">
                          <div className="text-xs text-white/60 mb-1">{typeNames[type]}</div>
                          {equipment ? (
                            <button
                              onClick={() => handleUnequipItem(cat.id, type)}
                              className="w-full p-2 bg-cosmic-purple/30 rounded border border-cosmic-purple/50 hover:bg-cosmic-purple/50 transition-all"
                              title={`${equipment.name}: ${Object.entries(equipment.bonuses).map(([key, value]) => `+${value} ${key}`).join(', ')}`}
                            >
                              <div className="text-lg">{equipment.icon}</div>
                              <div className="text-xs text-white/80 truncate">{equipment.name}</div>
                            </button>
                          ) : (
                            <div className="w-full p-2 bg-gray-600/30 rounded border border-gray-500/50">
                              <div className="text-lg text-gray-500">⚪</div>
                              <div className="text-xs text-gray-500">Пусто</div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-space-dark/40 rounded p-3 space-y-2">
                  <h4 className="text-white font-semibold text-sm flex items-center gap-1">
                    <Icon name="Star" size={14} />
                    Способности:
                  </h4>
                  <ul className="space-y-1">
                    {cat.abilities.map((ability, index) => (
                      <li key={index} className="text-xs text-white/80 flex items-start gap-1">
                        <span className="text-cosmic-cyan">•</span>
                        {ability}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-white/60 italic">{cat.description}</p>

                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => handleTrainCat(cat.id)}
                    disabled={isTraining === cat.id}
                    className="flex-1 bg-cosmic-purple/30 hover:bg-cosmic-purple/50 disabled:bg-cosmic-purple/20 disabled:cursor-not-allowed text-white py-2 px-3 rounded text-sm font-semibold transition-all flex items-center justify-center gap-1"
                  >
                    {isTraining === cat.id ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                        Тренируется...
                      </>
                    ) : (
                      <>
                        <Icon name="Dumbbell" size={14} />
                        Тренировать
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedCat(cat.id)
                      setShowEquipment(true)
                    }}
                    className="flex-1 bg-cosmic-cyan/30 hover:bg-cosmic-cyan/50 text-white py-2 px-3 rounded text-sm font-semibold transition-all flex items-center justify-center gap-1"
                  >
                    <Icon name="Package" size={14} />
                    Экипировать
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-space-dark/40 border border-cosmic-purple/40 rounded-lg p-4 text-center">
        {isCreating ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-cosmic-cyan border-t-transparent mx-auto mb-2"></div>
            <h3 className="text-white font-semibold mb-1">Сканирование галактики...</h3>
            <p className="text-white/60 text-sm">Поиск новых котов-воинов</p>
          </>
        ) : (
          <>
            <Icon name="Plus" size={24} className="text-white/50 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">Добавить нового кота</h3>
            <p className="text-white/60 text-sm mb-3">Найдите новых котов-воинов в галактике</p>
            <button 
              onClick={handleCreateNewCat}
              className="bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white py-2 px-4 rounded font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all hover:scale-105"
            >
              Исследовать космос
            </button>
          </>
        )}
      </div>

      {/* Кнопка поиска экипировки */}
      <div className="bg-space-dark/40 border border-cosmic-cyan/40 rounded-lg p-4 text-center">
        <Icon name="Search" size={24} className="text-white/50 mx-auto mb-2" />
        <h3 className="text-white font-semibold mb-1">Найти экипировку</h3>
        <p className="text-white/60 text-sm mb-3">Обыщите космические руины</p>
        <button 
          onClick={handleFindEquipment}
          className="bg-gradient-to-r from-cosmic-cyan to-blue-500 text-white py-2 px-4 rounded font-semibold hover:shadow-lg hover:shadow-cosmic-cyan/50 transition-all hover:scale-105"
        >
          Искать предметы
        </button>
      </div>

      {/* Кнопка мастерской */}
      <div className="bg-space-dark/40 border border-yellow-500/40 rounded-lg p-4 text-center">
        <Icon name="Hammer" size={24} className="text-white/50 mx-auto mb-2" />
        <h3 className="text-white font-semibold mb-1">Мастерская</h3>
        <p className="text-white/60 text-sm mb-3">Улучшайте экипировку</p>
        <button 
          onClick={() => setShowCrafting(true)}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded font-semibold hover:shadow-lg hover:shadow-yellow-500/50 transition-all hover:scale-105"
        >
          Открыть мастерскую
        </button>
      </div>

      {/* Кнопка сбора материалов */}
      <div className="bg-space-dark/40 border border-green-500/40 rounded-lg p-4 text-center">
        <Icon name="Pickaxe" size={24} className="text-white/50 mx-auto mb-2" />
        <h3 className="text-white font-semibold mb-1">Добыча ресурсов</h3>
        <p className="text-white/60 text-sm mb-3">Найдите материалы и золото</p>
        <button 
          onClick={handleGatherMaterials}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105"
        >
          Собрать ресурсы
        </button>
      </div>

      {/* Модальное окно инвентаря */}
      {showEquipment && selectedCat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-space-dark/90 backdrop-blur-lg border border-cosmic-purple/50 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-cosmic-purple/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Icon name="Package" size={20} />
                  Инвентарь
                </h3>
                <button
                  onClick={() => setShowEquipment(false)}
                  className="text-white/70 hover:text-white"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {inventory.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="Package" size={32} className="text-white/30 mx-auto mb-2" />
                  <p className="text-white/60">Инвентарь пуст</p>
                  <p className="text-white/40 text-sm">Найдите экипировку в космосе</p>
                </div>
              ) : (
                inventory.map(equipment => (
                  <div key={equipment.id} className={`border-2 rounded-lg p-3 ${getRarityColor(equipment.rarity)}`}>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{equipment.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{equipment.name}</h4>
                        <p className={`text-sm ${getRarityColor(equipment.rarity).split(' ')[0]}`}>
                          {getRarityName(equipment.rarity)} {equipment.type === 'weapon' ? 'Оружие' : equipment.type === 'armor' ? 'Броня' : 'Аксессуар'} • Ур. {equipment.level || 1}
                        </p>
                        <div className="text-xs text-white/70 mt-1">
                          {Object.entries(equipment.bonuses).map(([key, value]) => (
                            <span key={key} className="mr-2">+{value} {key}</span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleEquipItem(selectedCat, equipment)}
                        className="bg-cosmic-purple/30 hover:bg-cosmic-purple/50 text-white px-3 py-1 rounded text-sm font-semibold transition-all"
                      >
                        Надеть
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно мастерской */}
      {showCrafting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-space-dark/90 backdrop-blur-lg border border-yellow-500/50 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-yellow-500/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Icon name="Hammer" size={20} />
                  Мастерская улучшений
                </h3>
                <button
                  onClick={() => setShowCrafting(false)}
                  className="text-white/70 hover:text-white"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {/* Ресурсы игрока */}
              <div className="bg-space-dark/60 rounded-lg p-4 mb-4">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Coins" size={16} />
                  Ваши ресурсы
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-yellow-500/20 border border-yellow-500/40 rounded p-2 text-center">
                    <div className="text-yellow-400 font-bold">{gold}</div>
                    <div className="text-white/70 text-sm">💰 Золото</div>
                  </div>
                  {Object.entries(materials).map(([materialId, amount]) => {
                    const material = craftingMaterials[materialId]
                    if (!material) return null
                    return (
                      <div key={materialId} className={`border rounded p-2 text-center ${getRarityColor(material.rarity)}`}>
                        <div className="text-white font-bold">{amount}</div>
                        <div className="text-white/70 text-sm">{material.icon} {material.name}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Список экипировки для улучшения */}
              <h4 className="text-white font-semibold mb-3">Улучшить экипировку</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {inventory.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="Package" size={32} className="text-white/30 mx-auto mb-2" />
                    <p className="text-white/60">Инвентарь пуст</p>
                  </div>
                ) : (
                  inventory.map(equipment => {
                    const recipe = getUpgradeRecipe(equipment)
                    const canUpgrade = recipe.materialsCost.every(cost => (materials[cost.materialId] || 0) >= cost.amount) && gold >= recipe.goldCost
                    
                    return (
                      <div key={equipment.id} className={`border-2 rounded-lg p-3 ${getRarityColor(equipment.rarity)}`}>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{equipment.icon}</div>
                          <div className="flex-1">
                            <h5 className="text-white font-semibold">{equipment.name}</h5>
                            <p className={`text-sm ${getRarityColor(equipment.rarity).split(' ')[0]}`}>
                              {getRarityName(equipment.rarity)} • Уровень {equipment.level || 1}
                            </p>
                            <div className="text-xs text-white/70 mt-1">
                              {Object.entries(equipment.bonuses).map(([key, value]) => (
                                <span key={key} className="mr-2">+{value} {key}</span>
                              ))}
                            </div>
                            
                            {/* Стоимость улучшения */}
                            <div className="mt-2 text-xs">
                              <div className="text-white/60 mb-1">Стоимость улучшения:</div>
                              <div className="flex flex-wrap gap-2">
                                {recipe.materialsCost.map(cost => {
                                  const material = craftingMaterials[cost.materialId]
                                  const hasEnough = (materials[cost.materialId] || 0) >= cost.amount
                                  return (
                                    <span key={cost.materialId} className={hasEnough ? 'text-green-400' : 'text-red-400'}>
                                      {material?.icon} {cost.amount}
                                    </span>
                                  )
                                })}
                                <span className={gold >= recipe.goldCost ? 'text-green-400' : 'text-red-400'}>
                                  💰 {recipe.goldCost}
                                </span>
                              </div>
                              <div className="text-white/50 text-xs mt-1">
                                Шанс успеха: {recipe.successRate}%
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleUpgradeEquipment(equipment.id)}
                            disabled={!canUpgrade || isUpgrading === equipment.id}
                            className={`px-3 py-2 rounded text-sm font-semibold transition-all ${
                              canUpgrade && isUpgrading !== equipment.id
                                ? 'bg-yellow-500/30 hover:bg-yellow-500/50 text-white'
                                : 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {isUpgrading === equipment.id ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent inline-block mr-1"></div>
                                Улучшение...
                              </>
                            ) : (
                              'Улучшить'
                            )}
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Результат улучшения */}
              {upgradeResult && (
                <div className={`mt-4 p-3 rounded-lg text-center ${
                  upgradeResult.success ? 'bg-green-500/20 border border-green-500/40' : 'bg-red-500/20 border border-red-500/40'
                }`}>
                  <p className={upgradeResult.success ? 'text-green-400' : 'text-red-400'}>
                    {upgradeResult.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CatsSection