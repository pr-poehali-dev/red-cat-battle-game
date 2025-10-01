import React from 'react'
import CatFighter from '@/components/CatFighter'
import FightArena from '@/components/FightArena'
import CatShop from '@/components/CatShop'
import CatManager from '@/components/CatManager'
import CatBattle from '@/components/CatBattle'
import CatTournament from '@/components/CatTournament'
import GuildSystem from '@/components/guild/GuildSystem'
import QuestSystem from '@/components/quests/QuestSystem'
import UserProfile from '@/components/UserProfile'
import { GameStats, Enemy, DamageNumber, EnergyParticle, Upgrade } from '@/types/game'
import type { PlayerStats } from '@/components/tournament/RankingSystem'
import type { QuestReward } from '@/components/quests/QuestTypes'

interface TabRendererProps {
  activeTab: string
  gameStats: GameStats
  currentEnemy: Enemy
  isAttacking: boolean
  damageNumbers: DamageNumber[]
  energyParticles: EnergyParticle[]
  upgrades: Upgrade[]
  playerStats: PlayerStats
  totalBattles: number
  totalWins: number
  totalTournaments: number
  coinsEarned?: number
  catsUpgraded?: number
  user: any
  onCatClick: (event: React.MouseEvent) => void
  onStartTournament: () => void
  onPurchaseCat: (catId: string, cost: number) => void
  onSelectCat: (catId: string) => void
  onUpgradeStat: (catId: string, stat: 'attack' | 'defense' | 'health' | 'speed', cost: number) => void
  onLevelUpCat: (catId: string, cost: number) => void
  onBattleWin: (reward: number, experience: number) => void
  onCatExperience: (catId: string, experience: number) => void
  onUpgrade: (upgrade: Upgrade) => void
  onUpdateStats: (updates: Partial<PlayerStats>) => void
  setActiveTab: (tab: string) => void
  setGameStats: React.Dispatch<React.SetStateAction<GameStats>>
  onRewardClaimed: (reward: QuestReward) => void
}

export default function TabRenderer({
  activeTab,
  gameStats,
  currentEnemy,
  isAttacking,
  damageNumbers,
  energyParticles,
  upgrades,
  playerStats,
  totalBattles,
  totalWins,
  totalTournaments,
  coinsEarned = 0,
  catsUpgraded = 0,
  user,
  onCatClick,
  onStartTournament,
  onPurchaseCat,
  onSelectCat,
  onUpgradeStat,
  onLevelUpCat,
  onBattleWin,
  onCatExperience,
  onUpgrade,
  onUpdateStats,
  setActiveTab,
  setGameStats,
  onRewardClaimed
}: TabRendererProps) {

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      {activeTab === 'home' && (
        <CatFighter
          gameStats={gameStats}
          currentEnemy={currentEnemy}
          isAttacking={isAttacking}
          damageNumbers={damageNumbers}
          energyParticles={energyParticles}
          onCatClick={onCatClick}
        />
      )}

      {activeTab === 'profile' && (
        <UserProfile gameStats={gameStats} />
      )}

      {activeTab === 'fight' && (
        <FightArena onStartTournament={onStartTournament} />
      )}

      {activeTab === 'shop' && (
        <CatShop
          gameStats={gameStats}
          onPurchase={onPurchaseCat}
        />
      )}

      {activeTab === 'cats' && (
        <CatManager
          gameStats={gameStats}
          onSelectCat={onSelectCat}
        />
      )}

      {activeTab === 'battle' && (
        <CatBattle 
          ownedCats={gameStats.ownedCats || []}
          playerCoins={gameStats.coins}
          onBattleWin={onBattleWin}
          onCatExperience={onCatExperience}
        />
      )}

      {activeTab === 'tournament' && (
        <CatTournament 
          ownedCats={gameStats.ownedCats || []}
          playerCoins={gameStats.coins}
          playerStats={playerStats}
          playerName={user?.email?.split('@')[0] || 'Игрок'}
          onTournamentWin={onBattleWin}
          onCatExperience={onCatExperience}
          onUpdateStats={onUpdateStats}
        />
      )}

      {activeTab === 'guild' && (
        <GuildSystem
          playerName={user?.email?.split('@')[0] || 'Игрок'}
          playerLevel={gameStats.level}
          playerCoins={gameStats.coins}
          ownedCats={gameStats.ownedCats || []}
          onBack={() => setActiveTab('home')}
          onCoinsChange={(amount) => setGameStats(prev => ({ ...prev, coins: prev.coins + amount }))}
        />
      )}

      {activeTab === 'quests' && (
        <QuestSystem
          playerLevel={gameStats.level}
          playerCoins={gameStats.coins}
          ownedCats={gameStats.ownedCats || []}
          totalBattles={totalBattles}
          totalWins={totalWins}
          totalTournaments={totalTournaments}
          coinsEarned={coinsEarned}
          catsUpgraded={catsUpgraded}
          guildLevel={5}
          onRewardClaimed={onRewardClaimed}
          onBack={() => setActiveTab('home')}
        />
      )}
    </div>
  )
}