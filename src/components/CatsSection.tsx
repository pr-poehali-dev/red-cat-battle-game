import React, { useState } from 'react'
import Icon from '@/components/ui/icon'

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
      image: '🐱‍🚀'
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
      image: catEmojis[Math.floor(Math.random() * catEmojis.length)]
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

  return (
    <div className="p-4 space-y-6">
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
                    <div className="text-right">
                      <div className="text-sm text-white/70">Опыт</div>
                      <div className="text-white font-semibold">{cat.experience}/{cat.maxExperience}</div>
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
                      <span className="text-white font-semibold">{cat.health}/{cat.maxHealth}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Sword" size={14} className="text-orange-400" />
                      <span className="text-white/70">Атака:</span>
                      <span className="text-white font-semibold">{cat.attack}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon name="Shield" size={14} className="text-blue-400" />
                      <span className="text-white/70">Защита:</span>
                      <span className="text-white font-semibold">{cat.defense}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Zap" size={14} className="text-yellow-400" />
                      <span className="text-white/70">Скорость:</span>
                      <span className="text-white font-semibold">{cat.speed}</span>
                    </div>
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
                  <button className="flex-1 bg-cosmic-purple/30 hover:bg-cosmic-purple/50 text-white py-2 px-3 rounded text-sm font-semibold transition-all">
                    Тренировать
                  </button>
                  <button className="flex-1 bg-cosmic-cyan/30 hover:bg-cosmic-cyan/50 text-white py-2 px-3 rounded text-sm font-semibold transition-all">
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
    </div>
  )
}

export default CatsSection