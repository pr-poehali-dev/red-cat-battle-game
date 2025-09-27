import { useState, useEffect } from 'react'
import GameBackground from '@/components/game/GameBackground'
import GameHeader from '@/components/GameHeader'
import GameNavigation from '@/components/GameNavigation'
import TabRenderer from '@/components/game/TabRenderer'
import { GameLogic, UPGRADES, useUpgradeActions } from '@/components/game/GameLogic'
import { useGameActions } from '@/components/game/GameActions'
import { useCatActions } from '@/components/game/CatActions'
import { useAudioSystem } from '@/hooks/useAudioSystem'
import { useAuth } from '@/hooks/useAuth'
import { useGameData } from '@/hooks/useGameData'
import { Enemy, DamageNumber, EnergyParticle } from '@/types/game'
import type { PlayerStats } from '@/components/tournament/RankingSystem'

function Index() {
  // Принудительно устанавливаем темную тему
  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.body.style.backgroundColor = '#020617'
  }, [])

  const [activeTab, setActiveTab] = useState('home')
  const audioSystem = useAudioSystem()
  const { user } = useAuth()
  const { gameStats, setGameStats, saveProgress, lastSaved } = useGameData()
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    totalTournaments: 0,
    tournamentsWon: 0,
    totalFights: 0,
    fightsWon: 0,
    totalCoinsEarned: 0,
    currentRankPoints: 0,
    bestCat: '',
    longestWinStreak: 0,
    currentWinStreak: 0
  })

  const [currentEnemy, setCurrentEnemy] = useState<Enemy>({
    name: 'Киборг-Собака',
    health: 50,
    maxHealth: 50,
    reward: 5
  })

  const [damageNumbers, setDamageNumbers] = useState<DamageNumber[]>([])
  const [isAttacking, setIsAttacking] = useState(false)
  const [energyParticles, setEnergyParticles] = useState<EnergyParticle[]>([])
  const [totalBattles, setTotalBattles] = useState(0)
  const [totalWins, setTotalWins] = useState(0)
  const [totalTournaments, setTotalTournaments] = useState(0)

  // Игровые действия
  const { handleCatClick, handleBattleWin, handleCatExperience } = useGameActions({
    gameStats,
    currentEnemy,
    audioSystem,
    setGameStats,
    setCurrentEnemy,
    setDamageNumbers,
    setEnergyParticles,
    setIsAttacking
  })

  // Действия с улучшениями
  const { handleUpgrade, handleStartTournament } = useUpgradeActions(
    gameStats,
    audioSystem,
    setGameStats
  )

  // Действия с котами
  const { handlePurchaseCat, handleSelectCat, handleUpgradeStat, handleLevelUpCat } = useCatActions(
    gameStats,
    audioSystem,
    setGameStats
  )

  // Обработчик побед в битвах с обновлением счетчиков
  const handleBattleWinWithStats = (reward: number, experience: number) => {
    handleBattleWin(reward, experience)
    setTotalBattles(prev => prev + 1)
    setTotalWins(prev => prev + 1)
  }

  // Управление музыкой
  const toggleMusic = () => {
    audioSystem.backgroundMusic.toggle()
    setIsMusicPlaying(!isMusicPlaying)
  }

  // Обработчик наград из квестов
  const onRewardClaimed = (reward: any) => {
    if (reward.type === 'coins') {
      setGameStats(prev => ({ ...prev, coins: prev.coins + reward.amount }))
    } else if (reward.type === 'experience') {
      setGameStats(prev => ({ ...prev, experience: prev.experience + reward.amount }))
    }
  }

  return (
    <div className="relative min-h-screen dark">
      <GameBackground />
      
      <div className="relative z-10">
        {/* Игровая логика */}
        <GameLogic 
          gameStats={gameStats}
          audioSystem={audioSystem}
          setGameStats={setGameStats}
          setIsMusicPlaying={setIsMusicPlaying}
        />

        {/* Header */}
        <GameHeader 
          gameStats={gameStats}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={toggleMusic}
          lastSaved={lastSaved}
          onManualSave={saveProgress}
          isSaving={false}
        />

        {/* Navigation */}
        <GameNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Content */}
        <TabRenderer
          activeTab={activeTab}
          gameStats={gameStats}
          currentEnemy={currentEnemy}
          isAttacking={isAttacking}
          damageNumbers={damageNumbers}
          energyParticles={energyParticles}
          upgrades={UPGRADES}
          playerStats={playerStats}
          totalBattles={totalBattles}
          totalWins={totalWins}
          totalTournaments={totalTournaments}
          user={user}
          onCatClick={handleCatClick}
          onStartTournament={handleStartTournament}
          onPurchaseCat={handlePurchaseCat}
          onSelectCat={handleSelectCat}
          onUpgradeStat={handleUpgradeStat}
          onLevelUpCat={handleLevelUpCat}
          onBattleWin={handleBattleWinWithStats}
          onCatExperience={handleCatExperience}
          onUpgrade={handleUpgrade}
          onUpdateStats={(updates) => setPlayerStats(prev => ({ ...prev, ...updates }))}
          setActiveTab={setActiveTab}
          setGameStats={setGameStats}
          onRewardClaimed={onRewardClaimed}
        />
      </div>
    </div>
  )
}

export default Index