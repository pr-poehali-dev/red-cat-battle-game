import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { GameStats } from '@/types/game'

interface CatManagerProps {
  gameStats: GameStats
  onSelectCat: (catId: string) => void
}

const CatManager: React.FC<CatManagerProps> = ({ gameStats, onSelectCat }) => {
  const ownedCats = gameStats.ownedCats || []
  const activeCat = ownedCats.find(cat => cat.id === gameStats.activeCatId)

  if (ownedCats.length === 0) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white mb-2">🐱 Мои Коты</h1>
        <p className="text-white/70">У вас пока нет котов. Купите их в магазине!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">🐱 Мои Коты</h1>
        <p className="text-white/70">Выберите активного кота для боя</p>
      </div>

      {/* Активный кот */}
      {activeCat && (
        <Card className={`bg-gradient-to-r from-slate-700/90 to-slate-800/90 backdrop-blur-sm border-2 border-${activeCat.borderColor} shadow-lg shadow-${activeCat.rarityColor}-500/50 rounded-xl overflow-hidden`}>
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-white mb-1">⭐ Активный Боец</h2>
              <p className="text-white/70 text-sm">Ваш текущий кот в бою</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative flex-shrink-0">
                <img 
                  src={activeCat.image} 
                  alt={activeCat.name}
                  className="w-24 h-24 rounded-full border-4 border-white/20 shadow-lg"
                />
                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold bg-${activeCat.rarityColor}-500 text-white shadow-lg flex items-center justify-center border-2 border-slate-800`}>
                  {activeCat.level}
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <h3 className="text-2xl font-bold text-white">{activeCat.name}</h3>
                  <Badge className={`bg-${activeCat.rarityColor}-500 text-white text-xs px-2 py-0.5`}>
                    {activeCat.rarity}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-red-500/20 px-2 py-1.5 rounded-lg">
                    <span className="text-red-300">❤️ {activeCat.health}</span>
                  </div>
                  <div className="bg-orange-500/20 px-2 py-1.5 rounded-lg">
                    <span className="text-orange-300">⚔️ {activeCat.attack}</span>
                  </div>
                  <div className="bg-blue-500/20 px-2 py-1.5 rounded-lg">
                    <span className="text-blue-300">🛡️ {activeCat.defense}</span>
                  </div>
                  <div className="bg-green-500/20 px-2 py-1.5 rounded-lg">
                    <span className="text-green-300">⚡ {activeCat.speed}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Список котов */}
      <div className="space-y-4">
        {ownedCats.map(cat => (
          <Card 
            key={cat.id} 
            className={`bg-gradient-to-r from-slate-700/90 to-slate-800/90 backdrop-blur-sm border-2 rounded-xl shadow-xl overflow-hidden ${
              gameStats.activeCatId === cat.id 
                ? `border-${cat.borderColor} shadow-lg shadow-${cat.rarityColor}-500/50` 
                : 'border-slate-600'
            }`}
          >
            <CardContent className="p-0">
              <div className="flex">
                {/* Аватар кота */}
                <div className="w-32 h-32 flex-shrink-0 relative">
                  <div className={`w-full h-full bg-gradient-to-br from-${cat.rarityColor}-400/20 to-${cat.rarityColor}-500/20 p-2`}>
                    <img 
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>
                  <div className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold border-${cat.borderColor} bg-slate-800 text-${cat.rarityColor}-400`}>
                    {cat.level}
                  </div>
                  {gameStats.activeCatId === cat.id && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      ✅ АКТИВЕН
                    </div>
                  )}
                </div>

                {/* Описание и характеристики */}
                <div className="flex-1 p-4 space-y-3">
                  {/* Заголовок */}
                  <div>
                    <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                    <Badge className={`bg-gradient-to-r from-${cat.rarityColor}-400 to-${cat.rarityColor}-500 text-white font-bold border border-${cat.rarityColor}-500/50 text-xs`}>
                      {cat.rarity}
                    </Badge>
                  </div>

                  {/* Характеристики */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1">
                      <Icon name="Heart" size={14} className="text-red-400" />
                      <span className="text-xs text-white/70">{cat.currentHealth}/{cat.maxHealth} HP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Sword" size={14} className="text-orange-400" />
                      <span className="text-xs text-white/70">{cat.currentAttack} ATK</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Shield" size={14} className="text-blue-400" />
                      <span className="text-xs text-white/70">{cat.currentDefense} DEF</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Zap" size={14} className="text-yellow-400" />
                      <span className="text-xs text-white/70">{cat.currentSpeed} SPD</span>
                    </div>
                  </div>

                  {/* Кнопка выбора */}
                  <div className="pt-2">
                    {gameStats.activeCatId === cat.id ? (
                      <div className="text-center bg-green-500/10 rounded-lg p-2 border border-green-500/30">
                        <div className="text-green-400 font-semibold text-sm">✅ Сейчас в бою</div>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => onSelectCat(cat.id)}
                        className={`w-full bg-gradient-to-r from-${cat.rarityColor}-500 to-${cat.rarityColor}-600 hover:from-${cat.rarityColor}-600 hover:to-${cat.rarityColor}-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200`}
                      >
                        🎯 Выбрать для боя
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CatManager