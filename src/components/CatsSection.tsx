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
  const [cats] = useState<BattleCat[]>([
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

  return (
    <div className="p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Icon name="Cat" size={28} />
          Боевые Коты
        </h1>
        <p className="text-white/70">Управляйте своей армией космических котов-воинов</p>
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
                  <div className="text-right">
                    <div className="text-sm text-white/70">Опыт</div>
                    <div className="text-white font-semibold">{cat.experience}/{cat.maxExperience}</div>
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
        <Icon name="Plus" size={24} className="text-white/50 mx-auto mb-2" />
        <h3 className="text-white font-semibold mb-1">Добавить нового кота</h3>
        <p className="text-white/60 text-sm mb-3">Найдите новых котов-воинов в галактике</p>
        <button className="bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white py-2 px-4 rounded font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all">
          Исследовать космос
        </button>
      </div>
    </div>
  )
}

export default CatsSection