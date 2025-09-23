import React from 'react'
import CatCard from '@/components/cats/CatCard'
import { BattleCat } from '@/types/cats'

interface CatsGridProps {
  cats: BattleCat[]
  isTraining: string | null
  onTrainCat: (catId: string) => void
  onEquipCat: (catId: string) => void
  onDeleteCat: (catId: string) => void
  calculateTotalStats: (cat: BattleCat) => {
    totalAttack: number
    totalDefense: number
    totalSpeed: number
    totalHealth: number
  }
}

const CatsGrid: React.FC<CatsGridProps> = ({
  cats,
  isTraining,
  onTrainCat,
  onEquipCat,
  onDeleteCat,
  calculateTotalStats
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cats.map(cat => (
        <CatCard
          key={cat.id}
          cat={cat}
          isTraining={isTraining === cat.id}
          onTrain={() => onTrainCat(cat.id)}
          onEquip={() => onEquipCat(cat.id)}
          onDelete={() => onDeleteCat(cat.id)}
          canDelete={cats.length > 1 && cat.id !== 'default-cat'}
          calculateTotalStats={calculateTotalStats}
        />
      ))}
    </div>
  )
}

export default CatsGrid