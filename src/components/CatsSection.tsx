import React from 'react'
import CollectionStats from '@/components/cats/CollectionStats'
import Notifications from '@/components/cats/Notifications'
import CatsGrid from '@/components/cats/CatsGrid'
import ActionButtons from '@/components/cats/ActionButtons'
import InventoryModal from '@/components/cats/InventoryModal'
import CraftingModal from '@/components/cats/CraftingModal'
import { useCats } from '@/hooks/useCats'
import { useInventory } from '@/hooks/useInventory'
import { useCrafting } from '@/hooks/useCrafting'

const CatsSection: React.FC = () => {
  const {
    cats,
    setCats,
    isCreating,
    isTraining,
    levelUpMessage,
    expGainMessage,
    handleCreateNewCat,
    handleDeleteCat,
    handleTrainCat,
    getCollectionStats,
    calculateTotalStats
  } = useCats()

  const {
    inventory,
    setInventory,
    selectedCat,
    setSelectedCat,
    showEquipment,
    setShowEquipment,
    handleFindEquipment,
    handleEquipItem,
    handleUnequipItem
  } = useInventory()

  const {
    showCrafting,
    setShowCrafting,
    materials,
    gold,
    isUpgrading,
    upgradeResult,
    craftingMaterials,
    getUpgradeRecipe,
    handleUpgradeEquipment,
    handleGatherMaterials
  } = useCrafting()

  const stats = getCollectionStats()

  const handleEquipCat = (catId: string) => {
    setSelectedCat(catId)
    setShowEquipment(true)
  }

  const handleEquipItemWrapper = (equipmentId: string) => {
    if (selectedCat) {
      const equipment = inventory.find(item => item.id === equipmentId)
      if (equipment) {
        handleEquipItem(selectedCat, equipment, setCats)
      }
    }
  }

  const handleUpgradeEquipmentWrapper = (equipmentId: string) => {
    handleUpgradeEquipment(equipmentId, inventory, setInventory)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Заголовок и статистика */}
      <CollectionStats stats={stats} />

      {/* Уведомления */}
      <Notifications 
        levelUpMessage={levelUpMessage}
        expGainMessage={expGainMessage}
      />

      {/* Сетка котов */}
      <CatsGrid
        cats={cats}
        isTraining={isTraining}
        onTrainCat={handleTrainCat}
        onEquipCat={handleEquipCat}
        onDeleteCat={handleDeleteCat}
        calculateTotalStats={calculateTotalStats}
      />

      {/* Кнопки действий */}
      <ActionButtons
        isCreating={isCreating}
        onCreateNewCat={handleCreateNewCat}
        onFindEquipment={handleFindEquipment}
        onShowCrafting={() => setShowCrafting(true)}
        onGatherMaterials={handleGatherMaterials}
      />

      {/* Модальные окна */}
      <InventoryModal
        isOpen={showEquipment && selectedCat !== null}
        onClose={() => setShowEquipment(false)}
        inventory={inventory}
        onEquipItem={handleEquipItemWrapper}
      />

      <CraftingModal
        isOpen={showCrafting}
        onClose={() => setShowCrafting(false)}
        inventory={inventory}
        materials={materials}
        gold={gold}
        craftingMaterials={craftingMaterials}
        isUpgrading={isUpgrading}
        upgradeResult={upgradeResult}
        onUpgradeEquipment={handleUpgradeEquipmentWrapper}
        getUpgradeRecipe={getUpgradeRecipe}
      />
    </div>
  )
}

export default CatsSection