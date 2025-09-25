export interface Quest {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'achievement'
  category: 'battle' | 'collection' | 'social' | 'progression' | 'special'
  objectives: QuestObjective[]
  rewards: QuestReward[]
  isCompleted: boolean
  progress: number
  maxProgress: number
  expiresAt?: Date
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  icon: string
}

export interface QuestObjective {
  id: string
  description: string
  type: 'win_battles' | 'collect_cats' | 'earn_coins' | 'level_up' | 'join_tournament' | 'guild_activity' | 'upgrade_cats' | 'login_streak'
  targetValue: number
  currentValue: number
  isCompleted: boolean
}

export interface QuestReward {
  type: 'coins' | 'experience' | 'cat' | 'item' | 'title' | 'cosmetic'
  value: any
  amount: number
  description: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  category: 'battle_master' | 'collector' | 'social_butterfly' | 'progression' | 'special_events' | 'legendary'
  requirements: AchievementRequirement[]
  rewards: QuestReward[]
  isUnlocked: boolean
  unlockedAt?: Date
  progress: number
  maxProgress: number
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
  icon: string
  badge?: string
}

export interface AchievementRequirement {
  type: 'total_battles' | 'total_wins' | 'cats_collected' | 'coins_earned' | 'tournaments_won' | 'guild_level' | 'level_reached' | 'login_days'
  value: number
  description: string
}

export interface PlayerQuestProgress {
  dailyQuests: Quest[]
  weeklyQuests: Quest[]
  achievements: Achievement[]
  questsCompletedToday: number
  questsCompletedThisWeek: number
  totalQuestsCompleted: number
  achievementPoints: number
  lastDailyReset: Date
  lastWeeklyReset: Date
  loginStreak: number
  totalLoginDays: number
}