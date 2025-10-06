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
  expirationDate?: Date
  isPremiumMiner?: boolean
  premiumMiningEnergyCost?: number
  premiumMiningRechargeHours?: number
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
      image: '/img/fa782b11-875d-421e-9999-f7b7abe5bb07.jpg',
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
    },
    {
      id: 'cosmic-guardian',
      name: 'Космический Страж',
      level: 1,
      rarity: 'Титанический',
      rarityColor: 'violet',
      borderColor: 'violet-500',
      health: 8000,
      maxHealth: 8000,
      attack: 1200,
      defense: 800,
      speed: 950,
      cost: 1098149,
      isFree: false,
      image: 'https://cdn.poehali.dev/files/ae6f6ac1-ff18-48d0-b10f-891f56787a1e.jpg',
      description: 'Абсолютный защитник галактики',
      detailedDescription: 'Титанический воин из глубин космоса, облачённый в легендарную фиолетовую броню с кристаллами бесконечной энергии. Его сила превосходит всех известных существ во вселенной. Владеет древними космическими технологиями и магией звёзд. Непобедимый страж, чья мощь способна уничтожить целые планеты!'
    },
    {
      id: 'dragon-cat',
      name: 'Кот Дракон',
      level: 1,
      rarity: 'Драконический',
      rarityColor: 'rose',
      borderColor: 'rose-500',
      health: 12000,
      maxHealth: 12000,
      attack: 1800,
      defense: 1200,
      speed: 1400,
      cost: 1198209,
      isFree: false,
      image: '/img/81ddf2e3-ddbf-4716-bbc5-9fb39883ecd8.jpg',
      description: 'Повелитель драконов и огненной бури',
      detailedDescription: 'Драконический воин невероятной силы, рождённый от союза космического дракона и древнего кота-титана. Его чешуя непробиваема, крылья создают ураганы, а огненное дыхание испепеляет врагов. Самый могущественный боец во всей вселенной - его сила превосходит всех известных существ! Владеет драконьей магией и древними боевыми искусствами.'
    },
    {
      id: 'wind-cat',
      name: 'Кот Ветер',
      level: 1,
      rarity: 'Ветряной',
      rarityColor: 'sky',
      borderColor: 'sky-500',
      health: 15000,
      maxHealth: 15000,
      attack: 2500,
      defense: 1800,
      speed: 2200,
      cost: 2129752,
      isFree: false,
      image: '/img/be286536-1877-4f86-97d0-99d0f2505c42.jpg',
      description: 'Повелитель ветров и небесных стихий',
      detailedDescription: 'Легендарный кот-ветер, воплощение силы всех ураганов вселенной. Его тело состоит из чистого ветра и энергии бури, способное принимать любую форму. Серебристая шерсть развевается как вихри, а глаза излучают молнии. Самый быстрый и мощный боец - сильнее всех существующих котов! Владеет древней магией ветра и может призывать торнадо невероятной силы.'
    },
    {
      id: 'autumn-cat',
      name: 'Кот Осень',
      level: 1,
      rarity: 'Осенний',
      rarityColor: 'amber',
      borderColor: 'amber-500',
      health: 18000,
      maxHealth: 18000,
      attack: 3200,
      defense: 2400,
      speed: 2800,
      cost: 1845920,
      isFree: false,
      image: '/img/86baff1c-a4b7-4abb-95a0-472d446b2798.jpg',
      description: '🍂 Осенний воин - доступен до 1 декабря 2025',
      detailedDescription: '🍂 ЭКСКЛЮЗИВНЫЙ ОСЕННИЙ ВОИН! Могущественный кот, рождённый из магии осени и космических листопадов. Его шерсть переливается золотыми, красными и оранжевыми оттенками осенних листьев. Владеет древней магией урожая и силой осенних бурь. ⚠️ ВНИМАНИЕ: Доступен только до 1 декабря 2025 00:00 (UTC+5)! После этой даты превратится в обычного Котёнка Мурку.',
      expirationDate: new Date('2025-12-01T00:00:00+05:00')
    },
    {
      id: 'hurricane-cat',
      name: 'Кот Ураган',
      level: 1,
      rarity: 'Премиум Майнер',
      rarityColor: 'purple',
      borderColor: 'purple-500',
      health: 25000,
      maxHealth: 25000,
      attack: 4000,
      defense: 3000,
      speed: 3500,
      cost: 2457397,
      isFree: false,
      image: '/img/d64a99e1-8e53-48a8-a448-d6f4ad8626da.jpg',
      description: 'Добытчик премиум монет - за 10 000 энергии',
      detailedDescription: 'ПРЕМИУМ МАЙНЕР! Легендарный кот бури, рождённый из энергии космических ураганов. Обладает уникальной способностью добывать премиум монеты! Серебристая шерсть излучает электрическую энергию, а глаза сияют силой торнадо. ⚡ ОСОБЕННОСТЬ: Потратьте 10 000 энергии, чтобы получить премиум монету! Восстановление энергии: 6 часов вместо 3. Самый ценный кот для добычи редкого ресурса!',
      isPremiumMiner: true,
      premiumMiningEnergyCost: 10000,
      premiumMiningRechargeHours: 6
    },
    {
      id: 'demon-cat',
      name: 'Кот Демон',
      level: 1,
      rarity: 'Демонический Майнер',
      rarityColor: 'red',
      borderColor: 'red-600',
      health: 35000,
      maxHealth: 35000,
      attack: 5500,
      defense: 4000,
      speed: 4500,
      cost: 2941830,
      isFree: false,
      image: '/img/13f48431-647c-4a9e-b873-9a11a4edc0f4.jpg',
      description: 'Элитный добытчик премиум монет - за 20 000 энергии',
      detailedDescription: 'ДЕМОНИЧЕСКИЙ МАЙНЕР! Могущественный демонический кот из тёмных глубин космоса, окутанный пламенем и тенью. Его чёрная шерсть пылает адским огнём, а глаза горят как угли преисподней. Обладает высшей способностью добывать премиум монеты! 😈 ОСОБЕННОСТЬ: Потратьте 20 000 энергии, чтобы получить премиум монету! Восстановление энергии: 8 часов. Элитный майнер для самых терпеливых игроков!',
      isPremiumMiner: true,
      premiumMiningEnergyCost: 20000,
      premiumMiningRechargeHours: 8
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
                    {cat.isPremiumMiner && (
                      <img 
                        src="/img/448a4b3f-b7da-4ef7-a5b5-ba81e92ce674.jpg" 
                        alt="Premium Coin"
                        className="w-4 h-4 rounded-full inline-block mr-1 shadow-lg shadow-purple-500/50"
                      />
                    )}
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