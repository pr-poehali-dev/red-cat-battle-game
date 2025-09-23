import React from 'react'
import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'

interface SaveIndicatorProps {
  lastSaved: string | null
  onManualSave?: () => void
  isLoading?: boolean
}

const SaveIndicator: React.FC<SaveIndicatorProps> = ({ 
  lastSaved, 
  onManualSave, 
  isLoading = false 
}) => {
  const formatLastSaved = (timestamp: string | null) => {
    if (!timestamp) return 'Никогда'
    
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    if (diff < 60000) return 'Только что'
    if (diff < 3600000) return `${Math.floor(diff / 60000)} мин назад`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} ч назад`
    
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex items-center gap-2 text-xs bg-space-dark/50 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-cosmic-cyan/20">
      <div className="flex items-center gap-1">
        <Icon 
          name={isLoading ? "Loader2" : "Cloud"} 
          size={12} 
          className={`${isLoading ? 'animate-spin' : ''} text-cosmic-cyan`} 
        />
        <span className="text-gray-300">
          Сохранено: {formatLastSaved(lastSaved)}
        </span>
      </div>
      
      {onManualSave && (
        <Button
          onClick={onManualSave}
          disabled={isLoading}
          variant="ghost"
          size="sm"
          className="h-5 px-2 text-xs hover:bg-cosmic-cyan/20 text-cosmic-cyan"
        >
          <Icon name="Save" size={10} />
        </Button>
      )}
    </div>
  )
}

export default SaveIndicator