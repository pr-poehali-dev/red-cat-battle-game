import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import { GameStats, Enemy, DamageNumber, EnergyParticle } from '@/types/game'

interface EnergyTimerProps {
  rechargeTime: number
}

const EnergyTimer: React.FC<EnergyTimerProps> = ({ rechargeTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>('')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const rechargeCompleteTime = rechargeTime + (3 * 60 * 60 * 1000) // 3 часа
      const timeDiff = rechargeCompleteTime - now

      if (timeDiff <= 0) {
        setTimeLeft('00:00:00')
        clearInterval(interval)
        return
      }

      const hours = Math.floor(timeDiff / (60 * 60 * 1000))
      const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000))
      const seconds = Math.floor((timeDiff % (60 * 1000)) / 1000)

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [rechargeTime])

  return (
    <div className="text-center mt-2 p-2 bg-orange-500/10 rounded border border-orange-500/30">
      <div className="text-orange-400 text-xs font-semibold">
        ⏰ Восстановление через: {timeLeft}
      </div>
    </div>
  )
}

interface CatFighterProps {
  gameStats: GameStats
  currentEnemy: Enemy
  isAttacking: boolean
  damageNumbers: DamageNumber[]
  energyParticles: EnergyParticle[]
  onCatClick: (event: React.MouseEvent) => void
}

const CatFighter: React.FC<CatFighterProps> = ({
  gameStats,
  currentEnemy,
  isAttacking,
  damageNumbers,
  energyParticles,
  onCatClick
}) => {
  // Получаем активного кота
  const activeCat = gameStats.ownedCats?.find(cat => cat.id === gameStats.activeCatId) || gameStats.ownedCats?.[0]
  const catImage = activeCat?.image || '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg'
  const catName = activeCat?.name || 'Cyber Cat Fighter'

  return (
    <div className="space-y-6">
      {/* Cat Fighter */}
      <Card className="bg-space-dark/80 backdrop-blur-xl border-2 border-cosmic-purple shadow-2xl shadow-cosmic-purple/50 animate-glow">
        <CardContent className="p-6 text-center">
          <div className="relative">
            <div 
              className={`cursor-pointer transition-all duration-300 ${isAttacking ? 'scale-110' : 'hover:scale-105'} relative`}
              onClick={onCatClick}
            >
              <img 
                src={catImage} 
                alt={catName} 
                className="w-48 h-48 mx-auto rounded-xl border-4 border-cosmic-cyan shadow-2xl shadow-cosmic-cyan/70 object-cover"
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

          {/* Energy Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm font-semibold mb-2 text-white">
              <span>Энергия</span>
              <span>{gameStats.energy}/{gameStats.maxEnergy}</span>
            </div>
            <Progress 
              value={(gameStats.energy / gameStats.maxEnergy) * 100} 
              className="h-3"
            />
            {gameStats.energy === 0 && gameStats.energyRechargeTime && (
              <EnergyTimer rechargeTime={gameStats.energyRechargeTime} />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enemy */}
      <Card className="bg-space-dark/80 backdrop-blur-xl border-2 border-cosmic-pink shadow-2xl shadow-cosmic-pink/50 animate-glow">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="mb-3">
              <img 
                src="/img/292818a9-df87-4715-90f6-48408ff6626e.jpg" 
                alt={currentEnemy.name}
                className="w-24 h-24 mx-auto rounded-xl border-2 border-cosmic-pink shadow-lg shadow-cosmic-pink/50 object-cover"
              />
            </div>
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
  )
}

export default CatFighter