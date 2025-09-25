import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import type { PlayerQuestProgress } from './QuestTypes'

interface QuestStatisticsProps {
  questProgress: PlayerQuestProgress
}

export default function QuestStatistics({ questProgress }: QuestStatisticsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-blue-900/20">
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{questProgress.questsCompletedToday}</p>
          <p className="text-sm text-gray-400">Квестов сегодня</p>
        </CardContent>
      </Card>
      <Card className="bg-purple-900/20">
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-purple-400">{questProgress.questsCompletedThisWeek}</p>
          <p className="text-sm text-gray-400">Квестов за неделю</p>
        </CardContent>
      </Card>
      <Card className="bg-green-900/20">
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{questProgress.totalQuestsCompleted}</p>
          <p className="text-sm text-gray-400">Всего квестов</p>
        </CardContent>
      </Card>
      <Card className="bg-yellow-900/20">
        <CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-yellow-400">{questProgress.achievements.filter(a => a.isUnlocked).length}</p>
          <p className="text-sm text-gray-400">Достижений</p>
        </CardContent>
      </Card>
    </div>
  )
}