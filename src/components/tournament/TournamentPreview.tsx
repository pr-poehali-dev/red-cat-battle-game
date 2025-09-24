import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import type { Cat } from '@/types/game'
import type { Tournament } from './TournamentTypes'

interface TournamentPreviewProps {
  tournament: Tournament
  selectedCat: Cat
  onStartTournament: () => void
  onBackToSelection: () => void
}

export default function TournamentPreview({ tournament, selectedCat, onStartTournament, onBackToSelection }: TournamentPreviewProps) {
  return (
    <Card className={`bg-gradient-to-r ${tournament.color} text-white`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <span className="text-3xl">{tournament.emoji}</span>
          {tournament.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg">{tournament.description}</p>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Противники:</h4>
            {tournament.enemies.map((enemy, index) => (
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
              🏆 Финальная награда: {tournament.finalReward} монет
            </div>
            <div className="text-sm opacity-90">
              Общая награда: {tournament.finalReward + tournament.enemies.reduce((sum, e) => sum + e.reward, 0)} монет
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={onStartTournament}
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              <Icon name="Play" size={20} />
              Начать турнир
            </Button>
            <Button 
              variant="outline" 
              onClick={onBackToSelection}
              className="border-white text-white hover:bg-white/20"
            >
              Назад
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}