import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'
import type { Quest, Achievement, PlayerQuestProgress, QuestReward } from './QuestTypes'
import type { Cat } from '@/types/game'

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

// Генерация ежедневных квестов
const generateDailyQuests = (): Quest[] => [
  {
    id: 'daily_battles',
    title: '⚔️ Ежедневный Воин',
    description: 'Выиграй 3 битвы сегодня',
    type: 'daily',
    category: 'battle',
    objectives: [
      {
        id: 'win_3_battles',
        description: 'Победы в битвах',
        type: 'win_battles',
        targetValue: 3,
        currentValue: 0,
        isCompleted: false
      }
    ],
    rewards: [
      { type: 'coins', value: 500, amount: 500, description: '500 монет' },
      { type: 'experience', value: 100, amount: 100, description: '100 опыта' }
    ],
    isCompleted: false,
    progress: 0,
    maxProgress: 3,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    rarity: 'common',
    icon: '⚔️'
  },
  {
    id: 'daily_coins',
    title: '💰 Сборщик Монет',
    description: 'Заработай 2000 монет за день',
    type: 'daily',
    category: 'progression',
    objectives: [
      {
        id: 'earn_2000_coins',
        description: 'Монеты заработаны',
        type: 'earn_coins',
        targetValue: 2000,
        currentValue: 0,
        isCompleted: false
      }
    ],
    rewards: [
      { type: 'coins', value: 800, amount: 800, description: '800 бонусных монет' },
      { type: 'item', value: 'power_boost', amount: 1, description: 'Усилитель силы' }
    ],
    isCompleted: false,
    progress: 0,
    maxProgress: 2000,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    rarity: 'common',
    icon: '💰'
  },
  {
    id: 'daily_cat_upgrade',
    title: '⭐ Тренировка Котов',
    description: 'Улучши 2 котов сегодня',
    type: 'daily',
    category: 'collection',
    objectives: [
      {
        id: 'upgrade_2_cats',
        description: 'Коты улучшены',
        type: 'upgrade_cats',
        targetValue: 2,
        currentValue: 0,
        isCompleted: false
      }
    ],
    rewards: [
      { type: 'coins', value: 1000, amount: 1000, description: '1000 монет' },
      { type: 'experience', value: 200, amount: 200, description: '200 опыта' }
    ],
    isCompleted: false,
    progress: 0,
    maxProgress: 2,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    rarity: 'rare',
    icon: '⭐'
  }
]

// Генерация еженедельных квестов
const generateWeeklyQuests = (): Quest[] => [
  {
    id: 'weekly_tournament',
    title: '🏆 Турнирный Мастер',
    description: 'Участвуй в 5 турнирах за неделю',
    type: 'weekly',
    category: 'battle',
    objectives: [
      {
        id: 'join_5_tournaments',
        description: 'Турниры пройдены',
        type: 'join_tournament',
        targetValue: 5,
        currentValue: 0,
        isCompleted: false
      }
    ],
    rewards: [
      { type: 'coins', value: 5000, amount: 5000, description: '5000 монет' },
      { type: 'cat', value: 'rare_tournament_cat', amount: 1, description: 'Редкий турнирный кот' },
      { type: 'experience', value: 1000, amount: 1000, description: '1000 опыта' }
    ],
    isCompleted: false,
    progress: 0,
    maxProgress: 5,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    rarity: 'epic',
    icon: '🏆'
  },
  {
    id: 'weekly_collection',
    title: '🐱 Великий Коллекционер',
    description: 'Собери 3 новых кота за неделю',
    type: 'weekly',
    category: 'collection',
    objectives: [
      {
        id: 'collect_3_cats',
        description: 'Новые коты получены',
        type: 'collect_cats',
        targetValue: 3,
        currentValue: 0,
        isCompleted: false
      }
    ],
    rewards: [
      { type: 'coins', value: 3000, amount: 3000, description: '3000 монет' },
      { type: 'item', value: 'cat_summoner', amount: 1, description: 'Призыватель котов' },
      { type: 'title', value: 'Повелитель Котов', amount: 1, description: 'Эксклюзивный титул' }
    ],
    isCompleted: false,
    progress: 0,
    maxProgress: 3,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    rarity: 'epic',
    icon: '🐱'
  },
  {
    id: 'weekly_social',
    title: '👥 Социальная Звезда',
    description: 'Участвуй в гильдейских активностях 10 раз',
    type: 'weekly',
    category: 'social',
    objectives: [
      {
        id: 'guild_activity_10',
        description: 'Активность в гильдии',
        type: 'guild_activity',
        targetValue: 10,
        currentValue: 0,
        isCompleted: false
      }
    ],
    rewards: [
      { type: 'coins', value: 4000, amount: 4000, description: '4000 монет' },
      { type: 'experience', value: 800, amount: 800, description: '800 опыта' },
      { type: 'cosmetic', value: 'guild_banner', amount: 1, description: 'Баннер гильдии' }
    ],
    isCompleted: false,
    progress: 0,
    maxProgress: 10,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    rarity: 'rare',
    icon: '👥'
  }
]

// Система достижений
const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_victory',
    title: '🏅 Первая Победа',
    description: 'Выиграй свою первую битву',
    category: 'battle_master',
    requirements: [
      { type: 'total_wins', value: 1, description: 'Победы в битвах: 1' }
    ],
    rewards: [
      { type: 'coins', value: 100, amount: 100, description: '100 монет' },
      { type: 'title', value: 'Новичок', amount: 1, description: 'Титул "Новичок"' }
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'bronze',
    icon: '🏅',
    badge: '🥉'
  },
  {
    id: 'battle_veteran',
    title: '⚔️ Ветеран Битв',
    description: 'Выиграй 100 битв',
    category: 'battle_master',
    requirements: [
      { type: 'total_wins', value: 100, description: 'Победы в битвах: 100' }
    ],
    rewards: [
      { type: 'coins', value: 5000, amount: 5000, description: '5000 монет' },
      { type: 'cat', value: 'veteran_cat', amount: 1, description: 'Кот-Ветеран' },
      { type: 'title', value: 'Ветеран Арены', amount: 1, description: 'Титул "Ветеран Арены"' }
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 100,
    rarity: 'gold',
    icon: '⚔️',
    badge: '🥇'
  },
  {
    id: 'cat_master',
    title: '🐱 Мастер Котов',
    description: 'Собери 50 разных котов',
    category: 'collector',
    requirements: [
      { type: 'cats_collected', value: 50, description: 'Коллекция котов: 50' }
    ],
    rewards: [
      { type: 'coins', value: 10000, amount: 10000, description: '10,000 монет' },
      { type: 'cat', value: 'legendary_master_cat', amount: 1, description: 'Легендарный Мастер-Кот' },
      { type: 'cosmetic', value: 'cat_crown', amount: 1, description: 'Корона Повелителя Котов' }
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 50,
    rarity: 'platinum',
    icon: '🐱',
    badge: '👑'
  },
  {
    id: 'millionaire',
    title: '💎 Космический Миллионер',
    description: 'Заработай 1,000,000 монет за всё время',
    category: 'progression',
    requirements: [
      { type: 'coins_earned', value: 1000000, description: 'Монеты заработаны: 1,000,000' }
    ],
    rewards: [
      { type: 'coins', value: 100000, amount: 100000, description: '100,000 бонусных монет' },
      { type: 'title', value: 'Космический Миллионер', amount: 1, description: 'Престижный титул' },
      { type: 'cosmetic', value: 'golden_spaceship', amount: 1, description: 'Золотой корабль' }
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 1000000,
    rarity: 'diamond',
    icon: '💎',
    badge: '💎'
  },
  {
    id: 'tournament_champion',
    title: '🏆 Чемпион Турниров',
    description: 'Выиграй 25 турниров',
    category: 'battle_master',
    requirements: [
      { type: 'tournaments_won', value: 25, description: 'Турниры выиграны: 25' }
    ],
    rewards: [
      { type: 'coins', value: 15000, amount: 15000, description: '15,000 монет' },
      { type: 'cat', value: 'champion_cat', amount: 1, description: 'Кот-Чемпион' },
      { type: 'title', value: 'Великий Чемпион', amount: 1, description: 'Титул "Великий Чемпион"' },
      { type: 'cosmetic', value: 'champion_trophy', amount: 1, description: 'Трофей Чемпиона' }
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 25,
    rarity: 'platinum',
    icon: '🏆',
    badge: '🏆'
  },
  {
    id: 'social_butterfly',
    title: '🦋 Социальная Бабочка',
    description: 'Достигни 10 уровня гильдии',
    category: 'social_butterfly',
    requirements: [
      { type: 'guild_level', value: 10, description: 'Уровень гильдии: 10' }
    ],
    rewards: [
      { type: 'coins', value: 8000, amount: 8000, description: '8,000 монет' },
      { type: 'title', value: 'Лидер Сообщества', amount: 1, description: 'Титул "Лидер Сообщества"' },
      { type: 'cosmetic', value: 'guild_master_cape', amount: 1, description: 'Плащ Мастера Гильдии' }
    ],
    isUnlocked: false,
    progress: 0,
    maxProgress: 10,
    rarity: 'gold',
    icon: '🦋',
    badge: '🦋'
  }
]

export default function QuestSystem({ playerLevel, playerCoins, ownedCats, totalBattles, totalWins, totalTournaments, guildLevel = 0, onRewardClaimed, onBack }: QuestSystemProps) {
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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-600'
      case 'epic': return 'from-purple-400 to-pink-600'
      case 'rare': return 'from-blue-400 to-cyan-600'
      case 'diamond': return 'from-cyan-400 to-blue-600'
      case 'platinum': return 'from-gray-300 to-gray-500'
      case 'gold': return 'from-yellow-400 to-yellow-600'
      case 'silver': return 'from-gray-400 to-gray-600'
      case 'bronze': return 'from-orange-400 to-orange-600'
      default: return 'from-green-400 to-emerald-600'
    }
  }

  const renderQuestCard = (quest: Quest, type: 'daily' | 'weekly') => (
    <Card key={quest.id} className={`bg-gradient-to-r ${getRarityColor(quest.rarity)} bg-opacity-10`}>
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
          onClick={() => claimQuestReward(quest.id, type)}
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

  const renderAchievementCard = (achievement: Achievement) => (
    <Card key={achievement.id} className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} bg-opacity-10`}>
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
          onClick={() => claimAchievementReward(achievement.id)}
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
            {questProgress.dailyQuests.map(quest => renderQuestCard(quest, 'daily'))}
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">📅 Еженедельные Квесты</h2>
            <p className="text-gray-400">Обновляются каждую неделю</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {questProgress.weeklyQuests.map(quest => renderQuestCard(quest, 'weekly'))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">🏆 Достижения</h2>
            <p className="text-gray-400">Постоянные цели для настоящих мастеров</p>
          </div>
          <div className="grid gap-4">
            {questProgress.achievements.map(renderAchievementCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}