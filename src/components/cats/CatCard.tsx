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
    <div className={`bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 ${getRarityColor(cat.rarity)} rounded-xl p-4 transition-all duration-300 hover:shadow-xl flex items-center gap-4 min-h-[120px] max-h-[120px] overflow-hidden`}>
      
      {/* Аватар и базовая информация */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cosmic-purple/20 to-cosmic-cyan/20 p-1">
            <img 
              src={getAvatarUrl(cat.id)}
              alt={cat.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold ${getRarityColor(cat.rarity).split(' ')[0]} bg-slate-800`}>
            {cat.level}
          </div>
        </div>
        
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-white truncate">{cat.name}</h3>
          <p className={`text-xs font-semibold ${getRarityColor(cat.rarity).split(' ')[0]}`}>
            {getRarityName(cat.rarity)}
          </p>
          <div className="w-20 bg-slate-700/50 rounded-full h-1.5 mt-1">
            <div 
              className="bg-gradient-to-r from-cosmic-purple to-cosmic-cyan h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(cat.experience / cat.maxExperience) * 100}%` }}
            />
          </div>
          <div className="text-xs text-white/60 mt-0.5">
            {cat.experience}/{cat.maxExperience}
          </div>
        </div>
      </div>

      {/* Характеристики в компактном виде */}
      <div className="flex gap-2 flex-shrink-0">
        <div className="bg-red-500/15 rounded-lg p-2 min-w-[50px] text-center">
          <Icon name="Heart" size={12} className="text-red-400 mx-auto mb-1" />
          <div className="text-xs text-white font-semibold">{cat.health}</div>
          <div className="text-xs text-white font-semibold">/{totalHealth}</div>
        </div>
        
        <div className="bg-orange-500/15 rounded-lg p-2 min-w-[40px] text-center">
          <Icon name="Sword" size={12} className="text-orange-400 mx-auto mb-1" />
          <div className="text-xs text-white font-semibold">{totalAttack}</div>
          {totalAttack !== cat.attack && (
            <div className="text-xs text-green-400">+{totalAttack - cat.attack}</div>
          )}
        </div>
        
        <div className="bg-blue-500/15 rounded-lg p-2 min-w-[40px] text-center">
          <Icon name="Shield" size={12} className="text-blue-400 mx-auto mb-1" />
          <div className="text-xs text-white font-semibold">{totalDefense}</div>
          {totalDefense !== cat.defense && (
            <div className="text-xs text-green-400">+{totalDefense - cat.defense}</div>
          )}
        </div>
        
        <div className="bg-yellow-500/15 rounded-lg p-2 min-w-[40px] text-center">
          <Icon name="Zap" size={12} className="text-yellow-400 mx-auto mb-1" />
          <div className="text-xs text-white font-semibold">{totalSpeed}</div>
          {totalSpeed !== cat.speed && (
            <div className="text-xs text-green-400">+{totalSpeed - cat.speed}</div>
          )}
        </div>
      </div>

      {/* Экипировка */}
      <div className="flex gap-1 flex-shrink-0">
        <div className="bg-purple-500/15 rounded-lg p-2 min-w-[35px] text-center">
          <Icon name="Sword" size={10} className="text-purple-400 mx-auto mb-1" />
          <div className="text-xs text-white font-medium">
            {cat.equipment.weapon ? `+${cat.equipment.weapon.level || 1}` : '—'}
          </div>
        </div>
        
        <div className="bg-cyan-500/15 rounded-lg p-2 min-w-[35px] text-center">
          <Icon name="Shield" size={10} className="text-cyan-400 mx-auto mb-1" />
          <div className="text-xs text-white font-medium">
            {cat.equipment.armor ? `+${cat.equipment.armor.level || 1}` : '—'}
          </div>
        </div>
        
        <div className="bg-yellow-500/15 rounded-lg p-2 min-w-[35px] text-center">
          <Icon name="Gem" size={10} className="text-yellow-400 mx-auto mb-1" />
          <div className="text-xs text-white font-medium">
            {cat.equipment.accessory ? `+${cat.equipment.accessory.level || 1}` : '—'}
          </div>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-2 ml-auto flex-shrink-0">
        <button 
          onClick={onTrain}
          disabled={isTraining}
          className="bg-gradient-to-r from-purple-600/80 to-purple-500/80 hover:from-purple-600 hover:to-purple-500 disabled:from-purple-600/40 disabled:to-purple-500/40 disabled:cursor-not-allowed text-white py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center gap-1"
        >
          {isTraining ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
              <span className="hidden sm:inline">Тренировка...</span>
            </>
          ) : (
            <>
              <Icon name="Dumbbell" size={12} />
              <span className="hidden sm:inline">Тренировать</span>
            </>
          )}
        </button>
        
        <button 
          onClick={onEquip}
          className="bg-gradient-to-r from-cyan-600/80 to-cyan-500/80 hover:from-cyan-600 hover:to-cyan-500 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center gap-1"
        >
          <Icon name="Package" size={12} />
          <span className="hidden sm:inline">Экипировка</span>
        </button>
      </div>

      {/* Кнопка удаления */}
      {canDelete && (
        <button
          onClick={onDelete}
          className="text-red-400/60 hover:text-red-400 p-1 rounded-lg hover:bg-red-400/10 transition-all flex-shrink-0"
        >
          <Icon name="Trash2" size={14} />
        </button>
      )}
    </div>
  )
}

export default CatCard