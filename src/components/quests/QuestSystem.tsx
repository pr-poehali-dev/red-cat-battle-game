import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'
import type { PlayerQuestProgress, QuestReward } from './QuestTypes'
import type { Cat } from '@/types/game'
import { generateDailyQuests, generateWeeklyQuests, ACHIEVEMENTS } from './QuestData'
import QuestCard from './QuestCard'
import AchievementCard from './AchievementCard'
import QuestStatistics from './QuestStatistics'

interface QuestSystemProps {
  playerLevel: number
  playerCoins: number
  ownedCats: Cat[]
  totalBattles: number
  totalWins: number
  totalTournaments: number
  guildLevel?: number
  onRewardClaimed: (reward: QuestReward) => void
  onBack: () => void
}

export default function QuestSystem({ 
  playerLevel, 
  playerCoins, 
  ownedCats, 
  totalBattles, 
  totalWins, 
  totalTournaments, 
  guildLevel = 0, 
  onRewardClaimed, 
  onBack 
}: QuestSystemProps) {
  const [questProgress, setQuestProgress] = useState<PlayerQuestProgress>({
    dailyQuests: generateDailyQuests(),
    weeklyQuests: generateWeeklyQuests(),
    achievements: ACHIEVEMENTS,
    questsCompletedToday: 0,
    questsCompletedThisWeek: 0,
    totalQuestsCompleted: 0,
    achievementPoints: 0,
    lastDailyReset: new Date(),
    lastWeeklyReset: new Date(),
    loginStreak: 1,
    totalLoginDays: 1
  })

  const [selectedTab, setSelectedTab] = useState<'daily' | 'weekly' | 'achievements'>('daily')

  // Обновление прогресса достижений
  useEffect(() => {
    setQuestProgress(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement => {
        let newProgress = 0
        
        achievement.requirements.forEach(req => {
          switch (req.type) {
            case 'total_wins':
              newProgress = Math.max(newProgress, totalWins)
              break
            case 'total_battles':
              newProgress = Math.max(newProgress, totalBattles)
              break
            case 'cats_collected':
              newProgress = Math.max(newProgress, ownedCats.length)
              break
            case 'tournaments_won':
              newProgress = Math.max(newProgress, totalTournaments)
              break
            case 'guild_level':
              newProgress = Math.max(newProgress, guildLevel)
              break
            case 'level_reached':
              newProgress = Math.max(newProgress, playerLevel)
              break
          }
        })
        
        const isUnlocked = newProgress >= achievement.maxProgress && !achievement.isUnlocked
        
        return {
          ...achievement,
          progress: Math.min(newProgress, achievement.maxProgress),
          isUnlocked,
          unlockedAt: isUnlocked ? new Date() : achievement.unlockedAt
        }
      })
    }))
  }, [totalWins, totalBattles, ownedCats.length, totalTournaments, guildLevel, playerLevel])

  const claimQuestReward = (questId: string, questType: 'daily' | 'weekly') => {
    const questsKey = questType === 'daily' ? 'dailyQuests' : 'weeklyQuests'
    
    setQuestProgress(prev => ({
      ...prev,
      [questsKey]: prev[questsKey].map(quest => {
        if (quest.id === questId && quest.progress >= quest.maxProgress && !quest.isCompleted) {
          quest.rewards.forEach(reward => onRewardClaimed(reward))
          return { ...quest, isCompleted: true }
        }
        return quest
      }),
      questsCompletedToday: questType === 'daily' ? prev.questsCompletedToday + 1 : prev.questsCompletedToday,
      questsCompletedThisWeek: questType === 'weekly' ? prev.questsCompletedThisWeek + 1 : prev.questsCompletedThisWeek,
      totalQuestsCompleted: prev.totalQuestsCompleted + 1
    }))
  }

  const claimAchievementReward = (achievementId: string) => {
    setQuestProgress(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement => {
        if (achievement.id === achievementId && achievement.isUnlocked) {
          achievement.rewards.forEach(reward => onRewardClaimed(reward))
          return { ...achievement, isUnlocked: true }
        }
        return achievement
      }),
      achievementPoints: prev.achievementPoints + 100
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <Icon name="ArrowLeft" size={16} />
          Назад
        </Button>
        
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
          🎯 Квесты и Достижения
        </h1>
        
        <div className="text-right">
          <p className="text-sm text-gray-400">Очки достижений</p>
          <p className="text-xl font-bold text-yellow-400">{questProgress.achievementPoints} 🏆</p>
        </div>
      </div>

      {/* Статистика */}
      <QuestStatistics questProgress={questProgress} />

      {/* Вкладки */}
      <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <Icon name="Sun" size={16} />
            Ежедневные ({questProgress.dailyQuests.filter(q => !q.isCompleted).length})
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Icon name="Calendar" size={16} />
            Еженедельные ({questProgress.weeklyQuests.filter(q => !q.isCompleted).length})
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Icon name="Award" size={16} />
            Достижения ({questProgress.achievements.filter(a => a.isUnlocked).length}/{questProgress.achievements.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">🌅 Ежедневные Квесты</h2>
            <p className="text-gray-400">Обновляются каждые 24 часа</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {questProgress.dailyQuests.map(quest => (
              <QuestCard 
                key={quest.id}
                quest={quest} 
                type="daily" 
                onClaimReward={claimQuestReward}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">📅 Еженедельные Квесты</h2>
            <p className="text-gray-400">Обновляются каждую неделю</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {questProgress.weeklyQuests.map(quest => (
              <QuestCard 
                key={quest.id}
                quest={quest} 
                type="weekly" 
                onClaimReward={claimQuestReward}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">🏆 Достижения</h2>
            <p className="text-gray-400">Постоянные цели для настоящих мастеров</p>
          </div>
          <div className="grid gap-4">
            {questProgress.achievements.map(achievement => (
              <AchievementCard 
                key={achievement.id}
                achievement={achievement}
                onClaimReward={claimAchievementReward}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}