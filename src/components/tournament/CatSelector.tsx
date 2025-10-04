import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Cat } from '@/types/game'

interface CatSelectorProps {
  ownedCats: Cat[]
  onSelectCat: (cat: Cat) => void
}

export default function CatSelector({ ownedCats, onSelectCat }: CatSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Выбери кота-бойца</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ownedCats.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              У тебя нет котов для турниров
            </p>
          ) : (
            ownedCats.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => onSelectCat(cat)}
                variant="outline"
                className="h-auto flex-col p-4 space-y-2 relative overflow-hidden"
              >
                {cat.image && (
                  <div className="w-full h-24 mb-2 rounded-lg overflow-hidden">
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!cat.image && <div className="text-3xl">{cat.emoji}</div>}
                <div className="font-semibold">{cat.name}</div>
                <div className="text-sm text-gray-600">Ур. {cat.level}</div>
                <div className="text-xs">
                  ⚔️{cat.currentAttack} 🛡️{cat.currentDefense} ❤️{cat.currentHealth} ⚡{cat.currentSpeed}
                </div>
              </Button>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}