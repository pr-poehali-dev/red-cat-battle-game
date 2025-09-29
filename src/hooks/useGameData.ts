import { useState, useEffect } from 'react'
import { GameStats } from '@/types/game'
import { useAuth } from './useAuth'
import { CAT_TEMPLATES } from '@/components/game/CatActions'

const GAMEDATA_API_URL = 'https://functions.poehali.dev/1a496de4-0b4a-41e6-9259-4674b347ed32'

interface UseGameDataReturn {
  gameStats: GameStats
  setGameStats: (stats: GameStats | ((prev: GameStats) => GameStats)) => void
  saveProgress: () => Promise<boolean>
  loadProgress: () => Promise<boolean>
  isLoading: boolean
  lastSaved: string | null
}

export function useGameData(): UseGameDataReturn {
  const { token, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  
  const [gameStats, setGameStatsState] = useState<GameStats>(() => {
    const saved = localStorage.getItem('catKombatGameStats')
    const starterCat = { ...CAT_TEMPLATES.murka, id: 'starter-murka' }
    const defaultStats = {
      level: 1,
      power: 100,
      coins: 0,
      experience: 0,
      maxExperience: 100,
      clickDamage: 10,
      energy: 200,
      maxEnergy: 200,
      energyRechargeTime: null,
      ownedCats: [starterCat],
      activeCatId: 'starter-murka'
    }
    
    if (saved) {
      const parsedStats = JSON.parse(saved)
      
      // Если у пользователя нет котов, даём стартового кота
      let ownedCats = parsedStats.ownedCats || []
      let activeCatId = parsedStats.activeCatId
      
      if (ownedCats.length === 0) {
        ownedCats = [starterCat]
        activeCatId = 'starter-murka'
      }
      
      // Добавляем новые поля если их нет в сохраненных данных
      return {
        ...defaultStats,
        ...parsedStats,
        energy: parsedStats.energy ?? 200,
        maxEnergy: parsedStats.maxEnergy ?? 200,
        energyRechargeTime: parsedStats.energyRechargeTime ?? null,
        ownedCats,
        activeCatId
      }
    }
    
    return defaultStats
  })

  const setGameStats = (stats: GameStats | ((prev: GameStats) => GameStats)) => {
    const newStats = typeof stats === 'function' ? stats(gameStats) : stats
    setGameStatsState(newStats)
    localStorage.setItem('catKombatGameStats', JSON.stringify(newStats))
  }

  const saveProgress = async (): Promise<boolean> => {
    if (!isAuthenticated || !token) {
      return false
    }

    try {
      setIsLoading(true)
      const response = await fetch(GAMEDATA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify({
          game_stats: {
            level: gameStats.level,
            power: gameStats.power,
            coins: gameStats.coins,
            experience: gameStats.experience,
            max_experience: gameStats.maxExperience,
            click_damage: gameStats.clickDamage,
            energy: gameStats.energy,
            max_energy: gameStats.maxEnergy,
            energy_recharge_time: gameStats.energyRechargeTime,
            owned_cats: gameStats.ownedCats || [],
            active_cat_id: gameStats.activeCatId
          }
        })
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        setLastSaved(data.savedAt || new Date().toISOString())
        return true
      } else {
        console.error('Save failed:', data.error)
        return false
      }
    } catch (error) {
      console.error('Save error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const loadProgress = async (): Promise<boolean> => {
    if (!isAuthenticated || !token) {
      return false
    }

    try {
      setIsLoading(true)
      const response = await fetch(GAMEDATA_API_URL, {
        method: 'GET',
        headers: {
          'X-Auth-Token': token
        }
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        const starterCat = { ...CAT_TEMPLATES.murka, id: 'starter-murka' }
        
        // Если у пользователя нет котов на сервере, даём стартового кота
        let ownedCats = data.gameStats.ownedCats || []
        let activeCatId = data.gameStats.activeCatId
        
        if (ownedCats.length === 0) {
          ownedCats = [starterCat]
          activeCatId = 'starter-murka'
        }
        
        const serverStats: GameStats = {
          level: data.gameStats.level,
          power: data.gameStats.power,
          coins: data.gameStats.coins,
          experience: data.gameStats.experience,
          maxExperience: data.gameStats.maxExperience,
          clickDamage: data.gameStats.clickDamage,
          energy: data.gameStats.energy ?? 200,
          maxEnergy: data.gameStats.maxEnergy ?? 200,
          energyRechargeTime: data.gameStats.energyRechargeTime ?? null,
          ownedCats,
          activeCatId
        }
        
        setGameStatsState(serverStats)
        localStorage.setItem('catKombatGameStats', JSON.stringify(serverStats))
        setLastSaved(data.gameStats.lastSaved)
        return true
      } else {
        console.error('Load failed:', data.error)
        return false
      }
    } catch (error) {
      console.error('Load error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-load progress when user authenticates
  useEffect(() => {
    if (isAuthenticated && token) {
      loadProgress()
    }
  }, [isAuthenticated, token])

  // Auto-save progress every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return

    const autoSaveInterval = setInterval(() => {
      saveProgress()
    }, 30000) // 30 seconds

    return () => clearInterval(autoSaveInterval)
  }, [isAuthenticated, gameStats])

  return {
    gameStats,
    setGameStats,
    saveProgress,
    loadProgress,
    isLoading,
    lastSaved
  }
}