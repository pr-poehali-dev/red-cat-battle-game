import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'

// Космический фон с звездами
const StarField = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 20
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            boxShadow: '0 0 10px rgba(255,255,255,0.8)'
          }}
        />
      ))}
    </div>
  )
}

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
  const [energyParticles, setEnergyParticles] = useState<Array<{id: number, x: number, y: number, angle: number, color: string}>>([])

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

    // Create energy particles explosion
    const particleColors = ['#06B6D4', '#8B5CF6', '#EC4899', '#FBBF24', '#6366F1']
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: x,
      y: y,
      angle: (360 / 8) * i,
      color: particleColors[Math.floor(Math.random() * particleColors.length)]
    }))
    
    setEnergyParticles(prev => [...prev, ...particles])

    // Remove animations after timeout
    setTimeout(() => {
      setDamageNumbers(prev => prev.filter(d => d.id !== damageId))
      setEnergyParticles(prev => prev.filter(p => !particles.find(particle => particle.id === p.id)))
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Космический фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-darker via-space-dark to-cosmic-purple">
        <div 
          className="absolute inset-0 opacity-60 animate-nebula"
          style={{
            background: 'linear-gradient(-45deg, #6366F1, #EC4899, #8B5CF6, #06B6D4)',
            backgroundSize: '400% 400%'
          }}
        />
      </div>
      <StarField />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-space-darker/80 backdrop-blur-md border-b border-cosmic-purple/30 text-white p-4 shadow-2xl shadow-cosmic-purple/20">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div className="text-center">
              <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cosmic-cyan to-cosmic-pink font-cosmic animate-glow">
                CAT KOMBAT
              </h1>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Icon name="Coins" size={16} className="text-star-glow animate-pulse" />
                <span className="font-bold">{gameStats.coins}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Zap" size={16} className="text-cosmic-cyan animate-pulse" />
                <span className="font-bold">{gameStats.power}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-space-dark/60 backdrop-blur-lg border-b border-cosmic-purple/40">
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
                    ? 'bg-cosmic-purple/30 text-white border-b-2 border-cosmic-cyan shadow-lg shadow-cosmic-purple/50' 
                    : 'text-white/70 hover:text-white hover:bg-cosmic-purple/20'
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
              <Card className="bg-space-dark/80 backdrop-blur-xl border-2 border-cosmic-purple shadow-2xl shadow-cosmic-purple/50 animate-glow">
                <CardContent className="p-6 text-center">
                  <div className="relative">
                    <div 
                      className={`cursor-pointer transition-all duration-300 ${isAttacking ? 'scale-110 animate-glow' : 'hover:scale-105 animate-float'} relative`}
                      onClick={handleCatClick}
                    >
                      <img 
                        src="/img/cc37bd5b-b9d5-45d9-a2fe-922bb6ac23bb.jpg" 
                        alt="Cyber Cat Fighter" 
                        className="w-48 h-48 mx-auto rounded-xl border-4 border-cosmic-cyan shadow-2xl shadow-cosmic-cyan/70 animate-glow object-cover"
                      />
                      {damageNumbers.map(damage => (
                        <div
                          key={damage.id}
                          className="absolute text-2xl font-black text-cosmic-cyan animate-bounce pointer-events-none drop-shadow-lg"
                          style={{
                            left: damage.x,
                            top: damage.y,
                            fontFamily: 'Fredoka One',
                            textShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
                          }}
                        >
                          -{damage.damage}
                        </div>
                      ))}
                      
                      {/* Energy Particles */}
                      {energyParticles.map(particle => (
                        <div
                          key={particle.id}
                          className="absolute w-3 h-3 rounded-full pointer-events-none animate-particle-burst"
                          style={{
                            left: particle.x,
                            top: particle.y,
                            backgroundColor: particle.color,
                            boxShadow: `0 0 15px ${particle.color}, 0 0 25px ${particle.color}`,
                            transform: `translate(-50%, -50%) rotate(${particle.angle}deg)`,
                            zIndex: 10
                          }}
                        />
                      ))}
                    </div>
                    <Badge className="mt-4 bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white font-bold text-lg px-6 py-2 animate-glow border border-cosmic-cyan/50">
                      Уровень {gameStats.level}
                    </Badge>
                  </div>
                  
                  {/* Experience Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm font-semibold mb-2 text-white">
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
              <Card className="bg-space-dark/80 backdrop-blur-xl border-2 border-cosmic-pink shadow-2xl shadow-cosmic-pink/50 animate-glow">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-cosmic-pink mb-2 font-cosmic drop-shadow-lg">
                      {currentEnemy.name}
                    </h3>
                    <div className="text-sm font-semibold mb-2 text-white">
                      HP: {currentEnemy.health}/{currentEnemy.maxHealth}
                    </div>
                    <Progress 
                      value={(currentEnemy.health / currentEnemy.maxHealth) * 100} 
                      className="h-4 mb-2"
                    />
                    <Badge className="bg-gradient-to-r from-star-glow to-cosmic-cyan text-space-dark font-bold border border-cosmic-cyan/50">
                      Награда: {currentEnemy.reward} 🪙
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-space-dark/60 backdrop-blur-lg border border-cosmic-purple/50 shadow-lg shadow-cosmic-purple/30">
                  <CardContent className="p-4 text-center">
                    <Icon name="Sword" size={24} className="text-cosmic-cyan mx-auto mb-2 animate-pulse" />
                    <div className="font-bold text-lg text-white">{gameStats.clickDamage}</div>
                    <div className="text-sm text-gray-300">Урон за клик</div>
                  </CardContent>
                </Card>
                <Card className="bg-space-dark/60 backdrop-blur-lg border border-cosmic-purple/50 shadow-lg shadow-cosmic-purple/30">
                  <CardContent className="p-4 text-center">
                    <Icon name="Shield" size={24} className="text-cosmic-purple mx-auto mb-2 animate-pulse" />
                    <div className="font-bold text-lg text-white">{gameStats.power}</div>
                    <div className="text-sm text-gray-300">Сила</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'fight' && (
            <div className="space-y-6">
              <Card className="bg-space-dark/80 backdrop-blur-xl border border-cosmic-purple/50 shadow-xl shadow-cosmic-purple/30">
                <CardContent className="p-6 text-center">
                  <Icon name="Sword" size={48} className="text-cosmic-cyan mx-auto mb-4 animate-float" />
                  <h2 className="text-2xl font-bold mb-4 text-white font-cosmic">
                    Арена Боёв
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Сражайтесь с врагами и получайте награды!
                  </p>
                  <Button className="w-full bg-gradient-to-r from-cosmic-purple to-cosmic-pink hover:from-cosmic-pink hover:to-cosmic-purple text-white font-bold py-3 border border-cosmic-cyan/50 shadow-lg shadow-cosmic-purple/50 transition-all duration-300">
                    Начать Турнир
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-space-dark/80 backdrop-blur-xl border border-cosmic-purple/50 shadow-xl shadow-cosmic-purple/30">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-4 text-white">Статистика боёв</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Побед:</span>
                      <span className="font-bold text-cosmic-cyan">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Поражений:</span>
                      <span className="font-bold text-cosmic-pink">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Рейтинг:</span>
                      <span className="font-bold text-star-glow">1000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'upgrade' && (
            <div className="space-y-4">
              <Card className="bg-space-dark/80 backdrop-blur-xl border border-cosmic-purple/50 shadow-xl shadow-cosmic-purple/30">
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-4 text-white font-cosmic">
                    Улучшения
                  </h2>
                  {upgrades.map((upgrade, index) => (
                    <div key={index} className="border border-cosmic-purple/50 rounded-lg p-4 mb-3 bg-space-darker/50 backdrop-blur-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-white">{upgrade.name}</h3>
                          <p className="text-sm text-gray-300">{upgrade.description}</p>
                        </div>
                        <Badge className="bg-gradient-to-r from-star-glow to-cosmic-cyan text-space-dark font-bold border border-cosmic-cyan/50">
                          {upgrade.cost} 🪙
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleUpgrade(upgrade)}
                        disabled={gameStats.coins < upgrade.cost}
                        className="w-full bg-gradient-to-r from-cosmic-cyan to-cosmic-blue hover:from-cosmic-blue hover:to-cosmic-cyan text-white font-bold disabled:opacity-50 border border-cosmic-cyan/50 shadow-lg shadow-cosmic-cyan/30 transition-all duration-300"
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
    </div>
  )
}

export default Index