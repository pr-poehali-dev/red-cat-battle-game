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
  onProfileClick?: () => void
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  gameStats, 
  isMusicPlaying, 
  onToggleMusic, 
  lastSaved, 
  onManualSave, 
  isSaving,
  onProfileClick 
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
            <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-lg border border-yellow-500/30">
              <Icon name="Coins" size={14} className="text-yellow-400 animate-pulse" />
              <span className="font-bold text-xs text-yellow-300">{gameStats.coins}</span>
            </div>
            
            <div className="flex items-center gap-1 bg-purple-500/20 px-2 py-1 rounded-lg border border-purple-500/30 relative group">
              <img 
                src="/img/448a4b3f-b7da-4ef7-a5b5-ba81e92ce674.jpg" 
                alt="Premium Coin"
                className="w-4 h-4 rounded-full shadow-lg shadow-purple-500/50 animate-pulse"
              />
              <span className="font-bold text-xs text-purple-300">{gameStats.premiumCoins || 0}</span>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Премиум монеты 💎
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Icon name="Zap" size={14} className="text-cosmic-cyan animate-pulse" />
              <span className="font-bold text-xs">{gameStats.power}</span>
            </div>

            <Button
              onClick={onProfileClick}
              variant="ghost"
              size="sm"
              className="p-1 h-8 w-8 hover:bg-cosmic-purple/30 rounded-full"
            >
              <Icon 
                name="User" 
                size={16} 
                className="text-cosmic-cyan"
              />
            </Button>
          </div>
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