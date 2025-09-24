import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import type { Cat } from '@/types/game'

interface Enemy {
  name: string
  level: number
  attack: number
  defense: number
  health: number
  maxHealth: number
  speed: number
  emoji: string
  reward: number
  experience: number
}

interface Tournament {
  name: string
  emoji: string
  requiredLevel: number
  enemies: Enemy[]
  finalReward: number
  description: string
  color: string
}

interface CatTournamentProps {
  ownedCats: Cat[]
  playerCoins: number
  onTournamentWin: (reward: number, experience: number) => void
  onCatExperience: (catId: string, experience: number) => void
}

const tournaments: Tournament[] = [
  {
    name: "Межпланетная Лига",
    emoji: "🌍",
    requiredLevel: 1,
    enemies: [
      { name: "Марсианский Скаут", level: 1, attack: 15, defense: 10, health: 50, maxHealth: 50, speed: 15, emoji: "👽", reward: 30, experience: 25 },
      { name: "Лунный Страж", level: 2, attack: 20, defense: 12, health: 70, maxHealth: 70, speed: 18, emoji: "🛡️", reward: 45, experience: 35 },
      { name: "Венерианский Чемпион", level: 3, attack: 28, defense: 15, health: 90, maxHealth: 90, speed: 22, emoji: "⭐", reward: 60, experience: 50 }
    ],
    finalReward: 200,
    description: "3 боя против инопланетных бойцов",
    color: "from-blue-500 to-purple-600"
  },
  {
    name: "Галактический Чемпионат",
    emoji: "🌌",
    requiredLevel: 5,
    enemies: [
      { name: "Андромедский Воин", level: 5, attack: 40, defense: 25, health: 120, maxHealth: 120, speed: 30, emoji: "⚔️", reward: 80, experience: 70 },
      { name: "Нейтронная Машина", level: 6, attack: 50, defense: 30, health: 150, maxHealth: 150, speed: 25, emoji: "🤖", reward: 100, experience: 85 },
      { name: "Квазарный Титан", level: 7, attack: 60, defense: 35, health: 180, maxHealth: 180, speed: 35, emoji: "💫", reward: 120, experience: 100 },
      { name: "Чёрная Дыра", level: 8, attack: 75, defense: 40, health: 220, maxHealth: 220, speed: 40, emoji: "⚫", reward: 150, experience: 120 }
    ],
    finalReward: 500,
    description: "4 боя против галактических титанов",
    color: "from-purple-600 to-pink-600"
  },
  {
    name: "Турнир Богов",
    emoji: "👑",
    requiredLevel: 10,
    enemies: [
      { name: "Космический Архангел", level: 10, attack: 90, defense: 50, health: 300, maxHealth: 300, speed: 50, emoji: "😇", reward: 200, experience: 150 },
      { name: "Повелитель Времени", level: 12, attack: 110, defense: 60, health: 350, maxHealth: 350, speed: 55, emoji: "⏰", reward: 250, experience: 180 },
      { name: "Создатель Вселенной", level: 15, attack: 140, defense: 80, health: 450, maxHealth: 450, speed: 65, emoji: "🌟", reward: 300, experience: 220 },
      { name: "Абсолютное Бытие", level: 18, attack: 180, defense: 100, health: 600, maxHealth: 600, speed: 80, emoji: "💎", reward: 400, experience: 300 },
      { name: "Альфа и Омега", level: 20, attack: 250, defense: 150, health: 1000, maxHealth: 1000, speed: 100, emoji: "∞", reward: 666, experience: 500 }
    ],
    finalReward: 2000,
    description: "5 боёв против божественных сущностей",
    color: "from-yellow-400 to-orange-600"
  }
]

export default function CatTournament({ ownedCats, playerCoins, onTournamentWin, onCatExperience }: CatTournamentProps) {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null)
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [currentFight, setCurrentFight] = useState(0)
  const [isInTournament, setIsInTournament] = useState(false)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [isAutoFighting, setIsAutoFighting] = useState(false)
  const [fightResult, setFightResult] = useState<'win' | 'lose' | null>(null)
  const [tournamentComplete, setTournamentComplete] = useState(false)

  // Боевая логика
  const calculateDamage = (attacker: any, defender: any): number => {
    const baseDamage = Math.max(1, attacker.attack - Math.floor(defender.defense / 2))
    const variance = Math.random() * 0.4 - 0.2 // ±20% вариация
    return Math.floor(baseDamage * (1 + variance))
  }

  const fight = () => {
    if (!selectedCat || !selectedTournament || tournamentComplete) return

    const enemy = { ...selectedTournament.enemies[currentFight] }
    let catHealth = selectedCat.currentHealth
    let enemyHealth = enemy.health
    const newLog: string[] = []

    newLog.push(`🥊 ${selectedCat.name} vs ${enemy.name} (${enemy.emoji})`)
    
    // Определяем порядок хода по скорости
    const catGoesFirst = selectedCat.currentSpeed >= enemy.speed

    while (catHealth > 0 && enemyHealth > 0) {
      if (catGoesFirst) {
        // Ход кота
        const damage = calculateDamage(selectedCat, enemy)
        enemyHealth = Math.max(0, enemyHealth - damage)
        newLog.push(`💥 ${selectedCat.name}: ${damage} урона → ${enemy.name} (${enemyHealth}/${enemy.maxHealth} HP)`)
        
        if (enemyHealth <= 0) break
        
        // Ход врага
        const enemyDamage = calculateDamage(enemy, selectedCat)
        catHealth = Math.max(0, catHealth - enemyDamage)
        newLog.push(`💢 ${enemy.name}: ${enemyDamage} урона → ${selectedCat.name} (${catHealth}/${selectedCat.maxHealth} HP)`)
      } else {
        // Ход врага
        const enemyDamage = calculateDamage(enemy, selectedCat)
        catHealth = Math.max(0, catHealth - enemyDamage)
        newLog.push(`💢 ${enemy.name}: ${enemyDamage} урона → ${selectedCat.name} (${catHealth}/${selectedCat.maxHealth} HP)`)
        
        if (catHealth <= 0) break
        
        // Ход кота
        const damage = calculateDamage(selectedCat, enemy)
        enemyHealth = Math.max(0, enemyHealth - damage)
        newLog.push(`💥 ${selectedCat.name}: ${damage} урона → ${enemy.name} (${enemyHealth}/${enemy.maxHealth} HP)`)
      }
    }

    if (catHealth > 0) {
      // Победа
      newLog.push(`🎉 ${selectedCat.name} побеждает! +${enemy.reward} монет, +${enemy.experience} опыта`)
      onCatExperience(selectedCat.id, enemy.experience)
      
      if (currentFight < selectedTournament.enemies.length - 1) {
        // Следующий бой
        setCurrentFight(currentFight + 1)
        newLog.push(`⚡ Следующий противник...`)
      } else {
        // Турнир завершён
        newLog.push(`👑 ТУРНИР ЗАВЕРШЁН! Финальная награда: +${selectedTournament.finalReward} монет!`)
        onTournamentWin(selectedTournament.finalReward + selectedTournament.enemies.reduce((sum, e) => sum + e.reward, 0), 
                        selectedTournament.enemies.reduce((sum, e) => sum + e.experience, 0))
        setTournamentComplete(true)
      }
      setFightResult('win')
    } else {
      // Поражение
      newLog.push(`💀 ${selectedCat.name} побеждён! Турнир окончен.`)
      setFightResult('lose')
      setTournamentComplete(true)
    }

    setBattleLog(prev => [...prev, ...newLog])
  }

  const startTournament = () => {
    if (!selectedCat || !selectedTournament) return
    setIsInTournament(true)
    setCurrentFight(0)
    setBattleLog([])
    setFightResult(null)
    setTournamentComplete(false)
  }

  const resetTournament = () => {
    setIsInTournament(false)
    setSelectedTournament(null)
    setSelectedCat(null)
    setCurrentFight(0)
    setBattleLog([])
    setFightResult(null)
    setTournamentComplete(false)
  }

  const autoFight = () => {
    setIsAutoFighting(true)
    const fightInterval = setInterval(() => {
      fight()
      if (fightResult === 'lose' || tournamentComplete) {
        setIsAutoFighting(false)
        clearInterval(fightInterval)
      }
    }, 2000)
  }

  useEffect(() => {
    if (tournamentComplete) {
      setIsAutoFighting(false)
    }
  }, [tournamentComplete])

  if (isInTournament && selectedTournament && selectedCat) {
    const currentEnemy = selectedTournament.enemies[currentFight]
    const progress = ((currentFight + (fightResult === 'win' ? 1 : 0)) / selectedTournament.enemies.length) * 100

    return (
      <div className="space-y-6">
        {/* Заголовок турнира */}
        <Card className={`bg-gradient-to-r ${selectedTournament.color} text-white`}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <span className="text-3xl">{selectedTournament.emoji}</span>
              {selectedTournament.name}
            </CardTitle>
            <Progress value={progress} className="bg-white/20" />
            <p className="opacity-90">
              Бой {currentFight + 1} из {selectedTournament.enemies.length}
              {!tournamentComplete && ` • Текущий противник: ${currentEnemy?.name}`}
            </p>
          </CardHeader>
        </Card>

        {/* Боевая арена */}
        {!tournamentComplete && currentEnemy && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Бойцовская Арена</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Кот игрока */}
                <div className="text-center space-y-2">
                  <div className="text-4xl">{selectedCat.emoji}</div>
                  <h3 className="font-semibold">{selectedCat.name}</h3>
                  <div className="text-sm text-gray-600">Уровень {selectedCat.level}</div>
                  <div className="text-xs space-y-1">
                    <div>⚔️ {selectedCat.currentAttack} 🛡️ {selectedCat.currentDefense}</div>
                    <div>❤️ {selectedCat.currentHealth} ⚡ {selectedCat.currentSpeed}</div>
                  </div>
                </div>

                <div className="flex items-center justify-center text-2xl">VS</div>

                {/* Противник */}
                <div className="text-center space-y-2">
                  <div className="text-4xl">{currentEnemy.emoji}</div>
                  <h3 className="font-semibold">{currentEnemy.name}</h3>
                  <div className="text-sm text-gray-600">Уровень {currentEnemy.level}</div>
                  <div className="text-xs space-y-1">
                    <div>⚔️ {currentEnemy.attack} 🛡️ {currentEnemy.defense}</div>
                    <div>❤️ {currentEnemy.health} ⚡ {currentEnemy.speed}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button 
                  onClick={fight} 
                  disabled={isAutoFighting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Icon name="Sword" size={16} />
                  Атаковать
                </Button>
                <Button 
                  onClick={autoFight}
                  disabled={isAutoFighting}
                  variant="outline"
                >
                  <Icon name="Play" size={16} />
                  Авто-бой
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Результат турнира */}
        {tournamentComplete && (
          <Card className={fightResult === 'win' ? 'border-green-500' : 'border-red-500'}>
            <CardContent className="text-center py-8">
              {fightResult === 'win' ? (
                <div className="space-y-4">
                  <div className="text-6xl">🏆</div>
                  <h2 className="text-2xl font-bold text-green-600">Турнир завершён!</h2>
                  <p className="text-lg">
                    {selectedCat.name} — новый чемпион {selectedTournament.name}!
                  </p>
                  <div className="text-xl">
                    💰 Общая награда: {selectedTournament.finalReward + selectedTournament.enemies.reduce((sum, e) => sum + e.reward, 0)} монет
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-6xl">💀</div>
                  <h2 className="text-2xl font-bold text-red-600">Турнир провален</h2>
                  <p className="text-lg">
                    {selectedCat.name} не смог пройти {selectedTournament.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Пройдено боёв: {currentFight} из {selectedTournament.enemies.length}
                  </p>
                </div>
              )}
              <Button onClick={resetTournament} className="mt-4">
                <Icon name="RotateCcw" size={16} />
                Вернуться к турнирам
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Лог боя */}
        {battleLog.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="ScrollText" size={20} />
                Лог турнира
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto space-y-1">
                {battleLog.map((log, index) => (
                  <div key={index}>{log}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">🏆 Космические Турниры</h1>
        <p className="text-gray-600">Проходи серию боёв и получай крутые награды!</p>
      </div>

      {/* Выбор кота */}
      {!selectedCat && (
        <Card>
          <CardHeader>
            <CardTitle>Выбери кота-бойца</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ownedCats.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">
                  У тебя нет котов для турниров
                </p>
              ) : (
                ownedCats.map((cat) => (
                  <Button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat)}
                    variant="outline"
                    className="h-auto flex-col p-4 space-y-2"
                  >
                    <div className="text-3xl">{cat.emoji}</div>
                    <div className="font-semibold">{cat.name}</div>
                    <div className="text-sm text-gray-600">Ур. {cat.level}</div>
                    <div className="text-xs">
                      ⚔️{cat.currentAttack} 🛡️{cat.currentDefense} ❤️{cat.currentHealth} ⚡{cat.currentSpeed}
                    </div>
                  </Button>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Выбор турнира */}
      {selectedCat && !selectedTournament && (
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{selectedCat.emoji}</div>
                  <div>
                    <div className="font-semibold">{selectedCat.name}</div>
                    <div className="text-sm text-gray-600">Уровень {selectedCat.level}</div>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setSelectedCat(null)}>
                  Сменить кота
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Доступные турниры</h2>
            {tournaments.map((tournament) => {
              const canEnter = selectedCat.level >= tournament.requiredLevel
              
              return (
                <Card 
                  key={tournament.name}
                  className={`cursor-pointer transition-all ${
                    canEnter 
                      ? 'hover:shadow-lg border-2 border-transparent hover:border-blue-500' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => canEnter && setSelectedTournament(tournament)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{tournament.emoji}</div>
                        <div>
                          <h3 className="text-lg font-semibold">{tournament.name}</h3>
                          <p className="text-sm text-gray-600">{tournament.description}</p>
                          <div className="flex items-center gap-4 text-sm mt-1">
                            <span className="text-red-600">
                              Требуется уровень {tournament.requiredLevel}
                            </span>
                            <span className="text-yellow-600">
                              💰 Финальная награда: {tournament.finalReward}
                            </span>
                          </div>
                        </div>
                      </div>
                      {canEnter ? (
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedTournament(tournament)
                          }}
                          className={`bg-gradient-to-r ${tournament.color} text-white`}
                        >
                          Войти в турнир
                        </Button>
                      ) : (
                        <div className="text-red-500 font-semibold">Заблокировано</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Подтверждение турнира */}
      {selectedTournament && selectedCat && !isInTournament && (
        <Card className={`bg-gradient-to-r ${selectedTournament.color} text-white`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-3xl">{selectedTournament.emoji}</span>
              {selectedTournament.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-lg">{selectedTournament.description}</p>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Противники:</h4>
                {selectedTournament.enemies.map((enemy, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/20 rounded p-2">
                    <div className="flex items-center gap-2">
                      <span>{enemy.emoji}</span>
                      <span>{enemy.name}</span>
                      <span className="text-sm opacity-75">(Ур. {enemy.level})</span>
                    </div>
                    <div className="text-sm">
                      💰 {enemy.reward} + ⭐ {enemy.experience}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/20 rounded p-3">
                <div className="text-lg font-semibold">
                  🏆 Финальная награда: {selectedTournament.finalReward} монет
                </div>
                <div className="text-sm opacity-90">
                  Общая награда: {selectedTournament.finalReward + selectedTournament.enemies.reduce((sum, e) => sum + e.reward, 0)} монет
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={startTournament}
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  <Icon name="Play" size={20} />
                  Начать турнир
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedTournament(null)}
                  className="border-white text-white hover:bg-white/20"
                >
                  Назад
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}