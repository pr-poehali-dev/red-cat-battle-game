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
  
  // Генерируем уникальный аватар на основе ID кота
  const getAvatarUrl = (id: string) => {
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=1e1b4b,312e81,3730a3,1e40af,1d4ed8`
  }

  return (
    <div className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 ${getRarityColor(cat.rarity)} rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
      {/* Хедер с аватаром и основной информацией */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cosmic-purple/20 to-cosmic-cyan/20 p-1">
            <img 
              src={getAvatarUrl(cat.id)}
              alt={cat.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold ${getRarityColor(cat.rarity).split(' ')[0]} bg-slate-800`}>
            {cat.level}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{cat.name}</h3>
          <p className={`text-sm font-semibold ${getRarityColor(cat.rarity).split(' ')[0]} mb-2`}>
            {getRarityName(cat.rarity)}
          </p>
          
          {/* Полоска опыта */}
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cosmic-purple to-cosmic-cyan h-2 rounded-full transition-all duration-500"
              style={{ width: `${(cat.experience / cat.maxExperience) * 100}%` }}
            />
          </div>
          <div className="text-xs text-white/60 mt-1">
            {cat.experience}/{cat.maxExperience} опыта
          </div>
        </div>

        {canDelete && (
          <button
            onClick={onDelete}
            className="text-red-400/60 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-all"
          >
            <Icon name="Trash2" size={16} />
          </button>
        )}
      </div>

      {/* Компактные характеристики */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
          <div className="flex items-center gap-2">
            <Icon name="Heart" size={16} className="text-red-400" />
            <span className="text-white font-semibold">{cat.health}/{totalHealth}</span>
            {totalHealth !== cat.maxHealth && (
              <span className="text-green-400 text-xs">+{totalHealth - cat.maxHealth}</span>
            )}
          </div>
        </div>
        
        <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
          <div className="flex items-center gap-2">
            <Icon name="Sword" size={16} className="text-orange-400" />
            <span className="text-white font-semibold">{totalAttack}</span>
            {totalAttack !== cat.attack && (
              <span className="text-green-400 text-xs">+{totalAttack - cat.attack}</span>
            )}
          </div>
        </div>
        
        <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={16} className="text-blue-400" />
            <span className="text-white font-semibold">{totalDefense}</span>
            {totalDefense !== cat.defense && (
              <span className="text-green-400 text-xs">+{totalDefense - cat.defense}</span>
            )}
          </div>
        </div>
        
        <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
          <div className="flex items-center gap-2">
            <Icon name="Zap" size={16} className="text-yellow-400" />
            <span className="text-white font-semibold">{totalSpeed}</span>
            {totalSpeed !== cat.speed && (
              <span className="text-green-400 text-xs">+{totalSpeed - cat.speed}</span>
            )}
          </div>
        </div>
      </div>

      {/* Экипировка в один ряд */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 bg-purple-500/10 rounded-lg p-2 border border-purple-500/20 text-center">
          <Icon name="Sword" size={14} className="text-purple-400 mx-auto mb-1" />
          {cat.equipment.weapon ? (
            <div className="text-xs text-white font-medium">+{cat.equipment.weapon.level || 1}</div>
          ) : (
            <div className="text-xs text-white/40">—</div>
          )}
        </div>
        
        <div className="flex-1 bg-cyan-500/10 rounded-lg p-2 border border-cyan-500/20 text-center">
          <Icon name="Shield" size={14} className="text-cyan-400 mx-auto mb-1" />
          {cat.equipment.armor ? (
            <div className="text-xs text-white font-medium">+{cat.equipment.armor.level || 1}</div>
          ) : (
            <div className="text-xs text-white/40">—</div>
          )}
        </div>
        
        <div className="flex-1 bg-yellow-500/10 rounded-lg p-2 border border-yellow-500/20 text-center">
          <Icon name="Gem" size={14} className="text-yellow-400 mx-auto mb-1" />
          {cat.equipment.accessory ? (
            <div className="text-xs text-white font-medium">+{cat.equipment.accessory.level || 1}</div>
          ) : (
            <div className="text-xs text-white/40">—</div>
          )}
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-2">
        <button 
          onClick={onTrain}
          disabled={isTraining}
          className="flex-1 bg-gradient-to-r from-purple-600/80 to-purple-500/80 hover:from-purple-600 hover:to-purple-500 disabled:from-purple-600/40 disabled:to-purple-500/40 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
        >
          {isTraining ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Тренировка...
            </>
          ) : (
            <>
              <Icon name="Dumbbell" size={16} />
              Тренировать
            </>
          )}
        </button>
        
        <button 
          onClick={onEquip}
          className="flex-1 bg-gradient-to-r from-cyan-600/80 to-cyan-500/80 hover:from-cyan-600 hover:to-cyan-500 text-white py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
        >
          <Icon name="Package" size={16} />
          Экипировка
        </button>
      </div>
    </div>
  )
}

export default CatCard