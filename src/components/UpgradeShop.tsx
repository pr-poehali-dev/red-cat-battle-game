import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { GameStats, Upgrade } from '@/types/game'

interface UpgradeShopProps {
  gameStats: GameStats
  upgrades: Upgrade[]
  onUpgrade: (upgrade: Upgrade) => void
}

const UpgradeShop: React.FC<UpgradeShopProps> = ({ gameStats, upgrades, onUpgrade }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4 text-white font-cosmic text-center">
        Котячья Лавка
      </h2>
      
      {/* Горизонтальная карточка кота */}
      <Card className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 border-legendary-gold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 min-h-[120px] max-h-[120px] overflow-hidden">
            
            {/* Аватар и базовая информация */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cosmic-purple/20 to-cosmic-cyan/20 p-1">
                  <img 
                    src="/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg"
                    alt="Космический Воин Мурзик"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs font-bold border-legendary-gold bg-slate-800 text-legendary-gold">
                  50
                </div>
              </div>
              
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white truncate">Космический Воин Мурзик</h3>
                <p className="text-xs font-semibold text-legendary-gold">
                  Легендарный
                </p>
                <div className="w-20 bg-slate-700/50 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-gradient-to-r from-cosmic-purple to-cosmic-cyan h-1.5 rounded-full transition-all duration-500"
                    style={{ width: '85%' }}
                  />
                </div>
                <div className="text-xs text-white/60 mt-0.5">
                  8500/10000
                </div>
              </div>
            </div>

            {/* Характеристики в компактном виде */}
            <div className="flex gap-2 flex-shrink-0">
              <div className="bg-red-500/15 rounded-lg p-2 min-w-[50px] text-center">
                <Icon name="Heart" size={12} className="text-red-400 mx-auto mb-1" />
                <div className="text-xs text-white font-semibold">2500</div>
                <div className="text-xs text-white font-semibold">/2500</div>
              </div>
              
              <div className="bg-orange-500/15 rounded-lg p-2 min-w-[40px] text-center">
                <Icon name="Sword" size={12} className="text-orange-400 mx-auto mb-1" />
                <div className="text-xs text-white font-semibold">180</div>
                <div className="text-xs text-green-400">+50</div>
              </div>
              
              <div className="bg-blue-500/15 rounded-lg p-2 min-w-[40px] text-center">
                <Icon name="Shield" size={12} className="text-blue-400 mx-auto mb-1" />
                <div className="text-xs text-white font-semibold">95</div>
                <div className="text-xs text-green-400">+25</div>
              </div>
              
              <div className="bg-yellow-500/15 rounded-lg p-2 min-w-[40px] text-center">
                <Icon name="Zap" size={12} className="text-yellow-400 mx-auto mb-1" />
                <div className="text-xs text-white font-semibold">120</div>
                <div className="text-xs text-green-400">+30</div>
              </div>
            </div>

            {/* Экипировка */}
            <div className="flex gap-1 flex-shrink-0">
              <div className="bg-purple-500/15 rounded-lg p-2 min-w-[35px] text-center">
                <Icon name="Sword" size={10} className="text-purple-400 mx-auto mb-1" />
                <div className="text-xs text-white font-medium">+7</div>
              </div>
              
              <div className="bg-cyan-500/15 rounded-lg p-2 min-w-[35px] text-center">
                <Icon name="Shield" size={10} className="text-cyan-400 mx-auto mb-1" />
                <div className="text-xs text-white font-medium">+5</div>
              </div>
              
              <div className="bg-yellow-500/15 rounded-lg p-2 min-w-[35px] text-center">
                <Icon name="Gem" size={10} className="text-yellow-400 mx-auto mb-1" />
                <div className="text-xs text-white font-medium">+3</div>
              </div>
            </div>

            {/* Цена и кнопка покупки */}
            <div className="flex flex-col gap-2 ml-auto flex-shrink-0">
              <Badge className="bg-gradient-to-r from-star-glow to-cosmic-cyan text-space-dark font-bold border border-cosmic-cyan/50 text-xs">
                12,500 🪙
              </Badge>
              <Button
                disabled={gameStats.coins < 12500}
                className="bg-gradient-to-r from-legendary-gold/80 to-yellow-600/80 hover:from-legendary-gold hover:to-yellow-600 disabled:from-legendary-gold/40 disabled:to-yellow-600/40 text-space-dark py-2 px-3 rounded-lg text-xs font-bold transition-all"
              >
                <Icon name="ShoppingCart" size={12} className="mr-1" />
                Купить
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Описание кота */}
      <Card className="bg-space-dark/60 backdrop-blur-lg border border-cosmic-purple/50 shadow-lg">
        <CardContent className="p-4">
          <h3 className="text-lg font-bold text-cosmic-cyan mb-2 flex items-center gap-2">
            <Icon name="Star" size={20} className="text-legendary-gold" />
            О Космическом Воине Мурзике
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Легендарный кибер-кот с футуристическими имплантатами и светящимися глазами. 
            Этот отважный воин прошёл через множество космических битв, заработав себе 
            репутацию непобедимого бойца. Его энергетические когти могут разрезать даже 
            самые прочные металлы, а киберпанковский стиль делает его настоящим лидером 
            среди котячьих войск.
          </p>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-cosmic-purple/10 rounded-lg p-2 border border-cosmic-purple/30">
              <div className="text-cosmic-purple font-semibold">Специальность:</div>
              <div className="text-white">Ближний бой</div>
            </div>
            <div className="bg-cosmic-cyan/10 rounded-lg p-2 border border-cosmic-cyan/30">
              <div className="text-cosmic-cyan font-semibold">Родина:</div>
              <div className="text-white">Неон-Сити</div>
            </div>
            <div className="bg-legendary-gold/10 rounded-lg p-2 border border-legendary-gold/30">
              <div className="text-legendary-gold font-semibold">Опыт битв:</div>
              <div className="text-white">500+ побед</div>
            </div>
            <div className="bg-cosmic-pink/10 rounded-lg p-2 border border-cosmic-pink/30">
              <div className="text-cosmic-pink font-semibold">Любимое блюдо:</div>
              <div className="text-white">Энергетический тунец</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UpgradeShop