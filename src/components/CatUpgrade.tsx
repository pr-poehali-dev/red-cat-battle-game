import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { OwnedCat } from '@/types/game'

interface CatUpgradeProps {
  ownedCats: OwnedCat[]
  playerCoins: number
  onUpgradestat: (catId: string, stat: 'attack' | 'defense' | 'health' | 'speed', cost: number) => void
  onLevelUp: (catId: string, cost: number) => void
}

const CatUpgrade: React.FC<CatUpgradeProps> = ({ ownedCats, playerCoins, onUpgradestat, onLevelUp }) => {
  const [selectedCat, setSelectedCat] = useState<string | null>(null)

  const getUpgradeCost = (currentValue: number, stat: string) => {
    const baseCost = {
      attack: 50,
      defense: 40,
      health: 30,
      speed: 45
    }[stat] || 50

    return Math.floor(baseCost * Math.pow(1.5, Math.floor(currentValue / 10)))
  }

  const getLevelUpCost = (catLevel: number) => {
    return Math.floor(100 * Math.pow(2, catLevel - 1))
  }

  const canAfford = (cost: number) => {
    return playerCoins >= cost
  }

  const renderCatCard = (cat: OwnedCat) => (
    <Card key={cat.id} className={`bg-gradient-to-r from-slate-700/90 to-slate-800/90 backdrop-blur-sm border-2 border-${cat.borderColor} rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
      <CardContent className="p-4 overflow-hidden">
        {/* Заголовок кота */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${cat.rarityColor}-400/20 to-${cat.rarityColor}-500/20 p-1`}>
              <img 
                src={cat.image}
                alt={cat.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold border-${cat.borderColor} bg-slate-800 text-${cat.rarityColor}-400`}>
              {cat.level}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white">{cat.name}</h3>
            <p className={`text-sm font-semibold text-${cat.rarityColor}-400`}>
              {cat.rarity}
            </p>
            <div className="w-24 bg-slate-700/50 rounded-full h-2 mt-1">
              <div 
                className={`bg-gradient-to-r from-${cat.rarityColor}-400 to-${cat.rarityColor}-500 h-2 rounded-full transition-all duration-500`}
                style={{ width: `${(cat.experience / cat.maxExperience) * 100}%` }}
              />
            </div>
            <div className="text-xs text-white/60">
              {cat.experience}/{cat.maxExperience} опыт
            </div>
          </div>

          <Button
            onClick={() => setSelectedCat(selectedCat === cat.id ? null : cat.id)}
            size="sm"
            className={`${selectedCat === cat.id 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-slate-600 hover:bg-slate-700'
            } text-white`}
          >
            {selectedCat === cat.id ? '🔽 Свернуть' : '⚙️ Прокачать'}
          </Button>
        </div>

        {/* Панель прокачки */}
        {selectedCat === cat.id && (
          <div className="space-y-4 mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-600 overflow-hidden">
            
            {/* Повышение уровня */}
            <div className="p-3 bg-purple-500/10 rounded border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-purple-400 font-bold text-sm">📈 Повышение уровня</div>
                  <div className="text-xs text-white/70">+5 ко всем характеристикам</div>
                </div>
                <span className="text-sm font-bold text-yellow-400">{getLevelUpCost(cat.level)}</span>
              </div>
              <Button
                onClick={() => onLevelUp(cat.id, getLevelUpCost(cat.level))}
                disabled={!canAfford(getLevelUpCost(cat.level))}
                size="sm"
                className={`w-full ${canAfford(getLevelUpCost(cat.level))
                  ? 'bg-purple-500 hover:bg-purple-600'
                  : 'bg-gray-500/50 cursor-not-allowed'
                } text-white text-xs`}
              >
                {canAfford(getLevelUpCost(cat.level)) ? '⬆️ Повысить уровень' : '❌ Недостаточно монет'}
              </Button>
            </div>

            {/* Прокачка характеристик */}
            <div className="grid gap-2 overflow-hidden">
              
              {/* Здоровье */}
              <div className="flex items-center justify-between p-2 bg-red-500/10 rounded border border-red-500/20 max-w-full">
                <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden">
                  <Icon name="Heart" size={12} className="text-red-400 flex-shrink-0" />
                  <div className="min-w-0 overflow-hidden">
                    <div className="text-red-400 font-semibold text-xs truncate">Здоровье</div>
                    <div className="text-xs text-white/70 truncate">{cat.currentHealth} → {cat.currentHealth + 20}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <span className="text-xs font-bold text-yellow-400">{getUpgradeCost(cat.currentHealth, 'health')}</span>
                  <Button
                    onClick={() => onUpgradestat(cat.id, 'health', getUpgradeCost(cat.currentHealth, 'health'))}
                    disabled={!canAfford(getUpgradeCost(cat.currentHealth, 'health'))}
                    size="sm"
                    className={`${canAfford(getUpgradeCost(cat.currentHealth, 'health'))
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gray-500/50 cursor-not-allowed'
                    } text-white text-xs px-2 py-1 h-6 w-8 flex-shrink-0`}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Атака */}
              <div className="flex items-center justify-between p-2 bg-orange-500/10 rounded border border-orange-500/20 max-w-full">
                <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden">
                  <Icon name="Sword" size={12} className="text-orange-400 flex-shrink-0" />
                  <div className="min-w-0 overflow-hidden">
                    <div className="text-orange-400 font-semibold text-xs truncate">Атака</div>
                    <div className="text-xs text-white/70 truncate">{cat.currentAttack} → {cat.currentAttack + 5}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <span className="text-xs font-bold text-yellow-400">{getUpgradeCost(cat.currentAttack, 'attack')}</span>
                  <Button
                    onClick={() => onUpgradestat(cat.id, 'attack', getUpgradeCost(cat.currentAttack, 'attack'))}
                    disabled={!canAfford(getUpgradeCost(cat.currentAttack, 'attack'))}
                    size="sm"
                    className={`${canAfford(getUpgradeCost(cat.currentAttack, 'attack'))
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'bg-gray-500/50 cursor-not-allowed'
                    } text-white text-xs px-2 py-1 h-6 w-8 flex-shrink-0`}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Защита */}
              <div className="flex items-center justify-between p-2 bg-blue-500/10 rounded border border-blue-500/20 max-w-full">
                <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden">
                  <Icon name="Shield" size={12} className="text-blue-400 flex-shrink-0" />
                  <div className="min-w-0 overflow-hidden">
                    <div className="text-blue-400 font-semibold text-xs truncate">Защита</div>
                    <div className="text-xs text-white/70 truncate">{cat.currentDefense} → {cat.currentDefense + 3}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <span className="text-xs font-bold text-yellow-400">{getUpgradeCost(cat.currentDefense, 'defense')}</span>
                  <Button
                    onClick={() => onUpgradestat(cat.id, 'defense', getUpgradeCost(cat.currentDefense, 'defense'))}
                    disabled={!canAfford(getUpgradeCost(cat.currentDefense, 'defense'))}
                    size="sm"
                    className={`${canAfford(getUpgradeCost(cat.currentDefense, 'defense'))
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-500/50 cursor-not-allowed'
                    } text-white text-xs px-2 py-1 h-6 w-8 flex-shrink-0`}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Скорость */}
              <div className="flex items-center justify-between p-2 bg-yellow-500/10 rounded border border-yellow-500/20 max-w-full">
                <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden">
                  <Icon name="Zap" size={12} className="text-yellow-400 flex-shrink-0" />
                  <div className="min-w-0 overflow-hidden">
                    <div className="text-yellow-400 font-semibold text-xs truncate">Скорость</div>
                    <div className="text-xs text-white/70 truncate">{cat.currentSpeed} → {cat.currentSpeed + 4}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <span className="text-xs font-bold text-yellow-400">{getUpgradeCost(cat.currentSpeed, 'speed')}</span>
                  <Button
                    onClick={() => onUpgradestat(cat.id, 'speed', getUpgradeCost(cat.currentSpeed, 'speed'))}
                    disabled={!canAfford(getUpgradeCost(cat.currentSpeed, 'speed'))}
                    size="sm"
                    className={`${canAfford(getUpgradeCost(cat.currentSpeed, 'speed'))
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-gray-500/50 cursor-not-allowed'
                    } text-white text-xs px-2 py-1 h-6 w-8 flex-shrink-0`}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Очки улучшений */}
            {cat.upgradePoints > 0 && (
              <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                  <Icon name="Star" size={16} />
                  Доступно улучшений: {cat.upgradePoints}
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Получайте очки улучшений за повышение уровня кота
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )

  if (ownedCats.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-400 text-lg mb-2">😿 У вас пока нет котов</div>
        <div className="text-gray-500 text-sm">Купите котов в магазине, чтобы их прокачивать!</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white font-cosmic">
          ⚙️ Прокачка котов
        </h2>
        <div className="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-2">
          <Icon name="DollarSign" size={18} className="text-yellow-400" />
          <span className="text-lg font-bold text-yellow-400">{playerCoins}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {ownedCats.map(renderCatCard)}
      </div>
    </div>
  )
}

export default CatUpgrade