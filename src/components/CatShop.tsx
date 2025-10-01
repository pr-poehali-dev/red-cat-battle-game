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
      id: 'robot-cat',
      name: 'Кот робот',
      level: 1,
      rarity: 'Редкий',
      rarityColor: 'blue',
      borderColor: 'blue-500',
      health: 250,
      maxHealth: 250,
      attack: 35,
      defense: 25,
      speed: 30,
      cost: 5500,
      isFree: false,
      image: '/img/f2aba26e-158d-4425-a236-8e9bde734359.jpg',
      description: 'Киберспутник из будущего',
      detailedDescription: 'Продвинутый кот-робот с металлической броней и светящимися глазами. Создан по новейшим технологиям для космических миссий. Его мощные системы делают его в разы сильнее обычных котов!'
    },
    {
      id: 'volcano-cat',
      name: 'Кот Вулкан',
      level: 1,
      rarity: 'Легендарный',
      rarityColor: 'red',
      borderColor: 'red-500',
      health: 500,
      maxHealth: 500,
      attack: 75,
      defense: 50,
      speed: 60,
      cost: 28400,
      isFree: false,
      image: '/img/13f48431-647c-4a9e-b873-9a11a4edc0f4.jpg',
      description: 'Повелитель огня и лавы',
      detailedDescription: 'Легендарный огненный кот, рождённый в недрах космических вулканов. Его шерсть пылает как лава, а глаза горят ярче звёзд. Самый мощный боец во всей галактике - его сила превосходит всех остальных котов!'
    },
    {
      id: 'lightning-cat',
      name: 'Кот молния',
      level: 1,
      rarity: 'Мифический',
      rarityColor: 'purple',
      borderColor: 'purple-500',
      health: 1000,
      maxHealth: 1000,
      attack: 150,
      defense: 100,
      speed: 120,
      cost: 289320,
      isFree: false,
      image: '/img/ddfb6b04-6eaa-40fb-bc99-d8c65369c188.jpg',
      description: 'Повелитель грозы и молний',
      detailedDescription: 'Мифический электрический кот, владеющий силой космических гроз. Его броня пронизана молниями, а скорость превосходит саму электрическую энергию. Абсолютный владыка бури - сильнейший из всех существующих котов!'
    },
    {
      id: 'metal-cat',
      name: 'Кот Металл',
      level: 1,
      rarity: 'Эпический',
      rarityColor: 'slate',
      borderColor: 'slate-500',
      health: 2000,
      maxHealth: 2000,
      attack: 300,
      defense: 200,
      speed: 240,
      cost: 970900,
      isFree: false,
      image: '/img/ff564f1e-cbfe-4cd1-930d-f1147b9270d5.jpg',
      description: 'Непробиваемый металлический воин',
      detailedDescription: 'Эпический кибернетический кот, закованный в сверхпрочную металлическую броню. Его тело состоит из редких космических сплавов, а глаза светятся красным огнём. Неуязвимый защитник с мощнейшими стальными когтями - настоящая машина для разрушения врагов!'
    },
    {
      id: 'water-cat',
      name: 'Кот Водяной',
      level: 1,
      rarity: 'Божественный',
      rarityColor: 'cyan',
      borderColor: 'cyan-500',
      health: 3500,
      maxHealth: 3500,
      attack: 500,
      defense: 350,
      speed: 400,
      cost: 992875,
      isFree: false,
      image: '/img/c58f1707-e8a4-4245-8490-c44a714dce03.jpg',
      description: 'Повелитель океанов и водных стихий',
      detailedDescription: 'Божественный водяной кот, сотканный из чистейших космических океанов. Его тело состоит из живой воды, способной принимать любые формы. Владеет силой всех морей галактики - непревзойдённый мастер водной магии с невероятной мощью!'
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