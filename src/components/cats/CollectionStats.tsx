import React from 'react'
import { getRarityColor } from '@/utils/catHelpers'

interface CollectionStatsProps {
  stats: {
    total: number
    byRarity: {
      common: number
      rare: number
      epic: number
      legendary: number
    }
    totalLevel: number
  }
}

const CollectionStats: React.FC<CollectionStatsProps> = ({ stats }) => {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold text-white">Космические Коты-Воители 🚀</h2>
      <div className="flex justify-center gap-6 text-sm">
        <div className="text-white/70">
          Всего котов: <span className="text-white font-semibold">{stats.total}</span>
        </div>
        <div className="text-white/70">
          Общий уровень: <span className="text-white font-semibold">{stats.totalLevel}</span>
        </div>
      </div>
      <div className="flex justify-center gap-4 text-xs">
        <div className={`${getRarityColor('common').split(' ')[0]} font-semibold`}>
          Обычные: {stats.byRarity.common}
        </div>
        <div className={`${getRarityColor('rare').split(' ')[0]} font-semibold`}>
          Редкие: {stats.byRarity.rare}
        </div>
        <div className={`${getRarityColor('epic').split(' ')[0]} font-semibold`}>
          Эпические: {stats.byRarity.epic}
        </div>
        <div className={`${getRarityColor('legendary').split(' ')[0]} font-semibold`}>
          Легендарные: {stats.byRarity.legendary}
        </div>
      </div>
    </div>
  )
}

export default CollectionStats