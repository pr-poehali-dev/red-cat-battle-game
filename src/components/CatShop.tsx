import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
      description: 'Ваш первый спутник'
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
      image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg',
      description: 'Могучий космический охотник'
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
      image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg',
      description: 'Легендарный защитник галактики'
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
      image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg',
      description: 'Величественный повелитель звёзд'
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

  const isOwned = (catId: string) => {
    return gameStats.ownedCats?.some(ownedCat => ownedCat.id === catId) || false
  }

  const renderCat = (cat: Cat) => (
    <Card key={cat.id} className={`bg-gradient-to-r from-slate-700/90 to-slate-800/90 backdrop-blur-sm border-2 border-${cat.borderColor} rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300`}>
      <CardContent className="p-4 sm:p-6">
        {/* Мобильная версия */}
        <div className="flex flex-col sm:hidden gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-${cat.rarityColor}-400/20 to-${cat.rarityColor}-500/20 p-1`}>
                <img 
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-sm font-bold border-${cat.borderColor} bg-slate-800 text-${cat.rarityColor}-400`}>
                {cat.level}
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-bold text-white">{cat.name}</h3>
              <p className={`text-sm font-semibold text-${cat.rarityColor}-400 mb-2`}>
                {cat.rarity}
              </p>
              <div className="w-32 bg-slate-700/50 rounded-full h-2 mx-auto">
                <div 
                  className={`bg-gradient-to-r from-${cat.rarityColor}-400 to-${cat.rarityColor}-500 h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${(cat.health / cat.maxHealth) * 100}%` }}
                />
              </div>
              <div className="text-sm text-white/60 mt-1">
                {cat.health}/{cat.maxHealth}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-500/15 rounded-lg p-3 text-center border border-red-500/20">
              <Icon name="Heart" size={16} className="text-red-400 mx-auto mb-2" />
              <div className="text-sm text-white font-semibold">{cat.health}/{cat.maxHealth}</div>
              <div className="text-xs text-red-400">Здоровье</div>
            </div>
            
            <div className="bg-orange-500/15 rounded-lg p-3 text-center border border-orange-500/20">
              <Icon name="Sword" size={16} className="text-orange-400 mx-auto mb-2" />
              <div className="text-sm text-white font-semibold">{cat.attack}</div>
              <div className="text-xs text-orange-400">Атака</div>
            </div>
            
            <div className="bg-blue-500/15 rounded-lg p-3 text-center border border-blue-500/20">
              <Icon name="Shield" size={16} className="text-blue-400 mx-auto mb-2" />
              <div className="text-sm text-white font-semibold">{cat.defense}</div>
              <div className="text-xs text-blue-400">Защита</div>
            </div>
            
            <div className="bg-yellow-500/15 rounded-lg p-3 text-center border border-yellow-500/20">
              <Icon name="Zap" size={16} className="text-yellow-400 mx-auto mb-2" />
              <div className="text-sm text-white font-semibold">{cat.speed}</div>
              <div className="text-xs text-yellow-400">Скорость</div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <div className="bg-gray-500/15 rounded-lg p-2 min-w-[50px] text-center border border-gray-500/20">
              <Icon name="Sword" size={14} className="text-gray-400 mx-auto mb-1" />
              <div className="text-xs text-white/40 font-medium">—</div>
            </div>
            <div className="bg-gray-500/15 rounded-lg p-2 min-w-[50px] text-center border border-gray-500/20">
              <Icon name="Shield" size={14} className="text-gray-400 mx-auto mb-1" />
              <div className="text-xs text-white/40 font-medium">—</div>
            </div>
            <div className="bg-gray-500/15 rounded-lg p-2 min-w-[50px] text-center border border-gray-500/20">
              <Icon name="Gem" size={14} className="text-gray-400 mx-auto mb-1" />
              <div className="text-xs text-white/40 font-medium">—</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center">
            {isOwned(cat.id) ? (
              <>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold border border-green-500/50 text-sm px-4 py-2">
                  ✅ КУПЛЕН
                </Badge>
                <div className="text-center bg-green-500/10 rounded-lg p-2 border border-green-500/30 w-full">
                  <div className="text-green-400 font-semibold text-sm">🐱 Доступен для прокачки!</div>
                </div>
              </>
            ) : cat.isFree ? (
              <>
                <Badge className={`bg-gradient-to-r from-${cat.rarityColor}-400 to-${cat.rarityColor}-500 text-white font-bold border border-${cat.rarityColor}-500/50 text-sm px-4 py-2`}>
                  🎁 БЕСПЛАТНО
                </Badge>
                <div className={`text-center bg-${cat.rarityColor}-500/10 rounded-lg p-2 border border-${cat.rarityColor}-500/30 w-full`}>
                  <div className={`text-${cat.rarityColor}-400 font-semibold text-sm`}>✨ {cat.description}</div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="DollarSign" size={16} className="text-yellow-400" />
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
                <div className={`text-center bg-${cat.rarityColor}-500/10 rounded-lg p-2 border border-${cat.rarityColor}-500/30 w-full`}>
                  <div className={`text-${cat.rarityColor}-400 font-semibold text-xs`}>{cat.description}</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Десктопная версия */}
        <div className="hidden sm:flex items-center gap-3 min-h-[140px] overflow-hidden">
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="relative">
              <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-${cat.rarityColor}-400/20 to-${cat.rarityColor}-500/20 p-1`}>
                <img 
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 lg:w-7 lg:h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-sm font-bold border-${cat.borderColor} bg-slate-800 text-${cat.rarityColor}-400`}>
                {cat.level}
              </div>
            </div>
            
            <div className="min-w-0">
              <h3 className="text-base lg:text-lg font-bold text-white">{cat.name}</h3>
              <p className={`text-sm font-semibold text-${cat.rarityColor}-400 mb-2`}>
                {cat.rarity}
              </p>
              <div className="w-28 lg:w-32 bg-slate-700/50 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r from-${cat.rarityColor}-400 to-${cat.rarityColor}-500 h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${(cat.health / cat.maxHealth) * 100}%` }}
                />
              </div>
              <div className="text-sm text-white/60 mt-1">
                {cat.health}/{cat.maxHealth}
              </div>
            </div>
          </div>

          <div className="flex gap-1 flex-shrink-0 overflow-visible">
            <div className="bg-red-500/15 rounded-lg p-1.5 min-w-[38px] text-center border border-red-500/20">
              <Icon name="Heart" size={10} className="text-red-400 mx-auto mb-0.5" />
              <div className="text-xs text-white font-semibold leading-tight">{cat.health}</div>
              <div className="text-xs text-white font-semibold leading-tight">/{cat.maxHealth}</div>
            </div>
            <div className="bg-orange-500/15 rounded-lg p-1.5 min-w-[32px] text-center border border-orange-500/20">
              <Icon name="Sword" size={10} className="text-orange-400 mx-auto mb-0.5" />
              <div className="text-xs text-white font-semibold leading-tight">{cat.attack}</div>
            </div>
            <div className="bg-blue-500/15 rounded-lg p-1.5 min-w-[32px] text-center border border-blue-500/20">
              <Icon name="Shield" size={10} className="text-blue-400 mx-auto mb-0.5" />
              <div className="text-xs text-white font-semibold leading-tight">{cat.defense}</div>
            </div>
            <div className="bg-yellow-500/15 rounded-lg p-1.5 min-w-[32px] text-center border border-yellow-500/20">
              <Icon name="Zap" size={10} className="text-yellow-400 mx-auto mb-0.5" />
              <div className="text-xs text-white font-semibold leading-tight">{cat.speed}</div>
            </div>
          </div>

          <div className="flex gap-1 flex-shrink-0">
            <div className="bg-gray-500/15 rounded-lg p-2 min-w-[30px] text-center border border-gray-500/20">
              <Icon name="Sword" size={10} className="text-gray-400 mx-auto mb-1" />
              <div className="text-xs text-white/40 font-medium">—</div>
            </div>
            <div className="bg-gray-500/15 rounded-lg p-2 min-w-[30px] text-center border border-gray-500/20">
              <Icon name="Shield" size={10} className="text-gray-400 mx-auto mb-1" />
              <div className="text-xs text-white/40 font-medium">—</div>
            </div>
            <div className="bg-gray-500/15 rounded-lg p-2 min-w-[30px] text-center border border-gray-500/20">
              <Icon name="Gem" size={10} className="text-gray-400 mx-auto mb-1" />
              <div className="text-xs text-white/40 font-medium">—</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 ml-auto flex-shrink-0">
            {isOwned(cat.id) ? (
              <>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold border border-green-500/50 text-sm px-3 py-1">
                  ✅ КУПЛЕН
                </Badge>
                <div className="text-center bg-green-500/10 rounded-lg p-1 border border-green-500/30 min-w-[120px]">
                  <div className="text-green-400 font-semibold text-xs">🐱 Прокачивайте!</div>
                </div>
              </>
            ) : cat.isFree ? (
              <>
                <Badge className={`bg-gradient-to-r from-${cat.rarityColor}-400 to-${cat.rarityColor}-500 text-white font-bold border border-${cat.rarityColor}-500/50 text-sm px-3 py-1`}>
                  🎁 БЕСПЛАТНО
                </Badge>
                <div className={`text-center bg-${cat.rarityColor}-500/10 rounded-lg p-1 border border-${cat.rarityColor}-500/30 min-w-[120px]`}>
                  <div className={`text-${cat.rarityColor}-400 font-semibold text-xs`}>✨ Подарок</div>
                  <div className="text-white/70 text-xs">при регистрации!</div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Icon name="DollarSign" size={14} className="text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-400">{cat.cost}</span>
                </div>
                <Button 
                  onClick={() => handlePurchase(cat)}
                  disabled={!canAfford(cat)}
                  size="sm"
                  className={`${canAfford(cat) 
                    ? `bg-gradient-to-r from-${cat.rarityColor}-500 to-${cat.rarityColor}-600 hover:from-${cat.rarityColor}-600 hover:to-${cat.rarityColor}-700` 
                    : 'bg-gray-500/50 cursor-not-allowed'
                  } text-white font-bold px-3 py-1 rounded-lg transition-all duration-200 text-xs min-w-[100px]`}
                >
                  {canAfford(cat) ? '💰 Купить' : '❌ Нет монет'}
                </Button>
                <div className={`text-center bg-${cat.rarityColor}-500/10 rounded-lg p-1 border border-${cat.rarityColor}-500/30 min-w-[120px]`}>
                  <div className={`text-${cat.rarityColor}-400 font-semibold text-xs`}>{cat.description}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white font-cosmic">
          🛍️ Котячий Магазин
        </h2>
        <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-2">
          <Icon name="DollarSign" size={18} className="text-yellow-400" />
          <span className="text-lg font-bold text-yellow-400">{gameStats.coins}</span>
        </div>
      </div>
      
      {/* Все коты */}
      <div className="space-y-4">
        {cats.map(renderCat)}
      </div>
    </div>
  )
}

export default CatShop