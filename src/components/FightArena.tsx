import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Icon from '@/components/ui/icon'

interface FightArenaProps {
  onNavigateToTournament: () => void
  tournamentStats: {
    wins: number
    losses: number
    rating: number
  }
}

const FightArena: React.FC<FightArenaProps> = ({ onNavigateToTournament, tournamentStats }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-white mb-2">🏆 Турниры</h1>
        <p className="text-gray-300">Выбирайте турниры, сражайтесь и становитесь чемпионом!</p>
      </div>

      {/* Список турниров */}
      <div className="space-y-4">
        <Card 
          onClick={onNavigateToTournament}
          className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border-2 border-yellow-500/50 shadow-xl hover:shadow-yellow-500/50 transition-all cursor-pointer hover:scale-105"
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🏅</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">Турнир Новичков</h3>
                <p className="text-gray-300 text-sm">Лёгкий • 3 боя • Награда: 500 монет</p>
              </div>
              <Icon name="ChevronRight" size={24} className="text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={onNavigateToTournament}
          className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border-2 border-blue-500/50 shadow-xl hover:shadow-blue-500/50 transition-all cursor-pointer hover:scale-105"
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">⚔️</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">Турнир Воинов</h3>
                <p className="text-gray-300 text-sm">Средний • 5 боёв • Награда: 2,000 монет</p>
              </div>
              <Icon name="ChevronRight" size={24} className="text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={onNavigateToTournament}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-purple-500/50 shadow-xl hover:shadow-purple-500/50 transition-all cursor-pointer hover:scale-105"
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">👑</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">Турнир Чемпионов</h3>
                <p className="text-gray-300 text-sm">Сложный • 7 боёв • Награда: 10,000 монет</p>
              </div>
              <Icon name="ChevronRight" size={24} className="text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card 
          onClick={onNavigateToTournament}
          className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-xl border-2 border-red-500/50 shadow-xl hover:shadow-red-500/50 transition-all cursor-pointer hover:scale-105 opacity-90"
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🔥</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">Легендарный Турнир</h3>
                <p className="text-gray-300 text-sm">Легендарный • 10 боёв • Награда: 50,000 монет</p>
              </div>
              <Icon name="ChevronRight" size={24} className="text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-space-dark/80 backdrop-blur-xl border border-cosmic-purple/50 shadow-xl shadow-cosmic-purple/30">
        <CardContent className="p-4">
          <h3 className="font-bold mb-4 text-white flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-cosmic-cyan" />
            Ваша статистика
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">🏆 Побед:</span>
              <span className="font-bold text-green-400">{tournamentStats.wins}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">💀 Поражений:</span>
              <span className="font-bold text-red-400">{tournamentStats.losses}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">⭐ Рейтинг:</span>
              <span className="font-bold text-yellow-400">{tournamentStats.rating}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-300">📊 Процент побед:</span>
                <span className="font-bold text-cosmic-cyan">
                  {tournamentStats.wins + tournamentStats.losses > 0
                    ? Math.round((tournamentStats.wins / (tournamentStats.wins + tournamentStats.losses)) * 100)
                    : 0}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FightArena