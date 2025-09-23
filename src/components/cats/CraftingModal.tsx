import React from 'react'
import Icon from '@/components/ui/icon'
import { Equipment, CraftingMaterial, UpgradeRecipe } from '@/types/cats'
import { getRarityColor, getRarityName } from '@/utils/catHelpers'

interface CraftingModalProps {
  isOpen: boolean
  onClose: () => void
  inventory: Equipment[]
  materials: Record<string, number>
  gold: number
  craftingMaterials: Record<string, CraftingMaterial>
  isUpgrading: string | null
  upgradeResult: { success: boolean; message: string } | null
  onUpgradeEquipment: (equipmentId: string) => void
  getUpgradeRecipe: (equipment: Equipment) => UpgradeRecipe
}

const CraftingModal: React.FC<CraftingModalProps> = ({
  isOpen,
  onClose,
  inventory,
  materials,
  gold,
  craftingMaterials,
  isUpgrading,
  upgradeResult,
  onUpgradeEquipment,
  getUpgradeRecipe
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-space-dark/90 backdrop-blur-lg border border-yellow-500/50 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-yellow-500/30">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Icon name="Hammer" size={20} />
              Мастерская улучшений
            </h3>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {/* Ресурсы игрока */}
          <div className="bg-space-dark/60 rounded-lg p-4 mb-4">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Icon name="Coins" size={16} />
              Ваши ресурсы
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-yellow-500/20 border border-yellow-500/40 rounded p-2 text-center">
                <div className="text-yellow-400 font-bold">{gold}</div>
                <div className="text-white/70 text-sm">💰 Золото</div>
              </div>
              {Object.entries(materials).map(([materialId, amount]) => {
                const material = craftingMaterials[materialId]
                if (!material) return null
                return (
                  <div key={materialId} className={`border rounded p-2 text-center ${getRarityColor(material.rarity)}`}>
                    <div className="text-white font-bold">{amount}</div>
                    <div className="text-white/70 text-sm">{material.icon} {material.name}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Список экипировки для улучшения */}
          <h4 className="text-white font-semibold mb-3">Улучшить экипировку</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {inventory.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Package" size={32} className="text-white/30 mx-auto mb-2" />
                <p className="text-white/60">Инвентарь пуст</p>
              </div>
            ) : (
              inventory.map(equipment => {
                const recipe = getUpgradeRecipe(equipment)
                const canUpgrade = recipe.materialsCost.every(cost => (materials[cost.materialId] || 0) >= cost.amount) && gold >= recipe.goldCost
                
                return (
                  <div key={equipment.id} className={`border-2 rounded-lg p-3 ${getRarityColor(equipment.rarity)}`}>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{equipment.icon}</div>
                      <div className="flex-1">
                        <h5 className="text-white font-semibold">{equipment.name}</h5>
                        <p className={`text-sm ${getRarityColor(equipment.rarity).split(' ')[0]}`}>
                          {getRarityName(equipment.rarity)} • Уровень {equipment.level || 1}
                        </p>
                        <div className="text-xs text-white/70 mt-1">
                          {Object.entries(equipment.bonuses).map(([key, value]) => (
                            <span key={key} className="mr-2">+{value} {key}</span>
                          ))}
                        </div>
                        
                        {/* Стоимость улучшения */}
                        <div className="mt-2 text-xs">
                          <div className="text-white/60 mb-1">Стоимость улучшения:</div>
                          <div className="flex flex-wrap gap-2">
                            {recipe.materialsCost.map(cost => {
                              const material = craftingMaterials[cost.materialId]
                              const hasEnough = (materials[cost.materialId] || 0) >= cost.amount
                              return (
                                <span key={cost.materialId} className={hasEnough ? 'text-green-400' : 'text-red-400'}>
                                  {material?.icon} {cost.amount}
                                </span>
                              )
                            })}
                            <span className={gold >= recipe.goldCost ? 'text-green-400' : 'text-red-400'}>
                              💰 {recipe.goldCost}
                            </span>
                          </div>
                          <div className="text-white/50 text-xs mt-1">
                            Шанс успеха: {recipe.successRate}%
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onUpgradeEquipment(equipment.id)}
                        disabled={!canUpgrade || isUpgrading === equipment.id}
                        className={`px-3 py-2 rounded text-sm font-semibold transition-all ${
                          canUpgrade && isUpgrading !== equipment.id
                            ? 'bg-yellow-500/30 hover:bg-yellow-500/50 text-white'
                            : 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {isUpgrading === equipment.id ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent inline-block mr-1"></div>
                            Улучшение...
                          </>
                        ) : (
                          'Улучшить'
                        )}
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Результат улучшения */}
          {upgradeResult && (
            <div className={`mt-4 p-3 rounded-lg text-center ${
              upgradeResult.success ? 'bg-green-500/20 border border-green-500/40' : 'bg-red-500/20 border border-red-500/40'
            }`}>
              <p className={upgradeResult.success ? 'text-green-400' : 'text-red-400'}>
                {upgradeResult.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CraftingModal