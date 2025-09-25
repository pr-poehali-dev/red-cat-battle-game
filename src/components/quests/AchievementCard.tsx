import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import type { Achievement } from './QuestTypes'

interface AchievementCardProps {
  achievement: Achievement
  onClaimReward: (achievementId: string) => void
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'diamond': return 'from-cyan-400 to-blue-600'
    case 'platinum': return 'from-gray-300 to-gray-500'
    case 'gold': return 'from-yellow-400 to-yellow-600'
    case 'silver': return 'from-gray-400 to-gray-600'
    case 'bronze': return 'from-orange-400 to-orange-600'
    default: return 'from-green-400 to-emerald-600'
  }
}

export default function AchievementCard({ achievement, onClaimReward }: AchievementCardProps) {
  return (
    <Card className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} bg-opacity-10`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-2xl">{achievement.icon}</span>
              {achievement.title}
              {achievement.badge && <span className="text-lg">{achievement.badge}</span>}
            </CardTitle>
            <p className="text-sm text-gray-300 mt-1">{achievement.description}</p>
          </div>
          <Badge className={`${getRarityColor(achievement.rarity)} text-white`}>
            {achievement.rarity === 'diamond' ? 'Алмазное' :
             achievement.rarity === 'platinum' ? 'Платиновое' :
             achievement.rarity === 'gold' ? 'Золотое' :
             achievement.rarity === 'silver' ? 'Серебряное' : 'Бронзовое'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Прогресс</span>
            <span>{achievement.progress}/{achievement.maxProgress}</span>
          </div>
          <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-400">Требования:</p>
          {achievement.requirements.map((req, index) => (
            <p key={index} className="text-xs text-gray-300">• {req.description}</p>
          ))}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-semibold text-yellow-300">🎁 Награды:</p>
          <div className="flex flex-wrap gap-2">
            {achievement.rewards.map((reward, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {reward.description}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button
          onClick={() => onClaimReward(achievement.id)}
          disabled={!achievement.isUnlocked}
          className={`w-full ${
            achievement.isUnlocked ? 'bg-gradient-to-r from-yellow-600 to-orange-600' : 'bg-gray-600'
          }`}
        >
          {achievement.isUnlocked ? (
            <>
              <Icon name="Award" size={16} className="mr-2" />
              Забрать награду
            </>
          ) : (
            <>
              <Icon name="Lock" size={16} className="mr-2" />
              Заблокировано
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}