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
    
    // Проверяем спецспособность Кота Пыль
    const activeCat = gameStats.ownedCats?.find(cat => cat.id === gameStats.activeCatId)
    const isDustCat = activeCat?.id === 'dust-cat'
    const canUseSpecial = isDustCat && activeCat?.hasSpecialAbility
    const now = Date.now()
    const cooldownTime = 30000 // 30 секунд
    const isOnCooldown = activeCat?.specialAbilityLastUsed && (now - activeCat.specialAbilityLastUsed) < cooldownTime
    
    // Случайный шанс 15% активации спецспособности
    const shouldActivateSpecial = canUseSpecial && !isOnCooldown && Math.random() < 0.15
    
    setIsAttacking(true)
    setTimeout(() => setIsAttacking(false), shouldActivateSpecial ? 500 : 200)
    
    // Тратим энергию и запускаем таймер если энергия закончилась
    setGameStats(prev => {
      const newEnergy = prev.energy - 1
      const energyRechargeTime = newEnergy === 0 ? Date.now() : prev.energyRechargeTime
      
      // Проверяем, есть ли активный премиум майнер
      const activeCat = prev.ownedCats?.find(cat => cat.id === prev.activeCatId)
      let updatedCats = prev.ownedCats || []
      let premiumCoinsEarned = 0
      
      if (activeCat?.isPremiumMiner) {
        const energyCost = activeCat.premiumMiningEnergyCost || 3000
        const currentSpent = (activeCat.premiumEnergySpent || 0) + 1
        
        // Если набрали нужное количество энергии, даём премиум монету
        if (currentSpent >= energyCost) {
          premiumCoinsEarned = 1
          updatedCats = updatedCats.map(cat => 
            cat.id === activeCat.id 
              ? { ...cat, premiumEnergySpent: 0 }
              : cat
          )
        } else {
          updatedCats = updatedCats.map(cat => 
            cat.id === activeCat.id 
              ? { ...cat, premiumEnergySpent: currentSpent }
              : cat
          )
        }
      }
      
      return {
        ...prev,
        energy: newEnergy,
        energyRechargeTime,
        ownedCats: updatedCats,
        premiumCoins: (prev.premiumCoins || 0) + premiumCoinsEarned
      }
    })
    
    // Играем звук атаки
    audioSystem.playAttackSound()
    
    // Урон и частицы в зависимости от спецспособности
    const baseDamage = gameStats.clickDamage
    const actualDamage = shouldActivateSpecial ? baseDamage * 5 : baseDamage
    const particleCount = shouldActivateSpecial ? 24 : 8

    // Add damage number animation
    const damageId = Date.now()
    setDamageNumbers(prev => [...prev, {
      id: damageId,
      damage: actualDamage,
      x,
      y,
      isSpecial: shouldActivateSpecial
    }])

    // Create energy particles explosion
    const particleColors = shouldActivateSpecial 
      ? ['#00FFFF', '#00D4FF', '#0099FF', '#66FFFF', '#99FFFF'] // Cyan colors for special
      : ['#06B6D4', '#8B5CF6', '#EC4899', '#FBBF24', '#6366F1']
    
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x: x,
      y: y,
      angle: (360 / particleCount) * i,
      color: particleColors[Math.floor(Math.random() * particleColors.length)]
    }))
    
    setEnergyParticles(prev => [...prev, ...particles])

    // Обновляем cooldown если использовали спецспособность
    if (shouldActivateSpecial) {
      setGameStats(prev => ({
        ...prev,
        ownedCats: (prev.ownedCats || []).map(cat => 
          cat.id === 'dust-cat' 
            ? { ...cat, specialAbilityLastUsed: Date.now() }
            : cat
        )
      }))
    }

    // Remove animations after timeout
    setTimeout(() => {
      setDamageNumbers(prev => prev.filter(d => d.id !== damageId))
      setEnergyParticles(prev => prev.filter(p => !particles.find(particle => particle.id === p.id)))
    }, 1000)

    // Deal damage to enemy
    const newHealth = Math.max(0, currentEnemy.health - actualDamage)
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

  const handleRestoreEnergy = () => {
    const RESTORE_COST = 15000
    
    if (gameStats.coins >= RESTORE_COST && gameStats.energy < gameStats.maxEnergy) {
      audioSystem.playLevelUpSound()
      
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins - RESTORE_COST,
        energy: prev.maxEnergy,
        energyRechargeTime: undefined
      }))
    }
  }

  const handleIncreaseMaxEnergy = () => {
    const INCREASE_COST = 5000
    const ENERGY_INCREASE = 100
    
    if (gameStats.coins >= INCREASE_COST) {
      audioSystem.playLevelUpSound()
      
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins - INCREASE_COST,
        maxEnergy: prev.maxEnergy + ENERGY_INCREASE,
        energy: prev.energy + ENERGY_INCREASE
      }))
    }
  }

  return {
    handleCatClick,
    handleBattleWin,
    handleCatExperience,
    handleRestoreEnergy,
    handleIncreaseMaxEnergy
  }
}