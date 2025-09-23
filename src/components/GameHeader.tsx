import React from 'react'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { GameStats } from '@/types/game'

interface GameHeaderProps {
  gameStats: GameStats
  isMusicPlaying: boolean
  onToggleMusic: () => void
}

const GameHeader: React.FC<GameHeaderProps> = ({ gameStats, isMusicPlaying, onToggleMusic }) => {
  return (
    <div className="bg-space-darker/80 backdrop-blur-md border-b border-cosmic-purple/30 text-white p-4 shadow-2xl shadow-cosmic-purple/20">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="text-center">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cosmic-cyan to-cosmic-pink font-cosmic animate-glow">
            CAT KOMBAT
          </h1>
        </div>
        <div className="flex gap-4 text-sm items-center">
          <div className="flex items-center gap-1">
            <Icon name="Coins" size={16} className="text-star-glow animate-pulse" />
            <span className="font-bold">{gameStats.coins}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Zap" size={16} className="text-cosmic-cyan animate-pulse" />
            <span className="font-bold">{gameStats.power}</span>
          </div>
          <Button
            onClick={onToggleMusic}
            variant="ghost"
            size="sm"
            className="p-1 h-6 w-6 hover:bg-cosmic-purple/30"
          >
            <Icon 
              name={isMusicPlaying ? "Volume2" : "VolumeX"} 
              size={14} 
              className="text-cosmic-cyan"
            />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GameHeader