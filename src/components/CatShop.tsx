import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'
import { GameStats } from '@/types/game'

interface CatShopProps {
  gameStats: GameStats
  onPurchase: (catId: string, cost: number) => void
}

const CatShop: React.FC<CatShopProps> = ({ gameStats, onPurchase }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4 text-white font-cosmic text-center">
        🛍️ Котячий Магазин
      </h2>
      
      {/* Стартовый кот - дается при регистрации */}
      <Card className="bg-gradient-to-r from-slate-700/90 to-slate-800/90 backdrop-blur-sm border-2 border-emerald-500 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-4 sm:p-6">
          {/* Мобильная вертикальная планировка */}
          <div className="flex flex-col sm:hidden gap-4">
            {/* Аватар и имя по центру */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400/20 to-green-500/20 p-1">
                  <img 
                    src="/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg"
                    alt="Котёнок Мурка"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-sm font-bold border-emerald-500 bg-slate-800 text-emerald-400">
                  1
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-bold text-white">Котёнок Мурка</h3>
                <p className="text-sm font-semibold text-emerald-400 mb-2">
                  Обычный
                </p>
                <div className="w-32 bg-slate-700/50 rounded-full h-2 mx-auto">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: '0%' }}
                  />
                </div>
                <div className="text-sm text-white/60 mt-1">
                  0/100
                </div>
              </div>
            </div>

            {/* Характеристики в сетке */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-500/15 rounded-lg p-3 text-center border border-red-500/20">
                <Icon name="Heart" size={16} className="text-red-400 mx-auto mb-2" />
                <div className="text-sm text-white font-semibold">100/100</div>
                <div className="text-xs text-red-400">Здоровье</div>
              </div>
              
              <div className="bg-orange-500/15 rounded-lg p-3 text-center border border-orange-500/20">
                <Icon name="Sword" size={16} className="text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-white font-semibold">15</div>
                <div className="text-xs text-orange-400">Атака</div>
              </div>
              
              <div className="bg-blue-500/15 rounded-lg p-3 text-center border border-blue-500/20">
                <Icon name="Shield" size={16} className="text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-white font-semibold">8</div>
                <div className="text-xs text-blue-400">Защита</div>
              </div>
              
              <div className="bg-yellow-500/15 rounded-lg p-3 text-center border border-yellow-500/20">
                <Icon name="Zap" size={16} className="text-yellow-400 mx-auto mb-2" />
                <div className="text-sm text-white font-semibold">12</div>
                <div className="text-xs text-yellow-400">Скорость</div>
              </div>
            </div>

            {/* Экипировка */}
            <div className="flex justify-center gap-3">
              <div className="bg-gray-500/15 rounded-lg p-2 min-w-[50px] text-center border border-gray-500/20">
                <Icon name="Sword" size={14} className="text-gray-400 mx-auto mb-1" />
                <div className="text-xs text-white/40 font-medium">—</div>
              </div>
              
              <div className="bg-gray-500/15 rounded-lg p-2 min-w-[50px] text-center border border-gray-500/20">
                <Icon name="Shield" size={14} className="text-gray-400 mx-auto mb-1" />
                <div className="text-xs text-white/40 font-medium">—</div>
              </div>
              
              <div className="bg-gray-500/15 rounded-lg p-2 min-w-[50px] text-center border border-gray-500/20">
                <Icon name="Gem" size={14} className="text-gray-400 mx-auto mb-1" />
                <div className="text-xs text-white/40 font-medium">—</div>
              </div>
            </div>

            {/* Статус */}
            <div className="flex flex-col gap-3 items-center">
              <Badge className="bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold border border-emerald-500/50 text-sm px-4 py-2">
                🎁 БЕСПЛАТНО
              </Badge>
              <div className="text-center bg-emerald-500/10 rounded-lg p-2 border border-emerald-500/30 w-full">
                <div className="text-emerald-400 font-semibold text-sm">✨ Подарок при регистрации!</div>
                <div className="text-white/70 text-xs mt-1">Ваш первый спутник</div>
              </div>
            </div>
          </div>

          {/* Планшетная и десктопная горизонтальная планировка */}
          <div className="hidden sm:flex items-center gap-3 min-h-[140px] overflow-hidden">
            
            {/* Аватар и базовая информация */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="relative">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-emerald-400/20 to-green-500/20 p-1">
                  <img 
                    src="/img/33f4e16d-16ec-43d8-84f4-6fe73741ec6a.jpg"
                    alt="Котёнок Мурка"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 lg:w-7 lg:h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-sm font-bold border-emerald-500 bg-slate-800 text-emerald-400">
                  1
                </div>
              </div>
              
              <div className="min-w-0">
                <h3 className="text-base lg:text-lg font-bold text-white">Котёнок Мурка</h3>
                <p className="text-sm font-semibold text-emerald-400 mb-2">
                  Обычный
                </p>
                <div className="w-28 lg:w-32 bg-slate-700/50 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: '0%' }}
                  />
                </div>
                <div className="text-sm text-white/60 mt-1">
                  0/100
                </div>
              </div>
            </div>

            {/* Характеристики в компактном виде */}
            <div className="flex gap-1 flex-shrink-0 overflow-visible">
              <div className="bg-red-500/15 rounded-lg p-1.5 min-w-[38px] text-center border border-red-500/20">
                <Icon name="Heart" size={10} className="text-red-400 mx-auto mb-0.5" />
                <div className="text-xs text-white font-semibold leading-tight">100</div>
                <div className="text-xs text-white font-semibold leading-tight">/100</div>
              </div>
              
              <div className="bg-orange-500/15 rounded-lg p-1.5 min-w-[32px] text-center border border-orange-500/20">
                <Icon name="Sword" size={10} className="text-orange-400 mx-auto mb-0.5" />
                <div className="text-xs text-white font-semibold leading-tight">15</div>
              </div>
              
              <div className="bg-blue-500/15 rounded-lg p-1.5 min-w-[32px] text-center border border-blue-500/20">
                <Icon name="Shield" size={10} className="text-blue-400 mx-auto mb-0.5" />
                <div className="text-xs text-white font-semibold leading-tight">8</div>
              </div>
              
              <div className="bg-yellow-500/15 rounded-lg p-1.5 min-w-[32px] text-center border border-yellow-500/20">
                <Icon name="Zap" size={10} className="text-yellow-400 mx-auto mb-0.5" />
                <div className="text-xs text-white font-semibold leading-tight">12</div>
              </div>
            </div>

            {/* Экипировка */}
            <div className="flex gap-1 flex-shrink-0">
              <div className="bg-gray-500/15 rounded-lg p-2 min-w-[30px] text-center border border-gray-500/20">
                <Icon name="Sword" size={10} className="text-gray-400 mx-auto mb-1" />
                <div className="text-xs text-white/40 font-medium">—</div>
              </div>
              
              <div className="bg-gray-500/15 rounded-lg p-2 min-w-[30px] text-center border border-gray-500/20">
                <Icon name="Shield" size={10} className="text-gray-400 mx-auto mb-1" />
                <div className="text-xs text-white/40 font-medium">—</div>
              </div>
              
              <div className="bg-gray-500/15 rounded-lg p-2 min-w-[30px] text-center border border-gray-500/20">
                <Icon name="Gem" size={10} className="text-gray-400 mx-auto mb-1" />
                <div className="text-xs text-white/40 font-medium">—</div>
              </div>
            </div>

            {/* Статус */}
            <div className="flex flex-col gap-3 ml-auto flex-shrink-0">
              <Badge className="bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold border border-emerald-500/50 text-sm px-3 py-1">
                🎁 БЕСПЛАТНО
              </Badge>
              <div className="text-center bg-emerald-500/10 rounded-lg p-1 border border-emerald-500/30 min-w-[120px]">
                <div className="text-emerald-400 font-semibold text-xs">✨ Подарок</div>
                <div className="text-white/70 text-xs">при регистрации!</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


    </div>
  )
}

export default CatShop