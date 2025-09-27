import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { GameStats } from '@/types/game'

interface Cat {
  id: string
  name: string
  level: number
  rarity: string
  rarityColor: string
  borderColor: string
  health: number
  maxHealth: number
  attack: number
  defense: number
  speed: number
  cost: number
  isFree: boolean
  image: string
  description: string
  detailedDescription: string
}

interface CatShopProps {
  gameStats: GameStats
  onPurchase: (catId: string, cost: number) => void
}

const CatShop: React.FC<CatShopProps> = ({ gameStats, onPurchase }) => {
  const [cats] = useState<Cat[]>([
    {
      id: 'murka',
      name: 'Котёнок Мурка',
      level: 1,
      rarity: 'Обычный',
      rarityColor: 'emerald',
      borderColor: 'emerald-500',
      health: 100,
      maxHealth: 100,
      attack: 15,
      defense: 8,
      speed: 12,
      cost: 0,
      isFree: true,
      image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg',
      description: 'Ваш первый спутник',
      detailedDescription: 'Милый рыжий котёнок с зелёными глазами. Хоть он и не самый сильный, зато очень преданный и готов сражаться рядом с вами в любых космических приключениях!'
    },
    {
      id: 'tiger',
      name: 'Космический Тигр',
      level: 5,
      rarity: 'Редкий',
      rarityColor: 'blue',
      borderColor: 'blue-500',
      health: 250,
      maxHealth: 250,
      attack: 35,
      defense: 20,
      speed: 25,
      cost: 500,
      isFree: false,
      image: '/img/5d4262b2-4440-4fc8-b5f6-95271ba37bc4.jpg',
      description: 'Могучий космический охотник',
      detailedDescription: 'Величественный тигр из далёких звёздных систем. Его космические полосы светятся в темноте, а его мощь способна пробить броню любого врага!'
    },
    {
      id: 'phoenix',
      name: 'Звёздный Феникс',
      level: 10,
      rarity: 'Эпический',
      rarityColor: 'purple',
      borderColor: 'purple-500',
      health: 400,
      maxHealth: 400,
      attack: 60,
      defense: 35,
      speed: 45,
      cost: 1500,
      isFree: false,
      image: '/img/5dae8386-4f30-4ae8-af2b-94c7bb1f2cde.jpg',
      description: 'Легендарный защитник галактики',
      detailedDescription: 'Мистический кот-феникс с огненными крыльями. Способен восстанавливать здоровье в бою и наносить магический урон. Его пламя никогда не угасает!'
    },
    {
      id: 'dragon',
      name: 'Космический Дракон',
      level: 15,
      rarity: 'Легендарный',
      rarityColor: 'yellow',
      borderColor: 'yellow-500',
      health: 600,
      maxHealth: 600,
      attack: 90,
      defense: 55,
      speed: 35,
      cost: 3000,
      isFree: false,
      image: '/img/d32781c4-bc1a-4096-9140-6bcef628f210.jpg',
      description: 'Величественный повелитель звёзд',
      detailedDescription: 'Легендарный дракон-кот, владыка всех космических созвездий. Его золотая чешуя отражает свет звёзд, а его рык способен остановить время!'
    }
  ])

  const handlePurchase = (cat: Cat) => {
    if (cat.isFree || gameStats.coins >= cat.cost) {
      onPurchase(cat.id, cat.cost)
    }
  }

  const canAfford = (cat: Cat) => {
    return cat.isFree || gameStats.coins >= cat.cost
  }

  const isOwned = (catId: string) => {
    return gameStats.ownedCats?.some(ownedCat => ownedCat.id === catId) || false
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">🛒 Магазин Котов</h1>
        <p className="text-white/70">Выберите своего космического спутника</p>
      </div>

      {/* Баланс игрока */}
      <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-3 border border-yellow-500/30">
        <Icon name="Coins" size={20} className="text-yellow-400" />
        <span className="text-xl font-bold text-yellow-400">{gameStats.coins}</span>
        <span className="text-white/70">монет</span>
      </div>

      {/* Список котов */}
      <div className="space-y-4">
        {cats.map(cat => (
          <Card key={cat.id} className={`bg-gradient-to-r from-slate-700/90 to-slate-800/90 backdrop-blur-sm border-2 border-${cat.borderColor} rounded-xl shadow-xl overflow-hidden`}>
            <CardContent className="p-0">
              <div className="flex">
                {/* Аватар кота */}
                <div className="w-32 h-32 flex-shrink-0 relative">
                  <div className={`w-full h-full bg-gradient-to-br from-${cat.rarityColor}-400/20 to-${cat.rarityColor}-500/20 p-2`}>
                    <img 
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>
                  <div className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold border-${cat.borderColor} bg-slate-800 text-${cat.rarityColor}-400`}>
                    {cat.level}
                  </div>
                </div>

                {/* Описание и характеристики */}
                <div className="flex-1 p-4 space-y-3">
                  {/* Заголовок */}
                  <div>
                    <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                    <Badge className={`bg-gradient-to-r from-${cat.rarityColor}-400 to-${cat.rarityColor}-500 text-white font-bold border border-${cat.rarityColor}-500/50 text-xs`}>
                      {cat.rarity}
                    </Badge>
                  </div>

                  {/* Описание */}
                  <p className="text-white/80 text-sm leading-relaxed">
                    {cat.detailedDescription}
                  </p>

                  {/* Характеристики */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1">
                      <Icon name="Heart" size={14} className="text-red-400" />
                      <span className="text-xs text-white/70">{cat.health} HP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Sword" size={14} className="text-orange-400" />
                      <span className="text-xs text-white/70">{cat.attack} ATK</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Shield" size={14} className="text-blue-400" />
                      <span className="text-xs text-white/70">{cat.defense} DEF</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Zap" size={14} className="text-yellow-400" />
                      <span className="text-xs text-white/70">{cat.speed} SPD</span>
                    </div>
                  </div>

                  {/* Кнопка покупки */}
                  <div className="pt-2">
                    {isOwned(cat.id) ? (
                      <div className="text-center bg-green-500/10 rounded-lg p-2 border border-green-500/30">
                        <div className="text-green-400 font-semibold text-sm">✅ Уже у вас!</div>
                      </div>
                    ) : cat.isFree ? (
                      <Button 
                        onClick={() => handlePurchase(cat)}
                        className={`w-full bg-gradient-to-r from-${cat.rarityColor}-500 to-${cat.rarityColor}-600 hover:from-${cat.rarityColor}-600 hover:to-${cat.rarityColor}-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200`}
                      >
                        🎁 Получить бесплатно
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <Icon name="Coins" size={16} className="text-yellow-400" />
                          <span className="text-lg font-bold text-yellow-400">{cat.cost}</span>
                        </div>
                        <Button 
                          onClick={() => handlePurchase(cat)}
                          disabled={!canAfford(cat)}
                          className={`w-full ${canAfford(cat) 
                            ? `bg-gradient-to-r from-${cat.rarityColor}-500 to-${cat.rarityColor}-600 hover:from-${cat.rarityColor}-600 hover:to-${cat.rarityColor}-700` 
                            : 'bg-gray-500/50 cursor-not-allowed'
                          } text-white font-bold py-2 px-4 rounded-lg transition-all duration-200`}
                        >
                          {canAfford(cat) ? '💰 Купить' : '❌ Недостаточно монет'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CatShop