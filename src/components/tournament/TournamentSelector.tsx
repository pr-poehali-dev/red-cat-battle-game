import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Cat } from '@/types/game'
import type { Tournament } from './TournamentTypes'
import { tournaments } from './TournamentTypes'

interface TournamentSelectorProps {
  selectedCat: Cat
  onSelectTournament: (tournament: Tournament) => void
  onResetCat: () => void
}

export default function TournamentSelector({ selectedCat, onSelectTournament, onResetCat }: TournamentSelectorProps) {
  return (
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
            <Button variant="outline" onClick={onResetCat}>
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
              onClick={() => canEnter && onSelectTournament(tournament)}
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
                        onSelectTournament(tournament)
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
  )
}