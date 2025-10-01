import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import { GameStats } from '@/types/game'
import { useAuth } from '@/hooks/useAuth'

interface UserProfileProps {
  gameStats: GameStats
}

const UserProfile: React.FC<UserProfileProps> = ({ gameStats }) => {
  const { user } = useAuth()
  
  const totalCats = gameStats.ownedCats?.length || 0
  const totalBattles = Math.floor(gameStats.experience / 10)
  const winRate = 85
  
  const experiencePercentage = (gameStats.experience / gameStats.maxExperience) * 100
  
  const achievements = [
    { icon: 'Trophy', title: 'Первая победа', unlocked: gameStats.level >= 1 },
    { icon: 'Star', title: 'Уровень 5', unlocked: gameStats.level >= 5 },
    { icon: 'Zap', title: 'Мощь 100+', unlocked: gameStats.power >= 100 },
    { icon: 'Coins', title: 'Богач', unlocked: gameStats.coins >= 1000 },
    { icon: 'Heart', title: 'Коллекционер', unlocked: totalCats >= 3 },
    { icon: 'Sword', title: '50 боёв', unlocked: totalBattles >= 50 }
  ]
  
  const unlockedAchievements = achievements.filter(a => a.unlocked).length
  
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Шапка профиля */}
      <Card className="bg-gradient-to-br from-cosmic-purple/20 to-cosmic-pink/20 backdrop-blur-xl border-2 border-cosmic-cyan shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cosmic-cyan to-cosmic-pink flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                {user?.username?.charAt(0).toUpperCase() || '?'}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-star-glow text-space-darker px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                LVL {gameStats.level}
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-black text-white mb-1">{user?.username || 'Игрок'}</h2>
              <p className="text-cosmic-cyan text-sm mb-3">Легенда Cat Kombat</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/80">
                  <span>Опыт до {gameStats.level + 1} уровня</span>
                  <span className="font-bold">{gameStats.experience}/{gameStats.maxExperience}</span>
                </div>
                <Progress value={experiencePercentage} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <Card className="bg-space-dark/80 backdrop-blur-xl border-2 border-cosmic-purple">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="BarChart3" size={24} className="text-cosmic-cyan" />
            Статистика
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-cosmic-purple/20 rounded-lg p-4 text-center border border-cosmic-purple/30">
              <Icon name="Coins" size={32} className="text-star-glow mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{gameStats.coins}</div>
              <div className="text-xs text-white/60">Монеты</div>
            </div>
            
            <div className="bg-cosmic-cyan/20 rounded-lg p-4 text-center border border-cosmic-cyan/30">
              <Icon name="Zap" size={32} className="text-cosmic-cyan mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{gameStats.power}</div>
              <div className="text-xs text-white/60">Мощь</div>
            </div>
            
            <div className="bg-cosmic-pink/20 rounded-lg p-4 text-center border border-cosmic-pink/30">
              <Icon name="Swords" size={32} className="text-cosmic-pink mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{totalBattles}</div>
              <div className="text-xs text-white/60">Боёв</div>
            </div>
            
            <div className="bg-green-500/20 rounded-lg p-4 text-center border border-green-500/30">
              <Icon name="TrendingUp" size={32} className="text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{winRate}%</div>
              <div className="text-xs text-white/60">Побед</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Коллекция котов */}
      <Card className="bg-space-dark/80 backdrop-blur-xl border-2 border-cosmic-purple">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="Cat" size={24} className="text-cosmic-pink" />
            Коллекция котов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Всего котов:</span>
              <span className="text-white font-bold text-xl">{totalCats}</span>
            </div>
            
            {gameStats.ownedCats && gameStats.ownedCats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {gameStats.ownedCats.map((cat) => (
                  <div 
                    key={cat.id}
                    className="bg-cosmic-purple/20 border border-cosmic-purple/30 rounded-lg p-3 text-center"
                  >
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-16 h-16 mx-auto rounded-full mb-2 border-2 border-white/20"
                    />
                    <div className="text-sm font-bold text-white truncate">{cat.name}</div>
                    <Badge className="mt-1 text-xs">{cat.rarity}</Badge>
                    <div className="text-xs text-white/60 mt-1">LVL {cat.level}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Достижения */}
      <Card className="bg-space-dark/80 backdrop-blur-xl border-2 border-cosmic-purple">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Award" size={24} className="text-star-glow" />
              Достижения
            </div>
            <Badge className="bg-star-glow text-space-darker">
              {unlockedAchievements}/{achievements.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 text-center border-2 transition-all ${
                  achievement.unlocked
                    ? 'bg-star-glow/20 border-star-glow shadow-lg shadow-star-glow/30'
                    : 'bg-white/5 border-white/10 opacity-40'
                }`}
              >
                <Icon 
                  name={achievement.icon as any} 
                  size={32} 
                  className={achievement.unlocked ? 'text-star-glow' : 'text-white/30'}
                />
                <div className={`text-xs mt-2 font-medium ${
                  achievement.unlocked ? 'text-white' : 'text-white/40'
                }`}>
                  {achievement.title}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserProfile
