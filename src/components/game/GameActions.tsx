import { Enemy, DamageNumber, EnergyParticle, GameStats, Cat } from '@/types/game'
import type { AudioSystem } from '@/hooks/useAudioSystem'

interface GameActionsProps {
  gameStats: GameStats
  currentEnemy: Enemy
  audioSystem: AudioSystem
  setGameStats: React.Dispatch<React.SetStateAction<GameStats>>
  setCurrentEnemy: React.Dispatch<React.SetStateAction<Enemy>>
  setDamageNumbers: React.Dispatch<React.SetStateAction<DamageNumber[]>>
  setEnergyParticles: React.Dispatch<React.SetStateAction<EnergyParticle[]>>
  setIsAttacking: React.Dispatch<React.SetStateAction<boolean>>
  onBattleWin?: () => void
  onCoinsEarned?: (amount: number) => void
}

export const useGameActions = ({
  gameStats,
  currentEnemy,
  audioSystem,
  setGameStats,
  setCurrentEnemy,
  setDamageNumbers,
  setEnergyParticles,
  setIsAttacking,
  onBattleWin,
  onCoinsEarned
}: GameActionsProps) => {

  const handleCatClick = (event: React.MouseEvent) => {
    // Проверяем есть ли энергия
    if (gameStats.energy <= 0) {
      return // Не можем атаковать без энергии
    }
    
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    setIsAttacking(true)
    setTimeout(() => setIsAttacking(false), 200)
    
    // Тратим энергию и запускаем таймер если энергия закончилась
    setGameStats(prev => {
      const newEnergy = prev.energy - 1
      const energyRechargeTime = newEnergy === 0 ? Date.now() : prev.energyRechargeTime
      
      return {
        ...prev,
        energy: newEnergy,
        energyRechargeTime
      }
    })
    
    // Играем звук атаки
    audioSystem.playAttackSound()

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
      // Играем звук смерти врага и получения монет
      audioSystem.playEnemyDeathSound()
      setTimeout(() => audioSystem.playCoinSound(), 200)
      
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins + currentEnemy.reward,
        experience: prev.experience + 10
      }))
      
      // Уведомляем о победе и заработанных монетах для квестов
      if (onBattleWin) onBattleWin()
      if (onCoinsEarned) onCoinsEarned(currentEnemy.reward)
      
      // Spawn new enemy
      setTimeout(() => {
        setCurrentEnemy({
          name: 'Киборг-Собака',
          health: 50 + Math.floor(Math.random() * 30),
          maxHealth: 50 + Math.floor(Math.random() * 30),
          reward: 5 + Math.floor(Math.random() * 5)
        })
      }, 500)
    }
  }

  const handleBattleWin = (reward: number, experience: number) => {
    audioSystem.playLevelUpSound()
    
    setGameStats(prev => ({
      ...prev,
      coins: prev.coins + reward,
      experience: prev.experience + experience
    }))
  }

  const handleCatExperience = (catId: string, experience: number) => {
    setGameStats(prev => ({
      ...prev,
      ownedCats: (prev.ownedCats || []).map(cat => {
        if (cat.id === catId) {
          const newExp = cat.experience + experience
          let newLevel = cat.level
          let newMaxExp = cat.maxExperience
          let bonusStats = 0

          // Проверяем, повышается ли уровень
          if (newExp >= cat.maxExperience) {
            newLevel = cat.level + 1
            newMaxExp = Math.floor(cat.maxExperience * 1.2)
            bonusStats = 3 // Бонус за левел-ап в бою
          }

          return {
            ...cat,
            level: newLevel,
            experience: newExp >= cat.maxExperience ? newExp - cat.maxExperience : newExp,
            maxExperience: newMaxExp,
            currentAttack: cat.currentAttack + bonusStats,
            currentDefense: cat.currentDefense + bonusStats,
            currentHealth: cat.currentHealth + bonusStats,
            maxHealth: cat.maxHealth + bonusStats,
            currentSpeed: cat.currentSpeed + bonusStats,
            upgradePoints: cat.upgradePoints + (bonusStats > 0 ? 1 : 0)
          }
        }
        return cat
      })
    }))
  }

  return {
    handleCatClick,
    handleBattleWin,
    handleCatExperience
  }
}