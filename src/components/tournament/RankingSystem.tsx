import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import type { Cat } from '@/types/game'

export interface PlayerRank {
  name: string
  level: number
  minPoints: number
  maxPoints: number
  color: string
  emoji: string
  benefits: string[]
}

export interface PlayerStats {
  totalTournaments: number
  tournamentsWon: number
  totalFights: number
  fightsWon: number
  totalCoinsEarned: number
  currentRankPoints: number
  bestCat: string
  longestWinStreak: number
  currentWinStreak: number
}

export interface LeaderboardEntry {
  playerName: string
  rankPoints: number
  tournamentsWon: number
  winRate: number
  rank: PlayerRank
  avatar: string
}

export const ranks: PlayerRank[] = [
  {
    name: "Космический Новичок",
    level: 1,
    minPoints: 0,
    maxPoints: 99,
    color: "from-gray-400 to-gray-600",
    emoji: "🐾",
    benefits: ["Доступ к базовым турнирам"]
  },
  {
    name: "Звёздный Боец",
    level: 2,
    minPoints: 100,
    maxPoints: 299,
    color: "from-blue-400 to-blue-600",
    emoji: "⭐",
    benefits: ["Бонус +5% к наградам", "Доступ к продвинутым турнирам"]
  },
  {
    name: "Галактический Воин",
    level: 3,
    minPoints: 300,
    maxPoints: 599,
    color: "from-purple-400 to-purple-600",
    emoji: "🌌",
    benefits: ["Бонус +10% к наградам", "Эксклюзивные турниры", "Особые коты"]
  },
  {
    name: "Космический Чемпион",
    level: 4,
    minPoints: 600,
    maxPoints: 999,
    color: "from-yellow-400 to-orange-500",
    emoji: "👑",
    benefits: ["Бонус +15% к наградам", "Турниры чемпионов", "Уникальные награды"]
  },
  {
    name: "Повелитель Вселенной",
    level: 5,
    minPoints: 1000,
    maxPoints: 9999,
    color: "from-pink-500 to-red-600",
    emoji: "💎",
    benefits: ["Бонус +25% к наградам", "Божественные турниры", "Легендарные коты", "Титул в лидербордах"]
  }
]

// Мок данные для лидерборда
const mockLeaderboard: LeaderboardEntry[] = [
  { playerName: "КосмоКот2024", rankPoints: 1250, tournamentsWon: 45, winRate: 89, rank: ranks[4], avatar: "🚀" },
  { playerName: "ЗвёздныйВоин", rankPoints: 980, tournamentsWon: 38, winRate: 85, rank: ranks[3], avatar: "⚔️" },
  { playerName: "ГалактическийЛорд", rankPoints: 875, tournamentsWon: 32, winRate: 82, rank: ranks[3], avatar: "🌟" },
  { playerName: "КвантовыйБоец", rankPoints: 720, tournamentsWon: 29, winRate: 78, rank: ranks[3], avatar: "⚡" },
  { playerName: "НейтронныйНиндзя", rankPoints: 650, tournamentsWon: 25, winRate: 75, rank: ranks[3], avatar: "🥷" },
  { playerName: "ПлазменныйПилот", rankPoints: 580, tournamentsWon: 22, winRate: 73, rank: ranks[2], avatar: "🛸" },
  { playerName: "АстероидныйАс", rankPoints: 420, tournamentsWon: 18, winRate: 70, rank: ranks[2], avatar: "☄️" },
  { playerName: "КометныйКапитан", rankPoints: 350, tournamentsWon: 15, winRate: 68, rank: ranks[2], avatar: "🌠" },
  { playerName: "СолнечныйСтратег", rankPoints: 250, tournamentsWon: 12, winRate: 65, rank: ranks[1], avatar: "☀️" },
  { playerName: "ЛунныйЛегионер", rankPoints: 180, tournamentsWon: 8, winRate: 60, rank: ranks[1], avatar: "🌙" }
]

interface RankingSystemProps {
  playerStats: PlayerStats
  playerName: string
  onBack: () => void
}

export function getCurrentRank(points: number): PlayerRank {
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (points >= ranks[i].minPoints) {
      return ranks[i]
    }
  }
  return ranks[0]
}

export function getNextRank(currentRank: PlayerRank): PlayerRank | null {
  const currentIndex = ranks.findIndex(r => r.level === currentRank.level)
  return currentIndex < ranks.length - 1 ? ranks[currentIndex + 1] : null
}

export function calculateRankProgress(points: number, rank: PlayerRank): number {
  if (rank.level === ranks.length) return 100
  const progress = ((points - rank.minPoints) / (rank.maxPoints - rank.minPoints)) * 100
  return Math.min(100, Math.max(0, progress))
}

export default function RankingSystem({ playerStats, playerName, onBack }: RankingSystemProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'leaderboard' | 'ranks'>('profile')
  
  const currentRank = getCurrentRank(playerStats.currentRankPoints)
  const nextRank = getNextRank(currentRank)
  const progress = calculateRankProgress(playerStats.currentRankPoints, currentRank)

  // Добавляем игрока в лидерборд
  const playerEntry: LeaderboardEntry = {
    playerName: playerName || "Ты",
    rankPoints: playerStats.currentRankPoints,
    tournamentsWon: playerStats.tournamentsWon,
    winRate: playerStats.totalFights > 0 ? Math.round((playerStats.fightsWon / playerStats.totalFights) * 100) : 0,
    rank: currentRank,
    avatar: "😺"
  }

  const fullLeaderboard = [...mockLeaderboard, playerEntry]
    .sort((a, b) => b.rankPoints - a.rankPoints)
    .map((entry, index) => ({ ...entry, position: index + 1 }))

  const playerPosition = fullLeaderboard.findIndex(entry => entry.playerName === playerEntry.playerName) + 1

  if (activeTab === 'profile') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">Профиль бойца</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button
            onClick={() => setActiveTab('profile')}
            className={activeTab === 'profile' ? 'bg-blue-600' : ''}
          >
            <Icon name="User" size={16} />
            Профиль
          </Button>
          <Button
            onClick={() => setActiveTab('leaderboard')}
            className={activeTab === 'leaderboard' ? 'bg-blue-600' : ''}
          >
            <Icon name="Trophy" size={16} />
            Лидерборд
          </Button>
          <Button
            onClick={() => setActiveTab('ranks')}
            className={activeTab === 'ranks' ? 'bg-blue-600' : ''}
          >
            <Icon name="Award" size={16} />
            Ранги
          </Button>
        </div>

        {/* Текущий ранг */}
        <Card className={`bg-gradient-to-r ${currentRank.color} text-white`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-3xl">{currentRank.emoji}</span>
              <div>
                <div className="text-xl">{currentRank.name}</div>
                <div className="text-sm opacity-90">Ранг {currentRank.level}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Прогресс до следующего ранга</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="bg-white/20" />
                <div className="flex justify-between text-xs mt-1 opacity-75">
                  <span>{playerStats.currentRankPoints} очков</span>
                  <span>{nextRank ? `${nextRank.maxPoints} для ${nextRank.name}` : 'Максимальный ранг'}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{playerPosition}</div>
                  <div className="text-sm opacity-90">Место в рейтинге</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{playerStats.currentRankPoints}</div>
                  <div className="text-sm opacity-90">Очков ранга</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Привилегии ранга:</h4>
                <ul className="space-y-1 text-sm">
                  {currentRank.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Icon name="Check" size={14} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="text-center pt-6">
              <div className="text-2xl font-bold text-blue-600">{playerStats.tournamentsWon}</div>
              <div className="text-sm text-gray-600">Побед в турнирах</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center pt-6">
              <div className="text-2xl font-bold text-green-600">
                {playerStats.totalFights > 0 ? Math.round((playerStats.fightsWon / playerStats.totalFights) * 100) : 0}%
              </div>
              <div className="text-sm text-gray-600">Винрейт</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center pt-6">
              <div className="text-2xl font-bold text-yellow-600">{playerStats.totalCoinsEarned}</div>
              <div className="text-sm text-gray-600">Монет заработано</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center pt-6">
              <div className="text-2xl font-bold text-purple-600">{playerStats.longestWinStreak}</div>
              <div className="text-sm text-gray-600">Лучшая серия</div>
            </CardContent>
          </Card>
        </div>

        {/* Достижения */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Medal" size={20} />
              Достижения
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border-2 ${playerStats.tournamentsWon >= 1 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="font-semibold">Первая победа</div>
                    <div className="text-sm text-gray-600">Выиграй свой первый турнир</div>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border-2 ${playerStats.tournamentsWon >= 10 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">👑</div>
                  <div>
                    <div className="font-semibold">Чемпион</div>
                    <div className="text-sm text-gray-600">Выиграй 10 турниров ({playerStats.tournamentsWon}/10)</div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${playerStats.longestWinStreak >= 5 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🔥</div>
                  <div>
                    <div className="font-semibold">Горячая серия</div>
                    <div className="text-sm text-gray-600">Серия из 5 побед ({playerStats.longestWinStreak}/5)</div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${playerStats.totalCoinsEarned >= 10000 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">💰</div>
                  <div>
                    <div className="font-semibold">Миллионер</div>
                    <div className="text-sm text-gray-600">Заработай 10,000 монет ({playerStats.totalCoinsEarned}/10000)</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (activeTab === 'leaderboard') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">🏆 Лидерборд</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button
            onClick={() => setActiveTab('profile')}
            className={activeTab === 'profile' ? 'bg-blue-600' : ''}
          >
            <Icon name="User" size={16} />
            Профиль
          </Button>
          <Button
            onClick={() => setActiveTab('leaderboard')}
            className={activeTab === 'leaderboard' ? 'bg-blue-600' : ''}
          >
            <Icon name="Trophy" size={16} />
            Лидерборд
          </Button>
          <Button
            onClick={() => setActiveTab('ranks')}
            className={activeTab === 'ranks' ? 'bg-blue-600' : ''}
          >
            <Icon name="Award" size={16} />
            Ранги
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Топ игроки галактики</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fullLeaderboard.slice(0, 20).map((entry, index) => {
                const isPlayer = entry.playerName === playerEntry.playerName
                return (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isPlayer ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-gray-200'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="text-2xl">{entry.avatar}</div>
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {entry.playerName}
                          {isPlayer && <span className="text-blue-600 text-sm">(Ты)</span>}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-4">
                          <span className={`bg-gradient-to-r ${entry.rank.color} bg-clip-text text-transparent font-semibold`}>
                            {entry.rank.emoji} {entry.rank.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{entry.rankPoints} очков</div>
                      <div className="text-sm text-gray-600">{entry.tournamentsWon} побед • {entry.winRate}% винрейт</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (activeTab === 'ranks') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} />
            Назад
          </Button>
          <h1 className="text-2xl font-bold">Система рангов</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button
            onClick={() => setActiveTab('profile')}
            className={activeTab === 'profile' ? 'bg-blue-600' : ''}
          >
            <Icon name="User" size={16} />
            Профиль
          </Button>
          <Button
            onClick={() => setActiveTab('leaderboard')}
            className={activeTab === 'leaderboard' ? 'bg-blue-600' : ''}
          >
            <Icon name="Trophy" size={16} />
            Лидерборд
          </Button>
          <Button
            onClick={() => setActiveTab('ranks')}
            className={activeTab === 'ranks' ? 'bg-blue-600' : ''}
          >
            <Icon name="Award" size={16} />
            Ранги
          </Button>
        </div>

        <div className="space-y-4">
          {ranks.map((rank, index) => {
            const isCurrentRank = rank.level === currentRank.level
            return (
              <Card 
                key={rank.level} 
                className={`${isCurrentRank ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}
              >
                <CardContent className="pt-6">
                  <div className={`bg-gradient-to-r ${rank.color} text-white p-4 rounded-lg mb-4`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{rank.emoji}</span>
                        <div>
                          <div className="text-xl font-bold">{rank.name}</div>
                          <div className="text-sm opacity-90">Ранг {rank.level}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{rank.minPoints}+ очков</div>
                        {isCurrentRank && <div className="text-sm opacity-90">Твой текущий ранг</div>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Привилегии ранга:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {rank.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2">
                          <Icon name="Check" size={14} className="text-green-600" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }
}