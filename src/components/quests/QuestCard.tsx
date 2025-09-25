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
    <Card className={`bg-gradient-to-r ${getRarityColor(quest.rarity)} bg-opacity-10`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-2xl">{quest.icon}</span>
              {quest.title}
            </CardTitle>
            <p className="text-sm text-gray-300 mt-1">{quest.description}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge className={`${getRarityColor(quest.rarity)} text-white`}>
              {quest.rarity === 'legendary' ? 'Легендарный' :
               quest.rarity === 'epic' ? 'Эпический' :
               quest.rarity === 'rare' ? 'Редкий' : 'Обычный'}
            </Badge>
            {quest.expiresAt && (
              <p className="text-xs text-gray-400">
                До: {quest.expiresAt.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Прогресс</span>
            <span>{quest.progress}/{quest.maxProgress}</span>
          </div>
          <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-semibold text-yellow-300">🎁 Награды:</p>
          <div className="flex flex-wrap gap-2">
            {quest.rewards.map((reward, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {reward.description}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button
          onClick={() => onClaimReward(quest.id, type)}
          disabled={quest.progress < quest.maxProgress || quest.isCompleted}
          className={`w-full ${
            quest.isCompleted ? 'bg-green-600' :
            quest.progress >= quest.maxProgress ? 'bg-gradient-to-r from-yellow-600 to-orange-600' :
            'bg-gray-600'
          }`}
        >
          {quest.isCompleted ? (
            <>
              <Icon name="Check" size={16} className="mr-2" />
              Выполнено
            </>
          ) : quest.progress >= quest.maxProgress ? (
            <>
              <Icon name="Gift" size={16} className="mr-2" />
              Забрать награду
            </>
          ) : (
            <>
              <Icon name="Clock" size={16} className="mr-2" />
              В процессе
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}