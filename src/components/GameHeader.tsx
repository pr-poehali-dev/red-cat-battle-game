import React from 'react'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { GameStats } from '@/types/game'
import { useAuth } from '@/hooks/useAuth'
import SaveIndicator from '@/components/SaveIndicator'

interface GameHeaderProps {
  gameStats: GameStats
  isMusicPlaying: boolean
  onToggleMusic: () => void
  lastSaved?: string | null
  onManualSave?: () => void
  isSaving?: boolean
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  gameStats, 
  isMusicPlaying, 
  onToggleMusic, 
  lastSaved, 
  onManualSave, 
  isSaving 
}) => {
  const { user, logout } = useAuth()
  
  return (
    <div className="bg-space-darker/80 backdrop-blur-md border-b border-cosmic-purple/30 text-white p-4 shadow-2xl shadow-cosmic-purple/20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
        <div className="text-center">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cosmic-cyan to-cosmic-pink font-cosmic animate-glow">
            CAT KOMBAT
          </h1>
        </div>
        <div className="flex gap-2 text-sm items-center">
          <div className="text-xs">
            <div className="text-cosmic-cyan font-bold">{user?.username}</div>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Coins" size={14} className="text-star-glow animate-pulse" />
            <span className="font-bold text-xs">{gameStats.coins}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Zap" size={14} className="text-cosmic-cyan animate-pulse" />
            <span className="font-bold text-xs">{gameStats.power}</span>
          </div>
          <Button
            onClick={onToggleMusic}
            variant="ghost"
            size="sm"
            className="p-1 h-6 w-6 hover:bg-cosmic-purple/30"
          >
            <Icon 
              name={isMusicPlaying ? "Volume2" : "VolumeX"} 
              size={12} 
              className="text-cosmic-cyan"
            />
          </Button>
          <Button
            onClick={logout}
            variant="ghost"
            size="sm"
            className="p-1 h-6 w-6 hover:bg-red-500/30"
          >
            <Icon 
              name="LogOut" 
              size={12} 
              className="text-red-400"
            />
          </Button>
        </div>
        
        {/* Save Indicator */}
        <div className="flex justify-center">
          <SaveIndicator 
            lastSaved={lastSaved} 
            onManualSave={onManualSave}
            isLoading={isSaving}
          />
        </div>
      </div>
    </div>
  )
}

export default GameHeader