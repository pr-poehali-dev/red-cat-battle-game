import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'

interface GameStats {
  level: number
  power: number
  coins: number
  experience: number
  maxExperience: number
  clickDamage: number
}

interface Enemy {
  name: string
  health: number
  maxHealth: number
  reward: number
}

function Index() {
  const [activeTab, setActiveTab] = useState('home')
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 1,
    power: 100,
    coins: 0,
    experience: 0,
    maxExperience: 100,
    clickDamage: 10
  })

  const [currentEnemy, setCurrentEnemy] = useState<Enemy>({
    name: 'Злой Пёс',
    health: 50,
    maxHealth: 50,
    reward: 5
  })

  const [damageNumbers, setDamageNumbers] = useState<Array<{id: number, damage: number, x: number, y: number}>>([])
  const [isAttacking, setIsAttacking] = useState(false)

  const handleCatClick = (event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    setIsAttacking(true)
    setTimeout(() => setIsAttacking(false), 200)

    // Add damage number animation
    const damageId = Date.now()
    setDamageNumbers(prev => [...prev, {
      id: damageId,
      damage: gameStats.clickDamage,
      x,
      y
    }])

    // Remove damage number after animation
    setTimeout(() => {
      setDamageNumbers(prev => prev.filter(d => d.id !== damageId))
    }, 1000)

    // Deal damage to enemy
    const newHealth = Math.max(0, currentEnemy.health - gameStats.clickDamage)
    setCurrentEnemy(prev => ({ ...prev, health: newHealth }))

    // Check if enemy is defeated
    if (newHealth <= 0) {
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins + currentEnemy.reward,
        experience: prev.experience + 10
      }))
      
      // Spawn new enemy
      setTimeout(() => {
        setCurrentEnemy({
          name: 'Злой Пёс',
          health: 50 + Math.floor(Math.random() * 30),
          maxHealth: 50 + Math.floor(Math.random() * 30),
          reward: 5 + Math.floor(Math.random() * 5)
        })
      }, 500)
    }
  }

  // Level up system
  useEffect(() => {
    if (gameStats.experience >= gameStats.maxExperience) {
      setGameStats(prev => ({
        ...prev,
        level: prev.level + 1,
        experience: prev.experience - prev.maxExperience,
        maxExperience: Math.floor(prev.maxExperience * 1.5),
        power: prev.power + 50,
        clickDamage: prev.clickDamage + 5
      }))
    }
  }, [gameStats.experience, gameStats.maxExperience])

  const upgrades = [
    { name: 'Острые Когти', cost: 50, powerIncrease: 25, description: 'Увеличивает урон на 5' },
    { name: 'Быстрые Лапы', cost: 100, powerIncrease: 50, description: 'Увеличивает скорость атаки' },
    { name: 'Железные Мускулы', cost: 200, powerIncrease: 100, description: 'Удваивает урон' }
  ]

  const handleUpgrade = (upgrade: typeof upgrades[0]) => {
    if (gameStats.coins >= upgrade.cost) {
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins - upgrade.cost,
        power: prev.power + upgrade.powerIncrease,
        clickDamage: prev.clickDamage + 5
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cat-orange via-cat-yellow to-cat-green">
      {/* Header */}
      <div className="bg-cat-navy/90 backdrop-blur-sm text-white p-4 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="text-center">
            <h1 className="text-2xl font-black text-cat-yellow" style={{fontFamily: 'Fredoka One'}}>
              CAT KOMBAT
            </h1>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Icon name="Coins" size={16} className="text-cat-yellow" />
              <span className="font-bold">{gameStats.coins}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Zap" size={16} className="text-cat-green" />
              <span className="font-bold">{gameStats.power}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-md mx-auto flex">
          {[
            { id: 'home', label: 'Главная', icon: 'Home' },
            { id: 'fight', label: 'Бои', icon: 'Sword' },
            { id: 'upgrade', label: 'Улучшения', icon: 'TrendingUp' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 p-3 text-sm font-semibold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white/20 text-white border-b-2 border-cat-yellow' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <Icon name={tab.icon as any} size={18} />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 pb-20">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Cat Fighter */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-cat-orange shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="relative">
                  <div 
                    className={`cursor-pointer transition-transform ${isAttacking ? 'scale-110' : 'hover:scale-105'} relative`}
                    onClick={handleCatClick}
                  >
                    <img 
                      src="/img/4e527281-3b9b-44d7-be71-355a5f3de284.jpg" 
                      alt="Cat Fighter" 
                      className="w-48 h-48 mx-auto rounded-xl border-4 border-cat-orange shadow-lg"
                    />
                    {damageNumbers.map(damage => (
                      <div
                        key={damage.id}
                        className="absolute text-2xl font-black text-cat-orange animate-bounce pointer-events-none"
                        style={{
                          left: damage.x,
                          top: damage.y,
                          fontFamily: 'Fredoka One'
                        }}
                      >
                        -{damage.damage}
                      </div>
                    ))}
                  </div>
                  <Badge className="mt-4 bg-cat-orange text-white font-bold text-lg px-6 py-2">
                    Уровень {gameStats.level}
                  </Badge>
                </div>
                
                {/* Experience Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>Опыт</span>
                    <span>{gameStats.experience}/{gameStats.maxExperience}</span>
                  </div>
                  <Progress 
                    value={(gameStats.experience / gameStats.maxExperience) * 100} 
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Enemy */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-red-500 shadow-xl">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-red-600 mb-2" style={{fontFamily: 'Fredoka One'}}>
                    {currentEnemy.name}
                  </h3>
                  <div className="text-sm font-semibold mb-2">
                    HP: {currentEnemy.health}/{currentEnemy.maxHealth}
                  </div>
                  <Progress 
                    value={(currentEnemy.health / currentEnemy.maxHealth) * 100} 
                    className="h-4 mb-2"
                  />
                  <Badge className="bg-cat-yellow text-cat-navy font-bold">
                    Награда: {currentEnemy.reward} 🪙
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Icon name="Sword" size={24} className="text-cat-orange mx-auto mb-2" />
                  <div className="font-bold text-lg">{gameStats.clickDamage}</div>
                  <div className="text-sm text-gray-600">Урон за клик</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Icon name="Shield" size={24} className="text-cat-green mx-auto mb-2" />
                  <div className="font-bold text-lg">{gameStats.power}</div>
                  <div className="text-sm text-gray-600">Сила</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'fight' && (
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Icon name="Sword" size={48} className="text-cat-orange mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4" style={{fontFamily: 'Fredoka One'}}>
                  Арена Боёв
                </h2>
                <p className="text-gray-600 mb-6">
                  Сражайтесь с врагами и получайте награды!
                </p>
                <Button className="w-full bg-cat-orange hover:bg-cat-orange/90 text-white font-bold py-3">
                  Начать Турнир
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <h3 className="font-bold mb-4">Статистика боёв</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Побед:</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Поражений:</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Рейтинг:</span>
                    <span className="font-bold">1000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'upgrade' && (
          <div className="space-y-4">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4" style={{fontFamily: 'Fredoka One'}}>
                  Улучшения
                </h2>
                {upgrades.map((upgrade, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold">{upgrade.name}</h3>
                        <p className="text-sm text-gray-600">{upgrade.description}</p>
                      </div>
                      <Badge className="bg-cat-yellow text-cat-navy font-bold">
                        {upgrade.cost} 🪙
                      </Badge>
                    </div>
                    <Button
                      onClick={() => handleUpgrade(upgrade)}
                      disabled={gameStats.coins < upgrade.cost}
                      className="w-full bg-cat-green hover:bg-cat-green/90 text-white font-bold disabled:opacity-50"
                    >
                      Купить (+{upgrade.powerIncrease} силы)
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index