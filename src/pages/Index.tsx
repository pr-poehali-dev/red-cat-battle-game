import { useState, useEffect } from 'react'
import StarField from '@/components/StarField'
import GameHeader from '@/components/GameHeader'
import GameNavigation from '@/components/GameNavigation'
import CatFighter from '@/components/CatFighter'
import FightArena from '@/components/FightArena'
import UpgradeShop from '@/components/UpgradeShop'
import CatShop from '@/components/CatShop'
import CatsSection from '@/components/CatsSection'
import { useAudioSystem } from '@/hooks/useAudioSystem'
import { useAuth } from '@/hooks/useAuth'
import { useGameData } from '@/hooks/useGameData'
import { Enemy, DamageNumber, EnergyParticle, Upgrade } from '@/types/game'

function Index() {
  const [activeTab, setActiveTab] = useState('home')
  const audioSystem = useAudioSystem()
  const { user, logout } = useAuth()
  const { gameStats, setGameStats, saveProgress, lastSaved } = useGameData()
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  const [currentEnemy, setCurrentEnemy] = useState<Enemy>({
    name: 'Киборг-Собака',
    health: 50,
    maxHealth: 50,
    reward: 5
  })

  const [damageNumbers, setDamageNumbers] = useState<DamageNumber[]>([])
  const [isAttacking, setIsAttacking] = useState(false)
  const [energyParticles, setEnergyParticles] = useState<EnergyParticle[]>([])

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
    if (gameStats.coins >= cost) {
      audioSystem.playUpgradeSound()
      
      setGameStats(prev => ({
        ...prev,
        coins: prev.coins - cost
      }))
      
      // Здесь можно добавить логику добавления кота в коллекцию
      console.log(`Purchased cat ${catId} for ${cost} coins`)
    }
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
            <CatsSection />
          )}

          {activeTab === 'upgrade' && (
            <UpgradeShop
              gameStats={gameStats}
              upgrades={upgrades}
              onUpgrade={handleUpgrade}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Index