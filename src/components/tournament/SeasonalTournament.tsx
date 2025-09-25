import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import type { Cat } from '@/types/game'

interface SeasonalReward {
  id: string
  name: string
  type: 'cat' | 'coins' | 'item' | 'title'
  value: any
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  description: string
}

interface SeasonalTournament {
  id: string
  name: string
  description: string
  theme: string
  startDate: Date
  endDate: Date
  isActive: boolean
  entry_fee: number
  rewards: SeasonalReward[]
  participants: number
  maxParticipants: number
  difficulty: 'easy' | 'medium' | 'hard' | 'nightmare'
  specialRules?: string[]
}

interface SeasonalTournamentProps {
  ownedCats: Cat[]
  playerCoins: number
  onTournamentWin: (reward: number) => void
  onRewardEarned: (reward: SeasonalReward) => void
}

const SEASONAL_TOURNAMENTS: SeasonalTournament[] = [
  {
    id: 'winter_cosmic',
    name: '❄️ Зимний Космос',
    description: 'Сражайся в ледяных просторах космоса!',
    theme: 'winter',
    startDate: new Date('2024-12-01'),
    endDate: new Date('2024-12-31'),
    isActive: true,
    entry_fee: 500,
    participants: 1247,
    maxParticipants: 5000,
    difficulty: 'hard',
    specialRules: ['Урон льдом увеличен на 50%', 'Каждый 3-й ход - заморозка'],
    rewards: [
      {
        id: 'ice_cat',
        name: '🧊 Ледяной Кот',
        type: 'cat',
        value: {
          id: 'ice_cosmic_cat',
          name: 'Ледяной Космокот',
          power: 85,
          rarity: 'legendary',
          image: '🧊',
          specialAbility: 'Ледяной удар'
        },
        rarity: 'legendary',
        description: 'Легендарный кот с силой вечного льда'
      },
      {
        id: 'winter_coins',
        name: '❄️ Зимние Монеты',
        type: 'coins',
        value: 5000,
        rarity: 'epic',
        description: '5000 эксклюзивных зимних монет'
      },
      {
        id: 'ice_crown',
        name: '👑 Ледяная Корона',
        type: 'item',
        value: { name: 'Ледяная Корона', power: +15 },
        rarity: 'epic',
        description: 'Увеличивает силу всех котов на 15%'
      }
    ]
  },
  {
    id: 'spring_bloom',
    name: '🌸 Космическое Цветение',
    description: 'Весенний турнир среди цветущих планет!',
    theme: 'spring',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    isActive: false,
    entry_fee: 300,
    participants: 2156,
    maxParticipants: 3000,
    difficulty: 'medium',
    specialRules: ['Регенерация +20% каждый ход', 'Цветочная магия активна'],
    rewards: [
      {
        id: 'bloom_cat',
        name: '🌸 Цветочный Кот',
        type: 'cat',
        value: {
          id: 'bloom_cosmic_cat',
          name: 'Цветочный Космокот',
          power: 75,
          rarity: 'epic',
          image: '🌸',
          specialAbility: 'Цветочное исцеление'
        },
        rarity: 'epic',
        description: 'Эпический кот с силой весеннего цветения'
      }
    ]
  },
  {
    id: 'summer_solar',
    name: '☀️ Солнечный Шторм',
    description: 'Сражения под палящими солнечными лучами!',
    theme: 'summer',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-31'),
    isActive: true,
    entry_fee: 750,
    participants: 892,
    maxParticipants: 2500,
    difficulty: 'nightmare',
    specialRules: ['Солнечный урон x2', 'Огненные атаки критичны'],
    rewards: [
      {
        id: 'solar_cat',
        name: '☀️ Солнечный Кот',
        type: 'cat',
        value: {
          id: 'solar_cosmic_cat',
          name: 'Солнечный Космокот',
          power: 95,
          rarity: 'legendary',
          image: '☀️',
          specialAbility: 'Солнечная вспышка'
        },
        rarity: 'legendary',
        description: 'Легендарный кот с мощью звезды'
      },
      {
        id: 'solar_title',
        name: '🔥 Повелитель Солнца',
        type: 'title',
        value: 'Повелитель Солнца',
        rarity: 'legendary',
        description: 'Эксклюзивный титул чемпиона'
      }
    ]
  }
]

const RARITY_COLORS = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600', 
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-yellow-600'
}

export default function SeasonalTournament({ ownedCats, playerCoins, onTournamentWin, onRewardEarned }: SeasonalTournamentProps) {
  const [selectedTournament, setSelectedTournament] = useState<SeasonalTournament | null>(null)
  const [isParticipating, setIsParticipating] = useState(false)
  const [tournamentProgress, setTournamentProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState<string>('')

  useEffect(() => {
    const timer = setInterval(() => {
      SEASONAL_TOURNAMENTS.forEach(tournament => {
        if (tournament.isActive) {
          const now = new Date().getTime()
          const end = tournament.endDate.getTime()
          const distance = end - now
          
          if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            
            setTimeLeft(`${days}д ${hours}ч ${minutes}м`)
          } else {
            setTimeLeft('Завершён')
          }
        }
      })
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const handleJoinTournament = (tournament: SeasonalTournament) => {
    if (playerCoins >= tournament.entry_fee && !isParticipating) {
      setSelectedTournament(tournament)
      setIsParticipating(true)
      setTournamentProgress(0)
      onTournamentWin(-tournament.entry_fee) // Списываем взнос
      
      // Симулируем участие в турнире
      const progressTimer = setInterval(() => {
        setTournamentProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer)
            // Определяем награды
            const winChance = Math.random()
            let earnedRewards: SeasonalReward[] = []
            
            if (winChance > 0.3) { // 70% шанс на награду
              if (winChance > 0.85) { // 15% шанс на лучшую награду
                earnedRewards = tournament.rewards.filter(r => r.rarity === 'legendary')
              } else if (winChance > 0.6) { // 25% шанс на эпическую
                earnedRewards = tournament.rewards.filter(r => r.rarity === 'epic')
              } else { // 30% на обычную
                earnedRewards = tournament.rewards.filter(r => r.rarity === 'rare' || r.rarity === 'common')
              }
              
              earnedRewards.forEach(reward => {
                onRewardEarned(reward)
                if (reward.type === 'coins') {
                  onTournamentWin(reward.value)
                }
              })
            }
            
            setIsParticipating(false)
            setSelectedTournament(null)
            return 100
          }
          return prev + Math.random() * 15 + 5
        })
      }, 800)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'  
      case 'hard': return 'bg-red-500'
      case 'nightmare': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Лёгкий'
      case 'medium': return 'Средний'
      case 'hard': return 'Сложный'  
      case 'nightmare': return 'Кошмар'
      default: return 'Неизвестно'
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
          🌟 Сезонные Турниры
        </h2>
        <p className="text-gray-300">Эксклюзивные события с уникальными наградами!</p>
      </div>

      {/* Участие в турнире */}
      {isParticipating && selectedTournament && (
        <Card className="border-2 border-purple-500 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
          <CardHeader>
            <CardTitle className="text-center">
              Участие в турнире: {selectedTournament.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <Icon name="Sword" className="w-16 h-16 mx-auto animate-pulse text-purple-400" />
                <p className="text-lg font-semibold mt-2">Сражения идут полным ходом!</p>
              </div>
              <Progress value={tournamentProgress} className="h-3" />
              <p className="text-center text-sm text-gray-400">
                Прогресс турнира: {Math.round(tournamentProgress)}%
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Список турниров */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SEASONAL_TOURNAMENTS.map((tournament) => (
          <Card 
            key={tournament.id} 
            className={`relative overflow-hidden ${tournament.isActive 
              ? 'border-2 border-yellow-500 shadow-lg shadow-yellow-500/20' 
              : 'border-gray-600 opacity-75'
            }`}
          >
            {tournament.isActive && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-500 text-white animate-pulse">
                  <Icon name="Clock" size={12} className="mr-1" />
                  {timeLeft}
                </Badge>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-xl">{tournament.name}</CardTitle>
              <p className="text-sm text-gray-300">{tournament.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Статистика турнира */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Участники</p>
                  <p className="font-semibold">{tournament.participants.toLocaleString()}/{tournament.maxParticipants.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Взнос</p>
                  <p className="font-semibold text-yellow-400">
                    <Icon name="Coins" size={16} className="inline mr-1" />
                    {tournament.entry_fee}
                  </p>
                </div>
              </div>

              {/* Сложность */}
              <div className="flex items-center gap-2">
                <Badge className={`${getDifficultyColor(tournament.difficulty)} text-white`}>
                  {getDifficultyText(tournament.difficulty)}
                </Badge>
                <Progress 
                  value={(tournament.participants / tournament.maxParticipants) * 100} 
                  className="flex-1 h-2"
                />
              </div>

              {/* Особые правила */}
              {tournament.specialRules && tournament.specialRules.length > 0 && (
                <div className="bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-blue-300 mb-1">Особые правила:</p>
                  {tournament.specialRules.map((rule, index) => (
                    <p key={index} className="text-xs text-blue-200">• {rule}</p>
                  ))}
                </div>
              )}

              {/* Награды */}
              <div>
                <p className="text-sm font-semibold mb-2 text-purple-300">
                  <Icon name="Gift" size={16} className="inline mr-1" />
                  Награды:
                </p>
                <div className="space-y-2">
                  {tournament.rewards.slice(0, 2).map((reward) => (
                    <div 
                      key={reward.id}
                      className={`p-2 rounded-lg bg-gradient-to-r ${RARITY_COLORS[reward.rarity]} bg-opacity-20`}
                    >
                      <p className="text-sm font-semibold">{reward.name}</p>
                      <p className="text-xs text-gray-300">{reward.description}</p>
                    </div>
                  ))}
                  {tournament.rewards.length > 2 && (
                    <p className="text-xs text-gray-400">
                      И ещё {tournament.rewards.length - 2} наград...
                    </p>
                  )}
                </div>
              </div>

              {/* Кнопка участия */}
              <Button
                onClick={() => handleJoinTournament(tournament)}
                disabled={!tournament.isActive || isParticipating || playerCoins < tournament.entry_fee}
                className={`w-full ${tournament.isActive && !isParticipating && playerCoins >= tournament.entry_fee
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  : 'bg-gray-600'
                }`}
              >
                {!tournament.isActive ? (
                  <>
                    <Icon name="Clock" size={16} className="mr-2" />
                    Турнир завершён
                  </>
                ) : isParticipating ? (
                  <>
                    <Icon name="Sword" size={16} className="mr-2" />
                    Участвую в турнире
                  </>
                ) : playerCoins < tournament.entry_fee ? (
                  <>
                    <Icon name="X" size={16} className="mr-2" />
                    Недостаточно монет
                  </>
                ) : (
                  <>
                    <Icon name="Zap" size={16} className="mr-2" />
                    Участвовать ({tournament.entry_fee} монет)
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Информационная панель */}
      <Card className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Icon name="Info" className="w-8 h-8 text-blue-400 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-blue-300 mb-2">О сезонных турнирах</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• <strong>Ограниченное время:</strong> Каждый сезонный турнир доступен только определённый период</p>
                <p>• <strong>Уникальные награды:</strong> Эксклюзивные коты, предметы и титулы недоступны в обычных турнирах</p>
                <p>• <strong>Особые правила:</strong> Каждый турнир имеет уникальную механику сражений</p>
                <p>• <strong>Ограниченные места:</strong> Количество участников может быть ограничено</p>
                <p>• <strong>Высокие ставки:</strong> Больший взнос = лучшие награды</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}