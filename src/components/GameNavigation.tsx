import React from 'react'
import Icon from '@/components/ui/icon'

interface NavigationTab {
  id: string
  label: string
  icon: string
}

interface GameNavigationProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

const navigationTabs: NavigationTab[] = [
  { id: 'home', label: 'Дом', icon: 'Home' },
  { id: 'fight', label: 'Бои', icon: 'Sword' },
  { id: 'shop', label: 'Магазин', icon: 'ShoppingBag' },
  { id: 'cats', label: 'Коты', icon: 'Heart' },
  { id: 'battle', label: 'Арена', icon: 'Zap' },
  { id: 'tournament', label: 'Турнир', icon: 'Trophy' },
  { id: 'guild', label: 'Гильдии', icon: 'Shield' },
  { id: 'quests', label: 'Квесты', icon: 'Target' }
]

const GameNavigation: React.FC<GameNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-space-dark/60 backdrop-blur-lg border-b border-cosmic-purple/40">
      <div className="max-w-md mx-auto flex">
        {navigationTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 p-3 text-sm font-semibold transition-all ${
              activeTab === tab.id 
                ? 'bg-cosmic-purple/30 text-white border-b-2 border-cosmic-cyan shadow-lg shadow-cosmic-purple/50' 
                : 'text-white/70 hover:text-white hover:bg-cosmic-purple/20'
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <Icon name={tab.icon as any} size={18} />
              <span className="hidden md:block">{tab.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default GameNavigation