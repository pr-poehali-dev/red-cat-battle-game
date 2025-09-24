import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { OwnedCat } from '@/types/game'

interface BattleEnemy {
  id: string
  name: string
  level: number
  health: number
  maxHealth: number
  attack: number
  defense: number
  speed: number
  reward: number
  image: string
}

interface CatBattleProps {
  ownedCats: OwnedCat[]
  playerCoins: number
  onBattleWin: (reward: number, experience: number) => void
  onCatExperience: (catId: string, experience: number) => void
}

const CatBattle: React.FC<CatBattleProps> = ({ ownedCats, playerCoins, onBattleWin, onCatExperience }) => {
  const [selectedCat, setSelectedCat] = useState<OwnedCat | null>(null)
  const [currentEnemy, setCurrentEnemy] = useState<BattleEnemy | null>(null)
  const [battlePhase, setBattlePhase] = useState<'select' | 'battle' | 'victory' | 'defeat'>('select')
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [catHealth, setCatHealth] = useState<number>(0)
  const [enemyHealth, setEnemyHealth] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const enemies: BattleEnemy[] = [
    {
      id: 'robot-dog',
      name: 'Киборг-Собака',
      level: 1,
      health: 80,
      maxHealth: 80,
      attack: 12,
      defense: 5,
      speed: 8,
      reward: 25,
      image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg'
    },
    {
      id: 'alien-spider',
      name: 'Инопланетный Паук',
      level: 3,
      health: 150,
      maxHealth: 150,
      attack: 20,
      defense: 8,
      speed: 15,
      reward: 50,
      image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg'
    },
    {
      id: 'cosmic-wolf',
      name: 'Космический Волк',
      level: 5,
      health: 250,
      maxHealth: 250,
      attack: 35,
      defense: 15,
      speed: 25,
      reward: 100,
      image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg'
    },
    {
      id: 'star-dragon',
      name: 'Звёздный Дракон',
      level: 8,
      health: 400,
      maxHealth: 400,
      attack: 55,
      defense: 25,
      speed: 20,
      reward: 200,
      image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg'
    },
    {
      id: 'void-lord',
      name: 'Повелитель Пустоты',
      level: 12,
      health: 600,
      maxHealth: 600,
      attack: 80,
      defense: 40,
      speed: 30,
      reward: 350,
      image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg'
    }
  ]

  const calculateDamage = (attacker: { currentAttack: number } | { attack: number }, defender: { currentDefense: number } | { defense: number }) => {
    const attack = 'currentAttack' in attacker ? attacker.currentAttack : attacker.attack
    const defense = 'currentDefense' in defender ? defender.currentDefense : defender.defense
    const baseDamage = Math.max(1, attack - Math.floor(defense / 2))
    const variation = Math.random() * 0.4 + 0.8 // 80-120% урона
    return Math.floor(baseDamage * variation)
  }

  const startBattle = (enemy: BattleEnemy) => {
    if (!selectedCat) return

    setCurrentEnemy(enemy)
    setCatHealth(selectedCat.currentHealth)
    setEnemyHealth(enemy.health)
    setBattlePhase('battle')
    setBattleLog([`🥊 ${selectedCat.name} вступает в бой с ${enemy.name}!`])
    
    // Определяем, кто ходит первым по скорости
    if (selectedCat.currentSpeed >= enemy.speed) {
      setTimeout(() => catAttack(), 1000)
    } else {
      setTimeout(() => enemyAttack(), 1000)
    }
  }

  const catAttack = () => {
    if (!selectedCat || !currentEnemy || battlePhase !== 'battle') return
    
    setIsAnimating(true)
    const damage = calculateDamage(selectedCat, currentEnemy)
    const newEnemyHealth = Math.max(0, enemyHealth - damage)
    
    setEnemyHealth(newEnemyHealth)
    setBattleLog(prev => [...prev, `⚔️ ${selectedCat.name} наносит ${damage} урона!`])
    
    setTimeout(() => {
      setIsAnimating(false)
      
      if (newEnemyHealth <= 0) {
        // Победа!
        const expGain = currentEnemy.level * 20
        setBattleLog(prev => [...prev, `🎉 Победа! Получено ${currentEnemy.reward} монет и ${expGain} опыта!`])
        setBattlePhase('victory')
        onBattleWin(currentEnemy.reward, expGain)
        onCatExperience(selectedCat.id, expGain)
      } else {
        // Ход противника
        setTimeout(() => enemyAttack(), 1000)
      }
    }, 500)
  }

  const enemyAttack = () => {
    if (!selectedCat || !currentEnemy || battlePhase !== 'battle') return
    
    const damage = calculateDamage(currentEnemy, selectedCat)
    const newCatHealth = Math.max(0, catHealth - damage)
    
    setCatHealth(newCatHealth)
    setBattleLog(prev => [...prev, `💥 ${currentEnemy.name} наносит ${damage} урона!`])
    
    setTimeout(() => {
      if (newCatHealth <= 0) {
        // Поражение!
        setBattleLog(prev => [...prev, `💀 ${selectedCat.name} повержен! Тренируйтесь и возвращайтесь!`])
        setBattlePhase('defeat')
      } else {
        // Ход кота
        setTimeout(() => catAttack(), 1000)
      }
    }, 500)
  }

  const resetBattle = () => {
    setBattlePhase('select')
    setCurrentEnemy(null)
    setCatHealth(0)
    setEnemyHealth(0)
    setBattleLog([])
    setIsAnimating(false)
  }

  const getRecommendedLevel = (enemy: BattleEnemy) => {
    return Math.max(1, enemy.level - 1)
  }

  const canFightEnemy = (enemy: BattleEnemy, cat: OwnedCat) => {
    return cat.level >= getRecommendedLevel(enemy)
  }

  if (ownedCats.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-400 text-lg mb-2">😿 У вас нет котов для боя</div>
        <div className="text-gray-500 text-sm">Купите котов в магазине, чтобы сражаться!</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white font-cosmic">
          ⚔️ Боевая арена
        </h2>
        <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-2">
          <Icon name="DollarSign" size={18} className="text-yellow-400" />
          <span className="text-lg font-bold text-yellow-400">{playerCoins}</span>
        </div>
      </div>

      {battlePhase === 'select' && (
        <>
          {/* Выбор кота */}
          <Card className="bg-slate-700/90 backdrop-blur-sm border border-slate-600">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-white mb-4">🐱 Выберите бойца</h3>
              <div className="grid gap-3">
                {ownedCats.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => setSelectedCat(cat)}
                    className={`cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                      selectedCat?.id === cat.id
                        ? `border-${cat.borderColor} bg-${cat.rarityColor}-500/20`
                        : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${cat.rarityColor}-400/20 to-${cat.rarityColor}-500/20 p-1`}>
                          <img src={cat.image} alt={cat.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border border-slate-800 flex items-center justify-center text-xs font-bold border-${cat.borderColor} bg-slate-800 text-${cat.rarityColor}-400`}>
                          {cat.level}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-white font-semibold">{cat.name}</div>
                        <div className="flex gap-2 text-xs">
                          <span className="text-red-400">❤️{cat.currentHealth}</span>
                          <span className="text-orange-400">⚔️{cat.currentAttack}</span>
                          <span className="text-blue-400">🛡️{cat.currentDefense}</span>
                          <span className="text-yellow-400">⚡{cat.currentSpeed}</span>
                        </div>
                      </div>
                      
                      {selectedCat?.id === cat.id && (
                        <Icon name="CheckCircle" size={20} className={`text-${cat.rarityColor}-400`} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Список врагов */}
          {selectedCat && (
            <Card className="bg-slate-700/90 backdrop-blur-sm border border-slate-600">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-white mb-4">👹 Выберите противника</h3>
                <div className="grid gap-3">
                  {enemies.map((enemy) => {
                    const canFight = canFightEnemy(enemy, selectedCat)
                    return (
                      <div 
                        key={enemy.id}
                        className={`p-3 rounded-lg border transition-all duration-200 ${
                          canFight 
                            ? 'border-slate-600 bg-slate-800/50 hover:border-red-500 cursor-pointer'
                            : 'border-gray-700 bg-gray-800/30 cursor-not-allowed opacity-50'
                        }`}
                        onClick={() => canFight && startBattle(enemy)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 p-1">
                              <img src={enemy.image} alt={enemy.name} className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border border-slate-800 flex items-center justify-center text-xs font-bold border-red-500 bg-slate-800 text-red-400">
                              {enemy.level}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="text-white font-semibold">{enemy.name}</div>
                            <div className="flex gap-2 text-xs">
                              <span className="text-red-400">❤️{enemy.health}</span>
                              <span className="text-orange-400">⚔️{enemy.attack}</span>
                              <span className="text-blue-400">🛡️{enemy.defense}</span>
                              <span className="text-yellow-400">⚡{enemy.speed}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-yellow-400 text-sm">
                              <Icon name="DollarSign" size={14} />
                              {enemy.reward}
                            </div>
                            {!canFight && (
                              <div className="text-red-400 text-xs">
                                Нужен {getRecommendedLevel(enemy)} ур.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Экран битвы */}
      {(battlePhase === 'battle' || battlePhase === 'victory' || battlePhase === 'defeat') && selectedCat && currentEnemy && (
        <div className="space-y-4">
          {/* Боевое поле */}
          <Card className="bg-gradient-to-r from-red-900/50 to-purple-900/50 backdrop-blur-sm border border-red-500/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                {/* Кот */}
                <div className="text-center">
                  <div className={`relative w-20 h-20 mx-auto mb-2 ${isAnimating ? 'animate-bounce' : ''}`}>
                    <div className={`w-full h-full rounded-full bg-gradient-to-br from-${selectedCat.rarityColor}-400/20 to-${selectedCat.rarityColor}-500/20 p-1`}>
                      <img src={selectedCat.image} alt={selectedCat.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <div className="text-white font-bold text-sm">{selectedCat.name}</div>
                  <div className="w-24 bg-slate-700 rounded-full h-2 mx-auto">
                    <div 
                      className={`bg-gradient-to-r from-${selectedCat.rarityColor}-400 to-${selectedCat.rarityColor}-500 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(catHealth / selectedCat.currentHealth) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-white/70">{catHealth}/{selectedCat.currentHealth}</div>
                </div>

                {/* VS */}
                <div className="text-4xl font-bold text-red-400 animate-pulse">VS</div>

                {/* Враг */}
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 p-1">
                      <img src={currentEnemy.image} alt={currentEnemy.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <div className="text-white font-bold text-sm">{currentEnemy.name}</div>
                  <div className="w-24 bg-slate-700 rounded-full h-2 mx-auto">
                    <div 
                      className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(enemyHealth / currentEnemy.maxHealth) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-white/70">{enemyHealth}/{currentEnemy.maxHealth}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Лог битвы */}
          <Card className="bg-slate-800/90 backdrop-blur-sm border border-slate-600">
            <CardContent className="p-4">
              <div className="h-32 overflow-y-auto space-y-1">
                {battleLog.map((log, index) => (
                  <div key={index} className="text-sm text-gray-300">{log}</div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Кнопки управления */}
          <div className="flex gap-3">
            {battlePhase === 'battle' && (
              <Button 
                onClick={catAttack}
                disabled={isAnimating}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              >
                ⚔️ Атаковать
              </Button>
            )}
            
            {(battlePhase === 'victory' || battlePhase === 'defeat') && (
              <>
                <Button 
                  onClick={resetBattle}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  🔄 Новый бой
                </Button>
                {battlePhase === 'victory' && (
                  <Button 
                    onClick={() => startBattle(currentEnemy)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  >
                    🔥 Реванш
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CatBattle