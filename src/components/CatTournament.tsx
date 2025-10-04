import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import type { Cat } from '@/types/game'
import type { Tournament } from './tournament/TournamentTypes'
import type { PlayerStats } from './tournament/RankingSystem'
import CatSelector from './tournament/CatSelector'
import TournamentSelector from './tournament/TournamentSelector'
import TournamentPreview from './tournament/TournamentPreview'
import TournamentArena from './tournament/TournamentArena'
import RankingSystem from './tournament/RankingSystem'
import SeasonalTournament from './tournament/SeasonalTournament'

interface CatTournamentProps {
  ownedCats: Cat[]
  playerCoins: number
  playerStats: PlayerStats
  playerName: string
  onTournamentWin: (reward: number, experience: number) => void
  onCatExperience: (catId: string, experience: number) => void
  onUpdateStats: (updates: Partial<PlayerStats>) => void
}

export default function CatTournament({ ownedCats, playerCoins, playerStats, playerName, onTournamentWin, onCatExperience, onUpdateStats }: CatTournamentProps) {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(() => {
    const saved = localStorage.getItem('tournamentProgress')
    if (saved) {
      const progress = JSON.parse(saved)
      return progress.selectedCat || null
    }
    return null
  })
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(() => {
    const saved = localStorage.getItem('tournamentProgress')
    if (saved) {
      const progress = JSON.parse(saved)
      return progress.selectedTournament || null
    }
    return null
  })
  const [isInTournament, setIsInTournament] = useState(() => {
    const saved = localStorage.getItem('tournamentProgress')
    if (saved) {
      const progress = JSON.parse(saved)
      return progress.isInTournament || false
    }
    return false
  })
  const [showRankings, setShowRankings] = useState(false)
  const [showSeasonal, setShowSeasonal] = useState(false)
  
  useEffect(() => {
    if (selectedCat || selectedTournament || isInTournament) {
      localStorage.setItem('tournamentProgress', JSON.stringify({
        selectedCat,
        selectedTournament,
        isInTournament
      }))
    } else {
      localStorage.removeItem('tournamentProgress')
    }
  }, [selectedCat, selectedTournament, isInTournament])

  const startTournament = () => {
    if (!selectedCat || !selectedTournament) return
    setIsInTournament(true)
  }

  const resetTournament = () => {
    setIsInTournament(false)
    setSelectedTournament(null)
    setSelectedCat(null)
  }

  const handleRankPointsGain = (points: number) => {
    onUpdateStats({
      currentRankPoints: playerStats.currentRankPoints + points
    })
  }

  const handleTournamentComplete = (reward: number, experience: number, won: boolean) => {
    onTournamentWin(reward, experience)
    
    const newStreak = won ? playerStats.currentWinStreak + 1 : 0
    onUpdateStats({
      totalTournaments: playerStats.totalTournaments + 1,
      tournamentsWon: playerStats.tournamentsWon + (won ? 1 : 0),
      totalCoinsEarned: playerStats.totalCoinsEarned + reward,
      currentWinStreak: newStreak,
      longestWinStreak: Math.max(playerStats.longestWinStreak, newStreak)
    })
    
    const currentStats = JSON.parse(localStorage.getItem('tournamentStats') || '{"wins":0,"losses":0,"rating":1000}')
    if (won) {
      currentStats.wins += 1
      currentStats.rating += 50
    } else {
      currentStats.losses += 1
      currentStats.rating = Math.max(0, currentStats.rating - 25)
    }
    localStorage.setItem('tournamentStats', JSON.stringify(currentStats))
  }

  const handleSeasonalReward = (reward: any) => {
    if (reward.type === 'cat') {
      // Добавляем нового кота (логика добавления должна быть в родительском компоненте)
      console.log('Получен новый кот:', reward.value)
    } else if (reward.type === 'coins') {
      onTournamentWin(reward.value, 0)
    }
    // Другие типы наград можно обработать позже
  }

  // Показываем систему рангов
  if (showRankings) {
    return (
      <RankingSystem
        playerStats={playerStats}
        playerName={playerName}
        onBack={() => setShowRankings(false)}
      />
    )
  }

  // Показываем сезонные турниры
  if (showSeasonal) {
    return (
      <div>
        <Button 
          onClick={() => setShowSeasonal(false)}
          className="mb-4"
          variant="outline"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад к турнирам
        </Button>
        <SeasonalTournament
          ownedCats={ownedCats}
          playerCoins={playerCoins}
          onTournamentWin={onTournamentWin}
          onRewardEarned={handleSeasonalReward}
        />
      </div>
    )
  }

  // Если в турнире - показываем арену
  if (isInTournament && selectedTournament && selectedCat) {
    return (
      <TournamentArena
        tournament={selectedTournament}
        selectedCat={selectedCat}
        onTournamentWin={(reward, exp) => handleTournamentComplete(reward, exp, true)}
        onCatExperience={onCatExperience}
        onRankPointsGain={handleRankPointsGain}
        onReset={resetTournament}
        onTournamentComplete={(won) => {
          if (!won) handleTournamentComplete(0, 0, false)
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-between mb-4">
          <div></div>
          <div>
            <h1 className="text-3xl font-bold mb-2">🏆 Космические Турниры</h1>
            <p className="text-gray-600">Проходи серию боёв и получай крутые награды!</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowSeasonal(true)}
              variant="outline"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500"
            >
              <Icon name="Star" size={16} />
              Сезонные
            </Button>
            <Button
              onClick={() => setShowRankings(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Icon name="Award" size={16} />
              Ранги
            </Button>
          </div>
        </div>
      </div>

      {/* Выбор кота */}
      {!selectedCat && (
        <CatSelector
          ownedCats={ownedCats}
          onSelectCat={setSelectedCat}
        />
      )}

      {/* Выбор турнира */}
      {selectedCat && !selectedTournament && (
        <TournamentSelector
          selectedCat={selectedCat}
          onSelectTournament={setSelectedTournament}
          onResetCat={() => setSelectedCat(null)}
        />
      )}

      {/* Подтверждение турнира */}
      {selectedTournament && selectedCat && !isInTournament && (
        <TournamentPreview
          tournament={selectedTournament}
          selectedCat={selectedCat}
          onStartTournament={startTournament}
          onBackToSelection={() => setSelectedTournament(null)}
        />
      )}
    </div>
  )
}