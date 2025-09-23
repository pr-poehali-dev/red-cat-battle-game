import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

interface FightArenaProps {
  onStartTournament: () => void
}

const FightArena: React.FC<FightArenaProps> = ({ onStartTournament }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-space-dark/80 backdrop-blur-xl border border-cosmic-purple/50 shadow-xl shadow-cosmic-purple/30">
        <CardContent className="p-6 text-center">
          <Icon name="Sword" size={48} className="text-cosmic-cyan mx-auto mb-4 animate-float" />
          <h2 className="text-2xl font-bold mb-4 text-white font-cosmic">
            Арена Боёв
          </h2>
          <p className="text-gray-300 mb-6">
            Сражайтесь с врагами и получайте награды!
          </p>
          <Button 
            onClick={onStartTournament}
            className="w-full bg-gradient-to-r from-cosmic-purple to-cosmic-pink hover:from-cosmic-pink hover:to-cosmic-purple text-white font-bold py-3 border border-cosmic-cyan/50 shadow-lg shadow-cosmic-purple/50 transition-all duration-300"
          >
            Начать Турнир
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-space-dark/80 backdrop-blur-xl border border-cosmic-purple/50 shadow-xl shadow-cosmic-purple/30">
        <CardContent className="p-4">
          <h3 className="font-bold mb-4 text-white">Статистика боёв</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-300">Побед:</span>
              <span className="font-bold text-cosmic-cyan">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Поражений:</span>
              <span className="font-bold text-cosmic-pink">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Рейтинг:</span>
              <span className="font-bold text-star-glow">1000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FightArena