export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'text-gray-400 border-gray-500'
    case 'rare': return 'text-blue-400 border-blue-500'
    case 'epic': return 'text-purple-400 border-purple-500'
    case 'legendary': return 'text-yellow-400 border-yellow-500'
    default: return 'text-gray-400 border-gray-500'
  }
}

export const getRarityName = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'Обычный'
    case 'rare': return 'Редкий'
    case 'epic': return 'Эпический'
    case 'legendary': return 'Легендарный'
    default: return 'Обычный'
  }
}