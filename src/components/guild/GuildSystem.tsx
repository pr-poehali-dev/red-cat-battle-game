import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Icon from '@/components/ui/icon'
import type { Guild, GuildMember, GuildTournament } from './GuildTypes'
import type { Cat } from '@/types/game'

interface GuildSystemProps {
  playerName: string
  playerLevel: number
  playerCoins: number
  ownedCats: Cat[]
  onBack: () => void
  onCoinsChange: (amount: number) => void
}

const MOCK_GUILDS: Guild[] = [
  {
    id: 'cosmic_cats',
    name: 'Космические Коты',
    description: 'Элитная гильдия покорителей галактики! Только лучшие из лучших.',
    tag: 'COSM',
    level: 15,
    experience: 75000,
    maxExperience: 100000,
    maxMembers: 50,
    isPublic: true,
    requirements: { minLevel: 25, minTournamentWins: 10 },
    perks: { coinBonus: 20, expBonus: 15, specialTournaments: true },
    createdDate: new Date('2024-01-01'),
    banner: '🌌',
    color: 'from-purple-400 to-blue-600',
    members: [
      {
        id: '1', name: 'КапитанКот', level: 45, contribution: 15000, role: 'leader',
        joinDate: new Date('2024-01-01'), lastActive: new Date(), totalCats: 25, tournamentWins: 50, avatar: '👑'
      },
      {
        id: '2', name: 'СтарФайтер', level: 38, contribution: 12000, role: 'officer',
        joinDate: new Date('2024-02-15'), lastActive: new Date(), totalCats: 20, tournamentWins: 35, avatar: '⭐'
      },
      {
        id: '3', name: 'ГалактикХантер', level: 42, contribution: 13500, role: 'member',
        joinDate: new Date('2024-03-01'), lastActive: new Date(), totalCats: 23, tournamentWins: 40, avatar: '🚀'
      }
    ]
  },
  {
    id: 'stellar_paws',
    name: 'Звёздные Лапы',
    description: 'Дружная команда исследователей космоса. Приветствуем новичков!',
    tag: 'STAR',
    level: 8,
    experience: 25000,
    maxExperience: 50000,
    maxMembers: 30,
    isPublic: true,
    requirements: { minLevel: 10, minTournamentWins: 3 },
    perks: { coinBonus: 10, expBonus: 8, specialTournaments: false },
    createdDate: new Date('2024-05-01'),
    banner: '⭐',
    color: 'from-yellow-400 to-orange-600',
    members: [
      {
        id: '4', name: 'НовыйКот', level: 20, contribution: 3000, role: 'leader',
        joinDate: new Date('2024-05-01'), lastActive: new Date(), totalCats: 12, tournamentWins: 8, avatar: '🌟'
      }
    ]
  }
]

const GUILD_TOURNAMENTS: GuildTournament[] = [
  {
    id: 'galactic_war',
    name: '⚔️ Галактическая Война',
    description: 'Эпичные сражения между гильдиями за контроль над галактикой!',
    type: 'guild_vs_guild',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: true,
    participants: MOCK_GUILDS.slice(0, 8),
    maxParticipants: 16,
    rewards: {
      winner: { coins: 50000, experience: 10000, items: ['legendary_crown'] },
      participant: { coins: 10000, experience: 2000 }
    },
    rules: ['5v5 командные бои', 'Лучший из 3 раундов', 'Запрет на повторное использование котов'],
    difficulty: 'legendary'
  },
  {
    id: 'team_clash',
    name: '🏟️ Командные Столкновения',
    description: 'Быстрые 3v3 сражения между командами гильдий',
    type: 'team_battle',
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    isActive: true,
    participants: MOCK_GUILDS.slice(0, 12),
    maxParticipants: 20,
    rewards: {
      winner: { coins: 20000, experience: 4000 },
      participant: { coins: 5000, experience: 1000 }
    },
    rules: ['3v3 формат', 'Время на ход: 30 сек', 'Случайные карты арены'],
    difficulty: 'hard'
  }
]

export default function GuildSystem({ playerName, playerLevel, playerCoins, ownedCats, onBack, onCoinsChange }: GuildSystemProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'my_guild' | 'create' | 'tournaments'>('browse')
  const [playerGuild, setPlayerGuild] = useState<Guild | null>(null)
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null)
  const [createGuildData, setCreateGuildData] = useState({
    name: '',
    description: '',
    tag: '',
    isPublic: true,
    minLevel: 1,
    minTournamentWins: 0
  })

  // Проверяем, состоит ли игрок в гильдии
  useEffect(() => {
    const guild = MOCK_GUILDS.find(g => 
      g.members.some(m => m.name === playerName)
    )
    setPlayerGuild(guild || null)
  }, [playerName])

  const handleJoinGuild = (guild: Guild) => {
    if (playerLevel >= guild.requirements.minLevel && playerCoins >= 1000) {
      onCoinsChange(-1000) // Взнос за вступление
      
      // Добавляем игрока в гильдию
      const newMember: GuildMember = {
        id: Date.now().toString(),
        name: playerName,
        level: playerLevel,
        contribution: 0,
        role: 'member',
        joinDate: new Date(),
        lastActive: new Date(),
        totalCats: ownedCats.length,
        tournamentWins: 0,
        avatar: '🐱'
      }
      
      guild.members.push(newMember)
      setPlayerGuild(guild)
      setActiveTab('my_guild')
    }
  }

  const handleCreateGuild = () => {
    if (createGuildData.name && createGuildData.tag && playerCoins >= 5000) {
      onCoinsChange(-5000) // Стоимость создания гильдии
      
      const newGuild: Guild = {
        id: Date.now().toString(),
        name: createGuildData.name,
        description: createGuildData.description,
        tag: createGuildData.tag.toUpperCase(),
        level: 1,
        experience: 0,
        maxExperience: 10000,
        maxMembers: 20,
        isPublic: createGuildData.isPublic,
        requirements: {
          minLevel: createGuildData.minLevel,
          minTournamentWins: createGuildData.minTournamentWins
        },
        perks: { coinBonus: 5, expBonus: 5, specialTournaments: false },
        createdDate: new Date(),
        banner: '🏰',
        color: 'from-blue-400 to-purple-600',
        members: [{
          id: '1',
          name: playerName,
          level: playerLevel,
          contribution: 0,
          role: 'leader',
          joinDate: new Date(),
          lastActive: new Date(),
          totalCats: ownedCats.length,
          tournamentWins: 0,
          avatar: '👑'
        }]
      }
      
      MOCK_GUILDS.unshift(newGuild)
      setPlayerGuild(newGuild)
      setActiveTab('my_guild')
    }
  }

  const renderBrowseGuilds = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">🔍 Поиск Гильдий</h2>
        {!playerGuild && (
          <Button 
            onClick={() => setActiveTab('create')}
            className="bg-gradient-to-r from-green-600 to-emerald-600"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Создать гильдию
          </Button>
        )}
      </div>
      
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_GUILDS.filter(g => !playerGuild || g.id !== playerGuild.id).map(guild => (
          <Card key={guild.id} className={`bg-gradient-to-br ${guild.color} bg-opacity-5 border border-gray-700/30 rounded-xl hover:bg-opacity-10 transition-all`}>
            <CardContent className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{guild.banner}</span>
                  <div>
                    <h3 className="font-medium text-sm leading-tight">{guild.name}</h3>
                    <Badge variant="secondary" className="text-xs px-1.5 py-0 mt-0.5">[{guild.tag}]</Badge>
                  </div>
                </div>
                <Badge className={`text-xs px-2 py-0.5 ${guild.isPublic ? 'bg-green-600' : 'bg-orange-600'}`}>
                  {guild.isPublic ? 'Open' : 'Closed'}
                </Badge>
              </div>
              
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{guild.description}</p>
              
              <div className="grid grid-cols-3 gap-1.5">
                <div className="bg-gray-800/40 rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-400">Level</div>
                  <div className="font-semibold text-sm">{guild.level}</div>
                </div>
                <div className="bg-gray-800/40 rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-400">Members</div>
                  <div className="font-semibold text-sm">{guild.members.length}/{guild.maxMembers}</div>
                </div>
                <div className="bg-gray-800/40 rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-400">Bonus</div>
                  <div className="font-semibold text-sm text-yellow-400">+{guild.perks.coinBonus}%</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">XP</span>
                  <span className="text-gray-300">{Math.floor(guild.experience/1000)}K/{Math.floor(guild.maxExperience/1000)}K</span>
                </div>
                <Progress value={(guild.experience / guild.maxExperience) * 100} className="h-1.5" />
              </div>
              
              <div className="text-xs text-gray-400 bg-gray-800/30 rounded p-2">
                <span>Req: Lvl {guild.requirements.minLevel}+ • {guild.requirements.minTournamentWins} wins</span>
              </div>
              
              <div className="flex gap-1.5">
                <Button
                  onClick={() => setSelectedGuild(guild)}
                  variant="outline"
                  size="sm"
                  className="flex-1 h-7 text-xs px-2"
                >
                  <Icon name="Eye" size={12} className="mr-1" />
                  Info
                </Button>
                {!playerGuild && (
                  <Button
                    onClick={() => handleJoinGuild(guild)}
                    disabled={playerLevel < guild.requirements.minLevel || playerCoins < 1000}
                    className="flex-1 h-7 text-xs px-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="sm"
                  >
                    <Icon name="UserPlus" size={12} className="mr-1" />
                    Join
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderMyGuild = () => {
    if (!playerGuild) return <div>Гильдия не найдена</div>
    
    return (
      <div className="space-y-6">
        <Card className={`bg-gradient-to-r ${playerGuild.color} bg-opacity-20`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-4xl">{playerGuild.banner}</span>
              <div>
                <h1 className="text-3xl font-bold">{playerGuild.name}</h1>
                <Badge className="text-lg px-3 py-1">[{playerGuild.tag}]</Badge>
              </div>
            </CardTitle>
            <p className="text-gray-300">{playerGuild.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">{playerGuild.level}</p>
                <p className="text-sm text-gray-400">Уровень</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{playerGuild.members.length}</p>
                <p className="text-sm text-gray-400">Участников</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">+{playerGuild.perks.coinBonus}%</p>
                <p className="text-sm text-gray-400">Бонус монет</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">+{playerGuild.perks.expBonus}%</p>
                <p className="text-sm text-gray-400">Бонус опыта</p>
              </div>
            </div>
            
            <div>
              <p className="font-semibold mb-2">Прогресс гильдии:</p>
              <Progress value={(playerGuild.experience / playerGuild.maxExperience) * 100} className="h-3" />
              <p className="text-sm text-gray-400 mt-1">
                {playerGuild.experience.toLocaleString()}/{playerGuild.maxExperience.toLocaleString()} опыта
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Список участников */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Users" size={20} />
              Участники гильдии ({playerGuild.members.length}/{playerGuild.maxMembers})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {playerGuild.members.map(member => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{member.avatar}</span>
                    <div>
                      <p className="font-semibold flex items-center gap-2">
                        {member.name}
                        {member.role === 'leader' && <Badge className="bg-yellow-600">Лидер</Badge>}
                        {member.role === 'officer' && <Badge className="bg-blue-600">Офицер</Badge>}
                      </p>
                      <p className="text-sm text-gray-400">
                        Уровень {member.level} • {member.tournamentWins} побед
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-400">{member.contribution.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">вклад</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderTournaments = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">
        <Icon name="Sword" className="inline mr-2" />
        🏆 Турниры Гильдий
      </h2>
      
      <div className="grid gap-6">
        {GUILD_TOURNAMENTS.map(tournament => (
          <Card key={tournament.id} className="border-2 border-orange-500">
            <CardHeader>
              <CardTitle className="text-xl">{tournament.name}</CardTitle>
              <p className="text-gray-300">{tournament.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Участников</p>
                  <p className="font-bold">{tournament.participants.length}/{tournament.maxParticipants}</p>
                </div>
                <div>
                  <p className="text-gray-400">Награда победителю</p>
                  <p className="font-bold text-yellow-400">{tournament.rewards.winner.coins.toLocaleString()} 💰</p>
                </div>
                <div>
                  <p className="text-gray-400">Сложность</p>
                  <Badge className={`${
                    tournament.difficulty === 'legendary' ? 'bg-purple-600' :
                    tournament.difficulty === 'hard' ? 'bg-red-600' :
                    tournament.difficulty === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                  }`}>
                    {tournament.difficulty === 'legendary' ? 'Легендарная' :
                     tournament.difficulty === 'hard' ? 'Сложная' :
                     tournament.difficulty === 'medium' ? 'Средняя' : 'Лёгкая'}
                  </Badge>
                </div>
                <div>
                  <p className="text-gray-400">Статус</p>
                  <Badge className={tournament.isActive ? 'bg-green-600' : 'bg-gray-600'}>
                    {tournament.isActive ? 'Активен' : 'Завершён'}
                  </Badge>
                </div>
              </div>
              
              <div className="bg-blue-900/20 p-3 rounded-lg">
                <p className="text-sm font-semibold text-blue-300 mb-2">Правила турнира:</p>
                {tournament.rules.map((rule, index) => (
                  <p key={index} className="text-sm text-blue-200">• {rule}</p>
                ))}
              </div>
              
              <Button
                disabled={!playerGuild || !tournament.isActive}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600"
              >
                {!playerGuild ? 'Нужна гильдия' : 
                 !tournament.isActive ? 'Турнир завершён' : 'Участвовать с гильдией'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderCreateGuild = () => (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Plus" size={20} />
            Создание гильдии
          </CardTitle>
          <p className="text-gray-400">Стоимость: 5,000 монет</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Название гильдии</label>
            <Input
              value={createGuildData.name}
              onChange={(e) => setCreateGuildData({...createGuildData, name: e.target.value})}
              placeholder="Космические Воители"
              maxLength={30}
            />
          </div>
          
          <div>
            <label className="text-sm font-semibold">Тег гильдии (3-4 символа)</label>
            <Input
              value={createGuildData.tag}
              onChange={(e) => setCreateGuildData({...createGuildData, tag: e.target.value.toUpperCase()})}
              placeholder="WAR"
              maxLength={4}
            />
          </div>
          
          <div>
            <label className="text-sm font-semibold">Описание</label>
            <Textarea
              value={createGuildData.description}
              onChange={(e) => setCreateGuildData({...createGuildData, description: e.target.value})}
              placeholder="Описание вашей гильдии..."
              maxLength={200}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Мин. уровень</label>
              <Input
                type="number"
                value={createGuildData.minLevel}
                onChange={(e) => setCreateGuildData({...createGuildData, minLevel: parseInt(e.target.value) || 1})}
                min={1}
                max={100}
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold">Мин. побед в турнирах</label>
              <Input
                type="number"
                value={createGuildData.minTournamentWins}
                onChange={(e) => setCreateGuildData({...createGuildData, minTournamentWins: parseInt(e.target.value) || 0})}
                min={0}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={() => setActiveTab('browse')}
              variant="outline"
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              onClick={handleCreateGuild}
              disabled={!createGuildData.name || !createGuildData.tag || playerCoins < 5000}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
            >
              Создать за 5,000 💰
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <Icon name="ArrowLeft" size={16} />
          Назад
        </Button>
        
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
          🏰 Система Гильдий
        </h1>
        
        <div className="text-right">
          <p className="text-sm text-gray-400">Ваши монеты</p>
          <p className="text-xl font-bold text-yellow-400">{playerCoins.toLocaleString()} 💰</p>
        </div>
      </div>
      
      {/* Навигация */}
      <div className="flex gap-2 justify-center flex-wrap">
        <Button
          onClick={() => setActiveTab('browse')}
          variant={activeTab === 'browse' ? 'default' : 'outline'}
        >
          <Icon name="Search" size={16} className="mr-2" />
          Поиск гильдий
        </Button>
        
        {playerGuild && (
          <Button
            onClick={() => setActiveTab('my_guild')}
            variant={activeTab === 'my_guild' ? 'default' : 'outline'}
          >
            <Icon name="Home" size={16} className="mr-2" />
            Моя гильдия
          </Button>
        )}
        
        <Button
          onClick={() => setActiveTab('tournaments')}
          variant={activeTab === 'tournaments' ? 'default' : 'outline'}
        >
          <Icon name="Sword" size={16} className="mr-2" />
          Турниры
        </Button>
      </div>
      
      {/* Контент вкладок */}
      {activeTab === 'browse' && renderBrowseGuilds()}
      {activeTab === 'my_guild' && renderMyGuild()}
      {activeTab === 'create' && renderCreateGuild()}
      {activeTab === 'tournaments' && renderTournaments()}
    </div>
  )
}