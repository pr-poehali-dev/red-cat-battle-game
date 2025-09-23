import React from 'react'
import Icon from '@/components/ui/icon'

interface ActionButtonsProps {
  isCreating: boolean
  onCreateNewCat: () => void
  onFindEquipment: () => void
  onShowCrafting: () => void
  onGatherMaterials: () => void
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isCreating,
  onCreateNewCat,
  onFindEquipment,
  onShowCrafting,
  onGatherMaterials
}) => {
  return (
    <>
      {/* Кнопка создания нового кота */}
      <div className="text-center">
        <button 
          onClick={onCreateNewCat}
          disabled={isCreating}
          className="bg-gradient-to-r from-cosmic-purple to-cosmic-cyan text-white py-2 px-4 rounded font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border border-white border-t-transparent inline-block mr-2"></div>
              Исследуем космос...
            </>
          ) : (
            'Исследовать космос'
          )}
        </button>
      </div>

      {/* Кнопка поиска экипировки */}
      <div className="bg-space-dark/40 border border-cosmic-cyan/40 rounded-lg p-4 text-center">
        <Icon name="Search" size={24} className="text-white/50 mx-auto mb-2" />
        <h3 className="text-white font-semibold mb-1">Найти экипировку</h3>
        <p className="text-white/60 text-sm mb-3">Обыщите космические руины</p>
        <button 
          onClick={onFindEquipment}
          className="bg-gradient-to-r from-cosmic-cyan to-blue-500 text-white py-2 px-4 rounded font-semibold hover:shadow-lg hover:shadow-cosmic-cyan/50 transition-all hover:scale-105"
        >
          Искать предметы
        </button>
      </div>

      {/* Кнопка мастерской */}
      <div className="bg-space-dark/40 border border-yellow-500/40 rounded-lg p-4 text-center">
        <Icon name="Hammer" size={24} className="text-white/50 mx-auto mb-2" />
        <h3 className="text-white font-semibold mb-1">Мастерская</h3>
        <p className="text-white/60 text-sm mb-3">Улучшайте экипировку</p>
        <button 
          onClick={onShowCrafting}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded font-semibold hover:shadow-lg hover:shadow-yellow-500/50 transition-all hover:scale-105"
        >
          Открыть мастерскую
        </button>
      </div>

      {/* Кнопка сбора материалов */}
      <div className="bg-space-dark/40 border border-green-500/40 rounded-lg p-4 text-center">
        <Icon name="Pickaxe" size={24} className="text-white/50 mx-auto mb-2" />
        <h3 className="text-white font-semibold mb-1">Добыча ресурсов</h3>
        <p className="text-white/60 text-sm mb-3">Найдите материалы и золото</p>
        <button 
          onClick={onGatherMaterials}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105"
        >
          Собрать ресурсы
        </button>
      </div>
    </>
  )
}

export default ActionButtons