import { useState } from 'react'
import type { Cat } from '@/types/game'
import type { Tournament } from './tournament/TournamentTypes'
import CatSelector from './tournament/CatSelector'
import TournamentSelector from './tournament/TournamentSelector'
import TournamentPreview from './tournament/TournamentPreview'
import TournamentArena from './tournament/TournamentArena'

interface CatTournamentProps {
  ownedCats: Cat[]
  playerCoins: number
  onTournamentWin: (reward: number, experience: number) => void
  onCatExperience: (catId: string, experience: number) => void
}

export default function CatTournament({ ownedCats, playerCoins, onTournamentWin, onCatExperience }: CatTournamentProps) {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null)
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [isInTournament, setIsInTournament] = useState(false)

  const startTournament = () => {
    if (!selectedCat || !selectedTournament) return
    setIsInTournament(true)
  }

  const resetTournament = () => {
    setIsInTournament(false)
    setSelectedTournament(null)
    setSelectedCat(null)
  }

  // Если в турнире - показываем арену
  if (isInTournament && selectedTournament && selectedCat) {
    return (
      <TournamentArena
        tournament={selectedTournament}
        selectedCat={selectedCat}
        onTournamentWin={onTournamentWin}
        onCatExperience={onCatExperience}
        onReset={resetTournament}
      />
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