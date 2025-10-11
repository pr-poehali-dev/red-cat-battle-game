import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import { GameStats, Enemy, DamageNumber, EnergyParticle } from '@/types/game'

interface EnergyTimerProps {
  rechargeTime: number
  activeCat?: any
}

const EnergyTimer: React.FC<EnergyTimerProps> = ({ rechargeTime, activeCat }) => {
  const [timeLeft, setTimeLeft] = useState<string>('')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const rechargeHours = activeCat?.isPremiumMiner 
        ? (activeCat.premiumMiningRechargeHours || 6)
        : 3
      const rechargeCompleteTime = rechargeTime + (rechargeHours * 60 * 60 * 1000)
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
  }, [rechargeTime, activeCat])

  return (
    <div className="text-center mt-2 p-2 bg-orange-500/10 rounded border border-orange-500/30">
      <div className="text-orange-400 text-xs font-semibold">
        ⏰ Восстановление через: {timeLeft}
        {activeCat?.isPremiumMiner && <span className="ml-2 text-purple-400">(Премиум кот: 6ч)</span>}
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
  onNavigate?: (tab: string) => void
  onRestoreEnergy?: () => void
  onIncreaseMaxEnergy?: () => void
}

const CatFighter: React.FC<CatFighterProps> = ({
  gameStats,
  currentEnemy,
  isAttacking,
  damageNumbers,
  energyParticles,
  onCatClick,
  onNavigate,
  onRestoreEnergy,
  onIncreaseMaxEnergy
}) => {
  // Получаем активного кота
  const activeCat = gameStats.ownedCats?.find(cat => cat.id === gameStats.activeCatId) || gameStats.ownedCats?.[0]
  const catImage = activeCat?.image || '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg'
  const catName = activeCat?.name || 'Cyber Cat Fighter'
  const isDustCat = activeCat?.id === 'dust-cat'
  const hasSpecialAbility = activeCat?.hasSpecialAbility
  
  // Кулдаун спецспособности
  const [cooldownPercent, setCooldownPercent] = useState(0)
  const [cooldownText, setCooldownText] = useState('')
  const [showSpecialEffect, setShowSpecialEffect] = useState(false)
  const [lastUsedTime, setLastUsedTime] = useState(0)
  
  // Эффект экрана при активации спецатаки
  useEffect(() => {
    if (!activeCat?.specialAbilityLastUsed) return
    
    const currentLastUsed = activeCat.specialAbilityLastUsed
    if (currentLastUsed !== lastUsedTime && currentLastUsed > 0) {
      setShowSpecialEffect(true)
      setLastUsedTime(currentLastUsed)
      
      setTimeout(() => {
        setShowSpecialEffect(false)
      }, 800)
    }
  }, [activeCat?.specialAbilityLastUsed, lastUsedTime])
  
  useEffect(() => {
    if (!isDustCat || !hasSpecialAbility) return
    
    const interval = setInterval(() => {
      const now = Date.now()
      const lastUsed = activeCat?.specialAbilityLastUsed || 0
      const cooldownTime = 30000 // 30 секунд
      const timePassed = now - lastUsed
      
      if (timePassed < cooldownTime) {
        const remaining = cooldownTime - timePassed
        const percent = (timePassed / cooldownTime) * 100
        setCooldownPercent(percent)
        setCooldownText(`${Math.ceil(remaining / 1000)}s`)
      } else {
        setCooldownPercent(100)
        setCooldownText('Готово!')
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [isDustCat, hasSpecialAbility, activeCat?.specialAbilityLastUsed])

  const menuItems = [
    { id: 'fight', icon: 'Sword', label: 'Бои' },
    { id: 'shop', icon: 'ShoppingBag', label: 'Магазин' },
    { id: 'battle', icon: 'Zap', label: 'Арена' }
  ]

  const menuItems2 = [
    { id: 'tournament', icon: 'Trophy', label: 'Турниры' },
    { id: 'guild', icon: 'Shield', label: 'Гильдии' },
    { id: 'quests', icon: 'Target', label: 'Квесты' }
  ]

  return (
    <div className="space-y-6">
      {/* Полноэкранный эффект спецатаки */}
      {showSpecialEffect && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          {/* Флеш-эффект */}
          <div className="absolute inset-0 bg-cyan-400 animate-[flash_0.3s_ease-out]" style={{ opacity: 0.4 }} />
          
          {/* Волны энергии */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-cyan-400 animate-[energyWave_0.8s_ease-out] opacity-0" />
            <div className="absolute w-32 h-32 rounded-full bg-blue-400 animate-[energyWave_0.8s_ease-out_0.2s] opacity-0" />
            <div className="absolute w-32 h-32 rounded-full bg-purple-400 animate-[energyWave_0.8s_ease-out_0.4s] opacity-0" />
          </div>
          
          {/* Звёздные частицы */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-[starFall_0.8s_ease-out] opacity-0"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              <div className="w-2 h-2 bg-cyan-300 rounded-full shadow-lg shadow-cyan-400" />
            </div>
          ))}
          
          {/* Текст спецатаки */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-black text-cyan-300 animate-[scaleInOut_0.8s_ease-out] drop-shadow-2xl" style={{ fontFamily: 'Fredoka One', textShadow: '0 0 40px rgba(0, 255, 255, 1), 0 0 80px rgba(0, 212, 255, 0.8)' }}>
              ✨ ЗВЁЗДНЫЙ ВЗРЫВ! ✨
            </div>
          </div>
        </div>
      )}
      
      {/* Cat Fighter */}
      <Card className="bg-space-dark/80 backdrop-blur-xl border-2 border-cosmic-purple shadow-2xl shadow-cosmic-purple/50 animate-glow">
        <CardContent className="p-6 text-center">
          <div className="relative flex items-center justify-center gap-4">
            {/* Left Menu */}
            <div className="flex flex-col gap-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  className="w-12 h-12 rounded-full bg-cosmic-purple/30 hover:bg-cosmic-purple/50 border border-cosmic-cyan/50 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-cosmic-purple/30"
                  title={item.label}
                >
                  <Icon name={item.icon as any} size={20} className="text-cosmic-cyan" />
                </button>
              ))}
            </div>

            {/* Cat Image */}
            <div 
              className={`cursor-pointer transition-all duration-300 ${isAttacking ? 'scale-110' : 'hover:scale-105'} relative`}
              onClick={onCatClick}
            >
              <img 
                src={catImage} 
                alt={catName} 
                className={`w-48 h-48 mx-auto rounded-xl border-4 object-cover ${
                  isDustCat && hasSpecialAbility
                    ? 'border-cyan-400 shadow-2xl shadow-cyan-400/70 animate-[cosmicPulse_2s_ease-in-out_infinite]'
                    : 'border-cosmic-cyan shadow-2xl shadow-cosmic-cyan/70'
                }`}
              />
              {isDustCat && hasSpecialAbility && (
                <>
                  <div className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse">
                    ⚡ Звёздный Взрыв
                  </div>
                  {/* Индикатор кулдауна */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-40">
                    <div className="bg-slate-900/90 rounded-full px-3 py-1 border border-cyan-400/30">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-cyan-400 font-bold">Кулдаун</span>
                        <span className={`font-bold ${cooldownPercent >= 100 ? 'text-green-400' : 'text-orange-400'}`}>
                          {cooldownText}
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            cooldownPercent >= 100 
                              ? 'bg-gradient-to-r from-green-400 to-cyan-400' 
                              : 'bg-gradient-to-r from-orange-400 to-cyan-400'
                          }`}
                          style={{ width: `${Math.min(cooldownPercent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {damageNumbers.map(damage => (
                <div
                  key={damage.id}
                  className={`absolute font-black pointer-events-none drop-shadow-lg ${
                    damage.isSpecial 
                      ? 'text-5xl text-cyan-300 animate-[starBurst_1s_ease-out]' 
                      : 'text-2xl text-cosmic-cyan animate-bounce'
                  }`}
                  style={{
                    left: damage.x,
                    top: damage.y,
                    fontFamily: 'Fredoka One',
                    textShadow: damage.isSpecial
                      ? '0 0 30px rgba(0, 255, 255, 1), 0 0 60px rgba(0, 212, 255, 0.8)'
                      : '0 0 10px rgba(6, 182, 212, 0.8)',
                    zIndex: damage.isSpecial ? 100 : 10
                  }}
                >
                  {damage.isSpecial && '✨ '}
                  -{damage.damage}
                  {damage.isSpecial && ' ✨'}
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

            {/* Right Menu */}
            <div className="flex flex-col gap-2">
              {menuItems2.map(item => (
                <button
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  className="w-12 h-12 rounded-full bg-cosmic-purple/30 hover:bg-cosmic-purple/50 border border-cosmic-cyan/50 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-cosmic-purple/30"
                  title={item.label}
                >
                  <Icon name={item.icon as any} size={20} className="text-cosmic-cyan" />
                </button>
              ))}
            </div>
          </div>

          <Badge className="mt-4 bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white font-bold text-lg px-6 py-2 animate-glow border border-cosmic-cyan/50">
            Уровень {gameStats.level}
          </Badge>
          
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
              <div className="flex items-center gap-2">
                <span>Энергия</span>
                <button
                  onClick={onRestoreEnergy}
                  disabled={gameStats.energy >= gameStats.maxEnergy || gameStats.coins < 15000}
                  className="p-1 rounded-full bg-yellow-500/20 border border-yellow-500/50 hover:bg-yellow-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
                  title="Восстановить энергию за 15 000 монет"
                >
                  <Icon name="Zap" size={16} className="text-yellow-400" />
                </button>
                <button
                  onClick={onIncreaseMaxEnergy}
                  disabled={gameStats.coins < 5000}
                  className="p-1 rounded-full bg-green-500/20 border border-green-500/50 hover:bg-green-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
                  title="Увеличить макс. энергию на 100 за 5 000 монет"
                >
                  <Icon name="Plus" size={16} className="text-green-400" />
                </button>
              </div>
              <span>{gameStats.energy}/{gameStats.maxEnergy}</span>
            </div>
            <Progress 
              value={(gameStats.energy / gameStats.maxEnergy) * 100} 
              className="h-3"
            />
            {gameStats.energy === 0 && gameStats.energyRechargeTime && (
              <EnergyTimer rechargeTime={gameStats.energyRechargeTime} activeCat={activeCat} />
            )}
          </div>

          {/* Premium Mining Progress */}
          {activeCat?.isPremiumMiner && (
            <div className="mt-4 bg-purple-500/20 border border-purple-500/50 rounded-lg p-3">
              <div className="flex justify-between text-sm font-semibold mb-2 text-purple-300">
                <span className="flex items-center gap-1">
                  <img 
                    src="/img/448a4b3f-b7da-4ef7-a5b5-ba81e92ce674.jpg" 
                    alt="Premium Coin"
                    className="w-4 h-4 rounded-full"
                  />
                  Майнинг премиум монет
                </span>
                <span>{activeCat.premiumEnergySpent || 0}/{activeCat.premiumMiningEnergyCost || 3000}</span>
              </div>
              <Progress 
                value={((activeCat.premiumEnergySpent || 0) / (activeCat.premiumMiningEnergyCost || 3000)) * 100} 
                className="h-2 bg-purple-900/50"
              />
              <p className="text-xs text-purple-400 mt-2 text-center">
                Потратьте {activeCat.premiumMiningEnergyCost} энергии, чтобы получить 1 💎
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enemy */}
      <Card className="bg-space-dark/80 backdrop-blur-xl border-2 border-cosmic-pink shadow-2xl shadow-cosmic-pink/50 animate-glow">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="mb-3">
              <img 
                src="/img/11e6ccb8-6935-48a3-8563-5f78a7819ae0.jpg" 
                alt={currentEnemy.name}
                className="w-24 h-24 mx-auto rounded-xl border-2 border-cosmic-pink shadow-lg shadow-cosmic-pink/50 object-cover animate-pulse"
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