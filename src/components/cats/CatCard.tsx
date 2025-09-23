import React from 'react'
import Icon from '@/components/ui/icon'
import { BattleCat, Equipment } from '@/types/cats'
import { getRarityColor, getRarityName } from '@/utils/catHelpers'

interface CatCardProps {
  cat: BattleCat
  isTraining: boolean
  onTrain: () => void
  onEquip: () => void
  onDelete: () => void
  canDelete: boolean
  calculateTotalStats: (cat: BattleCat) => {
    totalAttack: number
    totalDefense: number
    totalSpeed: number
    totalHealth: number
  }
}

const CatCard: React.FC<CatCardProps> = ({
  cat,
  isTraining,
  onTrain,
  onEquip,
  onDelete,
  canDelete,
  calculateTotalStats
}) => {
  const { totalAttack, totalDefense, totalSpeed, totalHealth } = calculateTotalStats(cat)

  return (
    <div className={`bg-space-dark/60 border-2 ${getRarityColor(cat.rarity)} rounded-lg p-4 transition-all hover:shadow-lg hover:shadow-cosmic-purple/30`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{cat.image}</div>
          <div>
            <h3 className="text-lg font-bold text-white">{cat.name}</h3>
            <p className={`text-sm font-semibold ${getRarityColor(cat.rarity).split(' ')[0]}`}>
              {getRarityName(cat.rarity)} • Уровень {cat.level}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right min-w-[80px]">
            <div className="text-sm text-white/70">Опыт</div>
            <div className="text-white font-semibold">{cat.experience}/{cat.maxExperience}</div>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
              <div 
                className="bg-gradient-to-r from-cosmic-purple to-cosmic-cyan h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(cat.experience / cat.maxExperience) * 100}%` }}
              ></div>
            </div>
          </div>
          {canDelete && (
            <button
              onClick={onDelete}
              className="text-red-400 hover:text-red-300 p-1 transition-colors"
              title="Удалить кота"
            >
              <Icon name="Trash2" size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-3">
        <div className="text-center">
          <div className="text-sm text-white/70">❤️ Здоровье</div>
          <div className="text-white font-semibold">
            {cat.health}/{totalHealth}
            {totalHealth !== cat.maxHealth && <span className="text-green-400 text-xs ml-1">(+{totalHealth - cat.maxHealth})</span>}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-white/70">⚔️ Атака</div>
          <div className="text-white font-semibold">
            {totalAttack}
            {totalAttack !== cat.attack && <span className="text-green-400 text-xs ml-1">(+{totalAttack - cat.attack})</span>}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-white/70">🛡️ Защита</div>
          <div className="text-white font-semibold">
            {totalDefense}
            {totalDefense !== cat.defense && <span className="text-green-400 text-xs ml-1">(+{totalDefense - cat.defense})</span>}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-white/70">⚡ Скорость</div>
          <div className="text-white font-semibold">
            {totalSpeed}
            {totalSpeed !== cat.speed && <span className="text-green-400 text-xs ml-1">(+{totalSpeed - cat.speed})</span>}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <h4 className="text-white font-semibold text-sm mb-1">Экипировка:</h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center bg-cosmic-purple/20 rounded p-2">
            <div className="text-xs text-white/70 mb-1">⚔️ Оружие</div>
            {cat.equipment.weapon ? (
              <div className="text-xs text-white" title={cat.equipment.weapon.name}>
                {cat.equipment.weapon.icon} +{cat.equipment.weapon.level || 1}
              </div>
            ) : (
              <div className="text-xs text-white/40">⚪ Пусто</div>
            )}
          </div>
          <div className="text-center bg-cosmic-cyan/20 rounded p-2">
            <div className="text-xs text-white/70 mb-1">🛡️ Броня</div>
            {cat.equipment.armor ? (
              <div className="text-xs text-white" title={cat.equipment.armor.name}>
                {cat.equipment.armor.icon} +{cat.equipment.armor.level || 1}
              </div>
            ) : (
              <div className="text-xs text-white/40">⚪ Пусто</div>
            )}
          </div>
          <div className="text-center bg-yellow-500/20 rounded p-2">
            <div className="text-xs text-white/70 mb-1">💍 Аксессуар</div>
            {cat.equipment.accessory ? (
              <div className="text-xs text-white" title={cat.equipment.accessory.name}>
                {cat.equipment.accessory.icon} +{cat.equipment.accessory.level || 1}
              </div>
            ) : (
              <div className="text-xs text-white/40">⚪ Пусто</div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <h4 className="text-white font-semibold text-sm mb-2">Способности:</h4>
        <div className="space-y-1">
          {cat.abilities.map((ability, index) => (
            <div key={index} className="text-xs text-white/80 bg-cosmic-purple/20 px-2 py-1 rounded">
              {ability}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs text-white/60 italic">{cat.description}</p>
      </div>

      <div className="flex gap-2 pt-2">
        <button 
          onClick={onTrain}
          disabled={isTraining}
          className="flex-1 bg-cosmic-purple/30 hover:bg-cosmic-purple/50 disabled:bg-cosmic-purple/20 disabled:cursor-not-allowed text-white py-2 px-3 rounded text-sm font-semibold transition-all flex items-center justify-center gap-1"
        >
          {isTraining ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
              Тренируется...
            </>
          ) : (
            <>
              <Icon name="Dumbbell" size={14} />
              Тренировать
            </>
          )}
        </button>
        <button 
          onClick={onEquip}
          className="flex-1 bg-cosmic-cyan/30 hover:bg-cosmic-cyan/50 text-white py-2 px-3 rounded text-sm font-semibold transition-all flex items-center justify-center gap-1"
        >
          <Icon name="Package" size={14} />
          Экипировать
        </button>
      </div>
    </div>
  )
}

export default CatCard