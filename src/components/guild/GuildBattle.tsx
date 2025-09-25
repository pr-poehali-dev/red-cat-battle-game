import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Icon from '@/components/ui/icon'
import type { Guild, GuildMember, TeamBattle } from './GuildTypes'
import type { Cat } from '@/types/game'

interface GuildBattleProps {
  playerGuild: Guild
  opponentGuild: Guild
  playerCats: Cat[]
  onBattleComplete: (won: boolean, rewards: { coins: number; experience: number }) => void
  onBack: () => void
}

export default function GuildBattle({ playerGuild, opponentGuild, playerCats, onBattleComplete, onBack }: GuildBattleProps) {
  const [battleState, setBattleState] = useState<'preparation' | 'active' | 'completed'>('preparation')
  const [selectedCats, setSelectedCats] = useState<Cat[]>([])
  const [battleProgress, setBattleProgress] = useState(0)
  const [currentRound, setCurrentRound] = useState(1)
  const [playerScore, setPlayerScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [battleLog, setBattleLog] = useState<string[]>([])

  const maxCats = 5 // 5v5 формат

  const startBattle = () => {
    if (selectedCats.length === maxCats) {
      setBattleState('active')
      setBattleProgress(0)
      setCurrentRound(1)
      setPlayerScore(0)
      setOpponentScore(0)
      setBattleLog(['🚀 Битва гильдий началась!'])
      
      // Симуляция боя
      const battleTimer = setInterval(() => {
        setBattleProgress(prev => {
          const newProgress = prev + Math.random() * 10 + 5
          
          if (newProgress >= 100) {
            clearInterval(battleTimer)
            // Определяем результат
            const finalPlayerScore = Math.floor(Math.random() * 5) + 1
            const finalOpponentScore = Math.floor(Math.random() * 5) + 1
            
            setPlayerScore(finalPlayerScore)
            setOpponentScore(finalOpponentScore)
            setBattleState('completed')
            
            const won = finalPlayerScore > finalOpponentScore
            const rewards = {
              coins: won ? 15000 : 5000,
              experience: won ? 3000 : 1000
            }
            
            setBattleLog(prev => [
              ...prev,
              `⚔️ Финальный счёт: ${playerGuild.name} ${finalPlayerScore} - ${finalOpponentScore} ${opponentGuild.name}`,
              won ? '🏆 Победа! Вы получили награды!' : '😔 Поражение, но вы всё равно получили награды за участие!'
            ])
            
            setTimeout(() => onBattleComplete(won, rewards), 2000)
            return 100
          }
          
          // Добавляем события в лог
          if (Math.random() > 0.7) {
            const events = [
              `🐱 ${selectedCats[Math.floor(Math.random() * selectedCats.length)].name} наносит критический удар!`,
              `⚡ Команда ${playerGuild.name} использует комбо-атаку!`,
              `🛡️ Защита ${opponentGuild.name} держится стойко!`,
              `🔥 Интенсивные бои продолжаются!`,
              `⭐ Появляется мощное заклинание!`
            ]
            setBattleLog(prev => [...prev.slice(-4), events[Math.floor(Math.random() * events.length)]])
          }
          
          return newProgress
        })
      }, 800)
    }
  }

  const toggleCatSelection = (cat: Cat) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter(c => c.id !== cat.id))
    } else if (selectedCats.length < maxCats) {
      setSelectedCats([...selectedCats, cat])
    }
  }

  const renderPreparation = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-2 border-orange-500">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            ⚔️ Подготовка к битве гильдий
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <div className={`text-4xl mb-2 p-4 rounded-full bg-gradient-to-r ${playerGuild.color} bg-opacity-20`}>
                {playerGuild.banner}
              </div>
              <h3 className="text-xl font-bold">{playerGuild.name}</h3>
              <Badge className="mt-1">[{playerGuild.tag}]</Badge>
              <p className="text-sm text-gray-400 mt-2">Уровень {playerGuild.level}</p>
            </div>
            
            <div className="text-center px-8">
              <div className="text-6xl animate-pulse">⚔️</div>
              <p className="text-lg font-bold mt-2">VS</p>
              <p className="text-sm text-gray-400">5 на 5</p>
            </div>
            
            <div className="text-center flex-1">
              <div className={`text-4xl mb-2 p-4 rounded-full bg-gradient-to-r ${opponentGuild.color} bg-opacity-20`}>
                {opponentGuild.banner}
              </div>
              <h3 className="text-xl font-bold">{opponentGuild.name}</h3>
              <Badge className="mt-1">[{opponentGuild.tag}]</Badge>
              <p className="text-sm text-gray-400 mt-2">Уровень {opponentGuild.level}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Выберите {maxCats} котов для битвы ({selectedCats.length}/{maxCats})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {playerCats.slice(0, 12).map(cat => (
              <Card
                key={cat.id}
                className={`cursor-pointer transition-all ${
                  selectedCats.includes(cat)
                    ? 'border-2 border-green-500 bg-green-900/20'
                    : 'hover:border-blue-500'
                }`}
                onClick={() => toggleCatSelection(cat)}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-2xl mb-1">{cat.image}</div>
                  <p className="font-semibold text-sm">{cat.name}</p>
                  <p className="text-xs text-gray-400">Сила: {cat.power}</p>
                  {selectedCats.includes(cat) && (
                    <Badge className="mt-1 bg-green-600">Выбран</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedCats.length === maxCats && (
            <div className="mt-6 text-center">
              <Button
                onClick={startBattle}
                className="bg-gradient-to-r from-red-600 to-orange-600 text-lg px-8 py-3"
              >
                <Icon name="Sword" size={20} className="mr-2" />
                Начать битву!
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderActiveBattle = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            ⚔️ Битва в разгаре! Раунд {currentRound}/3
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{playerScore}</p>
                <p className="text-sm">{playerGuild.name}</p>
              </div>
              <div className="text-center flex-1 mx-4">
                <Progress value={battleProgress} className="h-4 mb-2" />
                <p className="text-sm text-gray-400">Прогресс битвы: {Math.round(battleProgress)}%</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-400">{opponentScore}</p>
                <p className="text-sm">{opponentGuild.name}</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-6xl animate-bounce">⚔️</div>
              <p className="text-lg font-bold mt-2">Эпичная битва!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Выбранные коты */}
      <Card>
        <CardHeader>
          <CardTitle>Ваша команда в бою</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3">
            {selectedCats.map(cat => (
              <div key={cat.id} className="text-center p-2 bg-blue-900/20 rounded-lg">
                <div className="text-2xl mb-1 animate-pulse">{cat.image}</div>
                <p className="text-xs font-semibold">{cat.name}</p>
                <p className="text-xs text-gray-400">{cat.power}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Лог битвы */}
      <Card>
        <CardHeader>
          <CardTitle>События битвы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {battleLog.map((log, index) => (
              <p key={index} className="text-sm p-2 bg-gray-800/30 rounded">
                {log}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCompleted = () => (
    <div className="space-y-6">
      <Card className={`bg-gradient-to-r ${
        playerScore > opponentScore 
          ? 'from-green-900/30 to-emerald-900/30 border-green-500' 
          : 'from-red-900/30 to-orange-900/30 border-red-500'
      }`}>
        <CardHeader>
          <CardTitle className="text-center text-3xl">
            {playerScore > opponentScore ? '🏆 ПОБЕДА!' : '😔 Поражение'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl">
              {playerScore > opponentScore ? '🎉' : '💔'}
            </div>
            
            <div className="text-2xl font-bold">
              {playerGuild.name} {playerScore} - {opponentScore} {opponentGuild.name}
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-yellow-900/30 p-4 rounded-lg">
                <p className="text-yellow-400 font-bold text-lg">
                  {playerScore > opponentScore ? '15,000' : '5,000'} 💰
                </p>
                <p className="text-sm text-gray-400">Монеты</p>
              </div>
              <div className="bg-blue-900/30 p-4 rounded-lg">
                <p className="text-blue-400 font-bold text-lg">
                  {playerScore > opponentScore ? '3,000' : '1,000'} ⭐
                </p>
                <p className="text-sm text-gray-400">Опыт</p>
              </div>
            </div>
            
            <p className="text-gray-300">
              {playerScore > opponentScore 
                ? 'Отличная командная работа! Ваша гильдия показала себя достойно!'
                : 'Не расстраивайтесь! Каждая битва делает вас сильнее!'
              }
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <Button onClick={onBack} className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Icon name="Home" size={16} className="mr-2" />
          Вернуться к гильдиям
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline">
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад
        </Button>
        
        <h1 className="text-2xl font-bold">⚔️ Битва Гильдий</h1>
        
        <div className="text-right">
          <Badge className={
            battleState === 'preparation' ? 'bg-yellow-600' :
            battleState === 'active' ? 'bg-red-600' : 'bg-green-600'
          }>
            {battleState === 'preparation' ? 'Подготовка' :
             battleState === 'active' ? 'В бою' : 'Завершено'}
          </Badge>
        </div>
      </div>
      
      {battleState === 'preparation' && renderPreparation()}
      {battleState === 'active' && renderActiveBattle()}
      {battleState === 'completed' && renderCompleted()}
    </div>
  )
}