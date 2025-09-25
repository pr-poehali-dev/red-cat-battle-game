import { useState, useEffect } from 'react'
import StarField from '@/components/StarField'
import GameHeader from '@/components/GameHeader'
import GameNavigation from '@/components/GameNavigation'
import CatFighter from '@/components/CatFighter'
import FightArena from '@/components/FightArena'
import UpgradeShop from '@/components/UpgradeShop'
import CatShop from '@/components/CatShop'
import CatUpgrade from '@/components/CatUpgrade'
import CatBattle from '@/components/CatBattle'
import CatTournament from '@/components/CatTournament'
import CatsSection from '@/components/CatsSection'
import { useAudioSystem } from '@/hooks/useAudioSystem'
import { useAuth } from '@/hooks/useAuth'
import { useGameData } from '@/hooks/useGameData'
import { Enemy, DamageNumber, EnergyParticle, Upgrade } from '@/types/game'
import type { PlayerStats } from '@/components/tournament/RankingSystem'
import GuildSystem from '@/components/guild/GuildSystem'
import QuestSystem from '@/components/quests/QuestSystem'

function Index() {
  const [activeTab, setActiveTab] = useState('home')
  const audioSystem = useAudioSystem()
  const { user, logout } = useAuth()
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

  const handleCatClick = (event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    setIsAttacking(true)
    setTimeout(() => setIsAttacking(false), 200)
    
    // Играем звук атаки
    audioSystem.playAttackSound()

    // Add damage number animation
    const damageId = Date.now()
    setDamageNumbers(prev => [...prev, {
      id: damageId,
      damage: gameStats.clickDamage,
      x,
      y
    }])

    // Create energy particles explosion
    const particleColors = ['#06B6D4', '#8B5CF6', '#EC4899', '#FBBF24', '#6366F1']
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: x,
      y: y,
      angle: (360 / 8) * i,
      color: particleColors[Math.floor(Math.random() * particleColors.length)]
    }))
    
    setEnergyParticles(prev => [...prev, ...particles])

    // Remove animations after timeout
    setTimeout(() => {
      setDamageNumbers(prev => prev.filter(d => d.id !== damageId))
      setEnergyParticles(prev => prev.filter(p => !particles.find(particle => particle.id === p.id)))
    }, 1000)

    // Deal damage to enemy
    const newHealth = Math.max(0, currentEnemy.health - gameStats.clickDamage)
    setCurrentEnemy(prev => ({ ...prev, health: newHealth }))

    // Check if enemy is defeated
    if (newHealth <= 0) {
      // Играем звук смерти врага и получения монет
      audioSystem.playEnemyDeathSound()
      setTimeout(() => audioSystem.playCoinSound(), 200)
      
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins + currentEnemy.reward,
        experience: prev.experience + 10
      }))
      
      // Spawn new enemy
      setTimeout(() => {
        setCurrentEnemy({
          name: 'Киборг-Собака',
          health: 50 + Math.floor(Math.random() * 30),
          maxHealth: 50 + Math.floor(Math.random() * 30),
          reward: 5 + Math.floor(Math.random() * 5)
        })
      }, 500)
    }
  }

  // Level up system
  useEffect(() => {
    if (gameStats.experience >= gameStats.maxExperience) {
      // Играем звук левел-апа
      audioSystem.playLevelUpSound()
      
      setGameStats(prev => ({
        ...prev,
        level: prev.level + 1,
        experience: prev.experience - prev.maxExperience,
        maxExperience: Math.floor(prev.maxExperience * 1.5),
        power: prev.power + 50,
        clickDamage: prev.clickDamage + 5
      }))
    }
  }, [gameStats.experience, gameStats.maxExperience, audioSystem])

  // Автозапуск фоновой музыки при первом взаимодействии
  useEffect(() => {
    const startMusic = () => {
      audioSystem.backgroundMusic.start()
      setIsMusicPlaying(true)
      document.removeEventListener('click', startMusic)
    }
    
    document.addEventListener('click', startMusic)
    
    return () => {
      document.removeEventListener('click', startMusic)
    }
  }, [audioSystem])

  const toggleMusic = () => {
    audioSystem.backgroundMusic.toggle()
    setIsMusicPlaying(!isMusicPlaying)
  }

  const upgrades: Upgrade[] = [
    { name: 'Острые Когти', cost: 50, powerIncrease: 25, description: 'Увеличивает урон на 5' },
    { name: 'Быстрые Лапы', cost: 100, powerIncrease: 50, description: 'Увеличивает скорость атаки' },
    { name: 'Железные Мускулы', cost: 200, powerIncrease: 100, description: 'Удваивает урон' }
  ]

  const handleUpgrade = (upgrade: Upgrade) => {
    if (gameStats.coins >= upgrade.cost) {
      // Играем звук покупки улучшения
      audioSystem.playUpgradeSound()
      
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins - upgrade.cost,
        power: prev.power + upgrade.powerIncrease,
        clickDamage: prev.clickDamage + 5
      }))
    }
  }

  const handleStartTournament = () => {
    audioSystem.playUpgradeSound()
  }

  const handlePurchaseCat = (catId: string, cost: number) => {
    if (cost === 0 || gameStats.coins >= cost) {
      audioSystem.playUpgradeSound()
      
      // Создаем нового кота на основе ID
      const catTemplates = {
        murka: {
          id: 'murka',
          name: 'Котёнок Мурка',
          level: 1,
          experience: 0,
          maxExperience: 100,
          baseHealth: 100,
          currentHealth: 100,
          maxHealth: 100,
          baseAttack: 15,
          currentAttack: 15,
          baseDefense: 8,
          currentDefense: 8,
          baseSpeed: 12,
          currentSpeed: 12,
          rarity: 'Обычный',
          rarityColor: 'emerald',
          borderColor: 'emerald-500',
          image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg',
          upgradePoints: 0
        },
        tiger: {
          id: 'tiger',
          name: 'Космический Тигр',
          level: 5,
          experience: 0,
          maxExperience: 500,
          baseHealth: 250,
          currentHealth: 250,
          maxHealth: 250,
          baseAttack: 35,
          currentAttack: 35,
          baseDefense: 20,
          currentDefense: 20,
          baseSpeed: 25,
          currentSpeed: 25,
          rarity: 'Редкий',
          rarityColor: 'blue',
          borderColor: 'blue-500',
          image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg',
          upgradePoints: 5
        },
        phoenix: {
          id: 'phoenix',
          name: 'Звёздный Феникс',
          level: 10,
          experience: 0,
          maxExperience: 1000,
          baseHealth: 400,
          currentHealth: 400,
          maxHealth: 400,
          baseAttack: 60,
          currentAttack: 60,
          baseDefense: 35,
          currentDefense: 35,
          baseSpeed: 45,
          currentSpeed: 45,
          rarity: 'Эпический',
          rarityColor: 'purple',
          borderColor: 'purple-500',
          image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg',
          upgradePoints: 10
        },
        dragon: {
          id: 'dragon',
          name: 'Космический Дракон',
          level: 15,
          experience: 0,
          maxExperience: 1500,
          baseHealth: 600,
          currentHealth: 600,
          maxHealth: 600,
          baseAttack: 90,
          currentAttack: 90,
          baseDefense: 55,
          currentDefense: 55,
          baseSpeed: 35,
          currentSpeed: 35,
          rarity: 'Легендарный',
          rarityColor: 'yellow',
          borderColor: 'yellow-500',
          image: '/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg',
          upgradePoints: 15
        }
      }
      
      const newCat = catTemplates[catId as keyof typeof catTemplates]
      
      if (newCat) {
        setGameStats(prev => ({
          ...prev,
          coins: prev.coins - cost,
          ownedCats: [...(prev.ownedCats || []), newCat]
        }))
      }
    }
  }

  const handleUpgradeStat = (catId: string, stat: 'attack' | 'defense' | 'health' | 'speed', cost: number) => {
    if (gameStats.coins >= cost) {
      audioSystem.playUpgradeSound()
      
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins - cost,
        ownedCats: (prev.ownedCats || []).map(cat => {
          if (cat.id === catId) {
            const updates = {
              attack: { currentAttack: cat.currentAttack + 5 },
              defense: { currentDefense: cat.currentDefense + 3 },
              health: { currentHealth: cat.currentHealth + 20, maxHealth: cat.maxHealth + 20 },
              speed: { currentSpeed: cat.currentSpeed + 4 }
            }
            return { ...cat, ...updates[stat] }
          }
          return cat
        })
      }))
    }
  }

  const handleLevelUpCat = (catId: string, cost: number) => {
    if (gameStats.coins >= cost) {
      audioSystem.playLevelUpSound()
      
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins - cost,
        ownedCats: (prev.ownedCats || []).map(cat => {
          if (cat.id === catId) {
            return {
              ...cat,
              level: cat.level + 1,
              maxExperience: Math.floor(cat.maxExperience * 1.2),
              currentAttack: cat.currentAttack + 5,
              currentDefense: cat.currentDefense + 5,
              currentHealth: cat.currentHealth + 5,
              maxHealth: cat.maxHealth + 5,
              currentSpeed: cat.currentSpeed + 5,
              upgradePoints: cat.upgradePoints + 1
            }
          }
          return cat
        })
      }))
    }
  }

  const handleBattleWin = (reward: number, experience: number) => {
    audioSystem.playLevelUpSound()
    
    setGameStats(prev => ({
      ...prev,
      coins: prev.coins + reward,
      experience: prev.experience + experience
    }))
    
    setTotalBattles(prev => prev + 1)
    setTotalWins(prev => prev + 1)
  }

  const handleCatExperience = (catId: string, experience: number) => {
    setGameStats(prev => ({
      ...prev,
      ownedCats: (prev.ownedCats || []).map(cat => {
        if (cat.id === catId) {
          const newExp = cat.experience + experience
          let newLevel = cat.level
          let newMaxExp = cat.maxExperience
          let bonusStats = 0

          // Проверяем, повышается ли уровень
          if (newExp >= cat.maxExperience) {
            newLevel = cat.level + 1
            newMaxExp = Math.floor(cat.maxExperience * 1.2)
            bonusStats = 3 // Бонус за левел-ап в бою
          }

          return {
            ...cat,
            level: newLevel,
            experience: newExp >= cat.maxExperience ? newExp - cat.maxExperience : newExp,
            maxExperience: newMaxExp,
            currentAttack: cat.currentAttack + bonusStats,
            currentDefense: cat.currentDefense + bonusStats,
            currentHealth: cat.currentHealth + bonusStats,
            maxHealth: cat.maxHealth + bonusStats,
            currentSpeed: cat.currentSpeed + bonusStats,
            upgradePoints: cat.upgradePoints + (bonusStats > 0 ? 1 : 0)
          }
        }
        return cat
      })
    }))
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Космический фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-darker via-space-dark to-cosmic-purple">
        <div 
          className="absolute inset-0 opacity-60 animate-nebula"
          style={{
            background: 'linear-gradient(-45deg, #6366F1, #EC4899, #8B5CF6, #06B6D4)',
            backgroundSize: '400% 400%'
          }}
        />
      </div>
      <StarField />
      
      <div className="relative z-10">
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
        <div className="max-w-md mx-auto p-4 pb-20">
          {activeTab === 'home' && (
            <CatFighter
              gameStats={gameStats}
              currentEnemy={currentEnemy}
              isAttacking={isAttacking}
              damageNumbers={damageNumbers}
              energyParticles={energyParticles}
              onCatClick={handleCatClick}
            />
          )}

          {activeTab === 'fight' && (
            <FightArena onStartTournament={handleStartTournament} />
          )}

          {activeTab === 'shop' && (
            <CatShop
              gameStats={gameStats}
              onPurchase={handlePurchaseCat}
            />
          )}

          {activeTab === 'cats' && (
            <CatUpgrade 
              ownedCats={gameStats.ownedCats || []}
              playerCoins={gameStats.coins}
              onUpgradestat={handleUpgradeStat}
              onLevelUp={handleLevelUpCat}
            />
          )}

          {activeTab === 'battle' && (
            <CatBattle 
              ownedCats={gameStats.ownedCats || []}
              playerCoins={gameStats.coins}
              onBattleWin={handleBattleWin}
              onCatExperience={handleCatExperience}
            />
          )}

          {activeTab === 'tournament' && (
            <CatTournament 
              ownedCats={gameStats.ownedCats || []}
              playerCoins={gameStats.coins}
              playerStats={playerStats}
              playerName={user?.email?.split('@')[0] || 'Игрок'}
              onTournamentWin={handleBattleWin}
              onCatExperience={handleCatExperience}
              onUpdateStats={(updates) => setPlayerStats(prev => ({ ...prev, ...updates }))}
            />
          )}

          {activeTab === 'upgrade' && (
            <UpgradeShop
              gameStats={gameStats}
              upgrades={upgrades}
              onUpgrade={handleUpgrade}
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
              guildLevel={5}
              onRewardClaimed={(reward) => {
                if (reward.type === 'coins') {
                  setGameStats(prev => ({ ...prev, coins: prev.coins + reward.amount }))
                } else if (reward.type === 'experience') {
                  setGameStats(prev => ({ ...prev, experience: prev.experience + reward.amount }))
                }
              }}
              onBack={() => setActiveTab('home')}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Index