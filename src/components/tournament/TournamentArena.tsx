import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import type { Cat } from '@/types/game'
import type { Tournament } from './TournamentTypes'

interface TournamentArenaProps {
  tournament: Tournament
  selectedCat: Cat
  onTournamentWin: (reward: number, experience: number) => void
  onCatExperience: (catId: string, experience: number) => void
  onReset: () => void
}

export default function TournamentArena({ tournament, selectedCat, onTournamentWin, onCatExperience, onReset }: TournamentArenaProps) {
  const [currentFight, setCurrentFight] = useState(0)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [isAutoFighting, setIsAutoFighting] = useState(false)
  const [fightResult, setFightResult] = useState<'win' | 'lose' | null>(null)
  const [tournamentComplete, setTournamentComplete] = useState(false)

  const calculateDamage = (attacker: any, defender: any): number => {
    const baseDamage = Math.max(1, attacker.attack - Math.floor(defender.defense / 2))
    const variance = Math.random() * 0.4 - 0.2 // ±20% вариация
    return Math.floor(baseDamage * (1 + variance))
  }

  const fight = () => {
    if (!selectedCat || !tournament || tournamentComplete) return

    const enemy = { ...tournament.enemies[currentFight] }
    let catHealth = selectedCat.currentHealth
    let enemyHealth = enemy.health
    const newLog: string[] = []

    newLog.push(`🥊 ${selectedCat.name} vs ${enemy.name} (${enemy.emoji})`)
    
    const catGoesFirst = selectedCat.currentSpeed >= enemy.speed

    while (catHealth > 0 && enemyHealth > 0) {
      if (catGoesFirst) {
        const damage = calculateDamage(selectedCat, enemy)
        enemyHealth = Math.max(0, enemyHealth - damage)
        newLog.push(`💥 ${selectedCat.name}: ${damage} урона → ${enemy.name} (${enemyHealth}/${enemy.maxHealth} HP)`)
        
        if (enemyHealth <= 0) break
        
        const enemyDamage = calculateDamage(enemy, selectedCat)
        catHealth = Math.max(0, catHealth - enemyDamage)
        newLog.push(`💢 ${enemy.name}: ${enemyDamage} урона → ${selectedCat.name} (${catHealth}/${selectedCat.maxHealth} HP)`)
      } else {
        const enemyDamage = calculateDamage(enemy, selectedCat)
        catHealth = Math.max(0, catHealth - enemyDamage)
        newLog.push(`💢 ${enemy.name}: ${enemyDamage} урона → ${selectedCat.name} (${catHealth}/${selectedCat.maxHealth} HP)`)
        
        if (catHealth <= 0) break
        
        const damage = calculateDamage(selectedCat, enemy)
        enemyHealth = Math.max(0, enemyHealth - damage)
        newLog.push(`💥 ${selectedCat.name}: ${damage} урона → ${enemy.name} (${enemyHealth}/${enemy.maxHealth} HP)`)
      }
    }

    if (catHealth > 0) {
      newLog.push(`🎉 ${selectedCat.name} побеждает! +${enemy.reward} монет, +${enemy.experience} опыта`)
      onCatExperience(selectedCat.id, enemy.experience)
      
      if (currentFight < tournament.enemies.length - 1) {
        setCurrentFight(currentFight + 1)
        newLog.push(`⚡ Следующий противник...`)
      } else {
        newLog.push(`👑 ТУРНИР ЗАВЕРШЁН! Финальная награда: +${tournament.finalReward} монет!`)
        onTournamentWin(tournament.finalReward + tournament.enemies.reduce((sum, e) => sum + e.reward, 0), 
                        tournament.enemies.reduce((sum, e) => sum + e.experience, 0))
        setTournamentComplete(true)
      }
      setFightResult('win')
    } else {
      newLog.push(`💀 ${selectedCat.name} побеждён! Турнир окончен.`)
      setFightResult('lose')
      setTournamentComplete(true)
    }

    setBattleLog(prev => [...prev, ...newLog])
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

  const currentEnemy = tournament.enemies[currentFight]
  const progress = ((currentFight + (fightResult === 'win' ? 1 : 0)) / tournament.enemies.length) * 100

  return (
    <div className="space-y-6">
      {/* Заголовок турнира */}
      <Card className={`bg-gradient-to-r ${tournament.color} text-white`}>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <span className="text-3xl">{tournament.emoji}</span>
            {tournament.name}
          </CardTitle>
          <Progress value={progress} className="bg-white/20" />
          <p className="opacity-90">
            Бой {currentFight + 1} из {tournament.enemies.length}
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
                  {selectedCat.name} — новый чемпион {tournament.name}!
                </p>
                <div className="text-xl">
                  💰 Общая награда: {tournament.finalReward + tournament.enemies.reduce((sum, e) => sum + e.reward, 0)} монет
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-6xl">💀</div>
                <h2 className="text-2xl font-bold text-red-600">Турнир провален</h2>
                <p className="text-lg">
                  {selectedCat.name} не смог пройти {tournament.name}
                </p>
                <p className="text-sm text-gray-600">
                  Пройдено боёв: {currentFight} из {tournament.enemies.length}
                </p>
              </div>
            )}
            <Button onClick={onReset} className="mt-4">
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