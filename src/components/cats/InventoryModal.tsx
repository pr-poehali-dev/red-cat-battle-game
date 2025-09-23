import React from 'react'
import Icon from '@/components/ui/icon'
import { Equipment } from '@/types/cats'
import { getRarityColor, getRarityName } from '@/utils/catHelpers'

interface InventoryModalProps {
  isOpen: boolean
  onClose: () => void
  inventory: Equipment[]
  onEquipItem: (equipmentId: string) => void
}

const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  inventory,
  onEquipItem
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-space-dark/90 backdrop-blur-lg border border-cosmic-purple/50 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-cosmic-purple/30">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Icon name="Package" size={20} />
              Инвентарь
            </h3>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {inventory.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Package" size={32} className="text-white/30 mx-auto mb-2" />
              <p className="text-white/60">Инвентарь пуст</p>
              <p className="text-white/40 text-sm">Найдите экипировку в космосе</p>
            </div>
          ) : (
            inventory.map(equipment => (
              <div key={equipment.id} className={`border-2 rounded-lg p-3 ${getRarityColor(equipment.rarity)}`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{equipment.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{equipment.name}</h4>
                    <p className={`text-sm ${getRarityColor(equipment.rarity).split(' ')[0]}`}>
                      {getRarityName(equipment.rarity)} {equipment.type === 'weapon' ? 'Оружие' : equipment.type === 'armor' ? 'Броня' : 'Аксессуар'} • Ур. {equipment.level || 1}
                    </p>
                    <div className="text-xs text-white/70 mt-1">
                      {Object.entries(equipment.bonuses).map(([key, value]) => (
                        <span key={key} className="mr-2">+{value} {key}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => onEquipItem(equipment.id)}
                    className="bg-cosmic-purple/30 hover:bg-cosmic-purple/50 text-white px-3 py-1 rounded text-sm font-semibold transition-all"
                  >
                    Надеть
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default InventoryModal