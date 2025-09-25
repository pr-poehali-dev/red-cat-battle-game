export interface GuildMember {
  id: string
  name: string
  level: number
  contribution: number
  joinDate: Date
  lastActive: Date
  role: 'leader' | 'officer' | 'member'
  totalCats: number
  tournamentWins: number
  avatar: string
}

export interface Guild {
  id: string
  name: string
  description: string
  tag: string // 3-4 символа
  level: number
  experience: number
  maxExperience: number
  members: GuildMember[]
  maxMembers: number
  isPublic: boolean
  requirements: {
    minLevel: number
    minTournamentWins: number
  }
  perks: {
    coinBonus: number // % бонус к монетам
    expBonus: number   // % бонус к опыту
    specialTournaments: boolean
  }
  createdDate: Date
  banner: string
  color: string
}

export interface GuildTournament {
  id: string
  name: string
  description: string
  type: 'guild_vs_guild' | 'team_battle' | 'raid'
  startDate: Date
  endDate: Date
  isActive: boolean
  participants: Guild[]
  maxParticipants: number
  rewards: {
    winner: { coins: number; experience: number; items?: any[] }
    participant: { coins: number; experience: number }
  }
  rules: string[]
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary'
}

export interface TeamBattle {
  id: string
  guild1: Guild
  guild2: Guild
  status: 'preparing' | 'active' | 'completed'
  battles: {
    member1: GuildMember
    member2: GuildMember
    winner?: string
    completed: boolean
  }[]
  winner?: string
  rewards: {
    coins: number
    experience: number
  }
}

export interface GuildRaid {
  id: string
  name: string
  boss: {
    name: string
    health: number
    maxHealth: number
    image: string
    rewards: any[]
  }
  participants: {
    guild: Guild
    damage: number
    members: GuildMember[]
  }[]
  timeLimit: number // в часах
  isCompleted: boolean
}