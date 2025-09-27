import React, { useEffect } from 'react'
import { GameStats, Upgrade } from '@/types/game'
import type { AudioSystem } from '@/hooks/useAudioSystem'

interface GameLogicProps {
  gameStats: GameStats
  audioSystem: AudioSystem
  setGameStats: React.Dispatch<React.SetStateAction<GameStats>>
  setIsMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export function GameLogic({ 
  gameStats, 
  audioSystem, 
  setGameStats, 
  setIsMusicPlaying 
}: GameLogicProps) {
  
  // Level up system
  useEffect(() => {
    if (gameStats.experience >= gameStats.maxExperience) {
      // Играем звук левел-апа
      audioSystem.playLevelUpSound()
      
      setGameStats(prev => ({
        ...prev,
        level: prev.level + 1,
        experience: prev.experience - prev.maxExperience,
        maxExperience: Math.floor(prev.maxExperience * 1.5),
        power: prev.power + 50,
        clickDamage: prev.clickDamage + 5
      }))
    }
  }, [gameStats.experience, gameStats.maxExperience, audioSystem, setGameStats])

  // Система восстановления энергии
  useEffect(() => {
    const interval = setInterval(() => {
      setGameStats(prev => {
        const now = Date.now()
        
        // Если энергия на максимуме или нет времени зарядки, ничего не делаем
        if (prev.energy >= prev.maxEnergy || !prev.energyRechargeTime) {
          return prev
        }
        
        // Время зарядки 3 часа = 3 * 60 * 60 * 1000 = 10800000 мс
        const rechargeTime = 3 * 60 * 60 * 1000
        const timeElapsed = now - prev.energyRechargeTime
        
        // Если прошло 3 часа, восстанавливаем энергию
        if (timeElapsed >= rechargeTime) {
          return {
            ...prev,
            energy: prev.maxEnergy,
            energyRechargeTime: null
          }
        }
        
        return prev
      })
    }, 1000) // Проверяем каждую секунду
    
    return () => clearInterval(interval)
  }, [setGameStats])

  // Автозапуск фоновой музыки при первом взаимодействии
  useEffect(() => {
    const startMusic = () => {
      audioSystem.backgroundMusic.start()
      setIsMusicPlaying(true)
      document.removeEventListener('click', startMusic)
    }
    
    document.addEventListener('click', startMusic)
    
    return () => {
      document.removeEventListener('click', startMusic)
    }
  }, [audioSystem, setIsMusicPlaying])

  return null // Этот компонент только для логики
}

// Данные улучшений
export const UPGRADES: Upgrade[] = [
  { name: 'Острые Когти', cost: 50, powerIncrease: 25, description: 'Увеличивает урон на 5' },
  { name: 'Быстрые Лапы', cost: 100, powerIncrease: 50, description: 'Увеличивает скорость атаки' },
  { name: 'Железные Мускулы', cost: 200, powerIncrease: 100, description: 'Удваивает урон' }
]

// Функции управления улучшениями
export const useUpgradeActions = (
  gameStats: GameStats,
  audioSystem: AudioSystem,
  setGameStats: React.Dispatch<React.SetStateAction<GameStats>>
) => {
  
  const handleUpgrade = (upgrade: Upgrade) => {
    if (gameStats.coins >= upgrade.cost) {
      // Играем звук покупки улучшения
      audioSystem.playUpgradeSound()
      
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins - upgrade.cost,
        power: prev.power + upgrade.powerIncrease,
        clickDamage: prev.clickDamage + 5
      }))
    }
  }

  const handleStartTournament = () => {
    audioSystem.playUpgradeSound()
  }

  return {
    handleUpgrade,
    handleStartTournament
  }
}