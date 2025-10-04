import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import type { Quest } from './QuestTypes'

interface QuestCardProps {
  quest: Quest
  type: 'daily' | 'weekly'
  onClaimReward: (questId: string, questType: 'daily' | 'weekly') => void
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'legendary': return 'from-yellow-400 to-orange-600'
    case 'epic': return 'from-purple-400 to-pink-600'
    case 'rare': return 'from-blue-400 to-cyan-600'
    default: return 'from-green-400 to-emerald-600'
  }
}

export default function QuestCard({ quest, type, onClaimReward }: QuestCardProps) {
  return (
    <Card className={`bg-gradient-to-br ${getRarityColor(quest.rarity)} bg-opacity-5 border border-gray-700/30 rounded-xl hover:bg-opacity-10 transition-all`}>
      <CardContent className="p-3 space-y-2.5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-lg flex-shrink-0">{quest.icon}</span>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-sm leading-tight truncate">{quest.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{quest.description}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
            <Badge className={`bg-gradient-to-r ${getRarityColor(quest.rarity)} text-white text-xs px-1.5 py-0`}>
              {quest.rarity === 'rare' ? 'Редкий' : 'Обычный'}
            </Badge>
            {quest.expiresAt && (
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {quest.expiresAt.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Прогресс</span>
            <span className="text-gray-300">{quest.progress}/{quest.maxProgress}</span>
          </div>
          <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-1.5" />
        </div>
        
        <div className="bg-gray-800/30 rounded-lg p-2">
          <p className="text-xs text-yellow-300 mb-1">🎁 Награды:</p>
          <div className="flex flex-wrap gap-1">
            {quest.rewards.map((reward, index) => (
              <span key={index} className="text-xs text-gray-300 bg-gray-700/50 px-1.5 py-0.5 rounded">
                {reward.description}
              </span>
            ))}
          </div>
        </div>
        
        {quest.isCompleted ? (
          <div className="w-full h-7 flex items-center justify-center bg-green-600/20 border border-green-500/50 rounded text-xs text-green-400">
            <Icon name="Check" size={12} className="mr-1" />
            ✅ Выполнено
          </div>
        ) : quest.progress >= quest.maxProgress ? (
          <Button
            onClick={() => onClaimReward(quest.id, type)}
            className="w-full h-7 text-xs bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 animate-pulse"
            size="sm"
          >
            <Icon name="Gift" size={12} className="mr-1" />
            🎁 Забрать награду!
          </Button>
        ) : (
          <div className="w-full h-7 flex items-center justify-center bg-blue-600/20 border border-blue-500/50 rounded text-xs text-blue-300">
            <Icon name="Target" size={12} className="mr-1" />
            Выполняется: {quest.progress}/{quest.maxProgress}
          </div>
        )}
      </CardContent>
    </Card>
  )
}