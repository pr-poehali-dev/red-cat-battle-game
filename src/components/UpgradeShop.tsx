import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GameStats, Upgrade } from '@/types/game'

interface UpgradeShopProps {
  gameStats: GameStats
  upgrades: Upgrade[]
  onUpgrade: (upgrade: Upgrade) => void
}

const UpgradeShop: React.FC<UpgradeShopProps> = ({ gameStats, upgrades, onUpgrade }) => {
  return (
    <div className="space-y-4">
      <Card className="bg-space-dark/80 backdrop-blur-xl border border-cosmic-purple/50 shadow-xl shadow-cosmic-purple/30">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4 text-white font-cosmic">
            Улучшения
          </h2>
          {upgrades.map((upgrade, index) => (
            <div key={index} className="border border-cosmic-purple/50 rounded-lg p-4 mb-3 bg-space-darker/50 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-white">{upgrade.name}</h3>
                  <p className="text-sm text-gray-300">{upgrade.description}</p>
                </div>
                <Badge className="bg-gradient-to-r from-star-glow to-cosmic-cyan text-space-dark font-bold border border-cosmic-cyan/50">
                  {upgrade.cost} 🪙
                </Badge>
              </div>
              <Button
                onClick={() => onUpgrade(upgrade)}
                disabled={gameStats.coins < upgrade.cost}
                className="w-full bg-gradient-to-r from-cosmic-cyan to-cosmic-blue hover:from-cosmic-blue hover:to-cosmic-cyan text-white font-bold disabled:opacity-50 border border-cosmic-cyan/50 shadow-lg shadow-cosmic-cyan/30 transition-all duration-300"
              >
                Купить (+{upgrade.powerIncrease} силы)
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default UpgradeShop