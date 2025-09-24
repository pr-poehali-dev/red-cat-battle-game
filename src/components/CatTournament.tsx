import { useState } from 'react'
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
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null)
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [isInTournament, setIsInTournament] = useState(false)
  const [showRankings, setShowRankings] = useState(false)

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