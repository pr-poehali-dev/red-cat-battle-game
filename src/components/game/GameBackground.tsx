import React from 'react'
import StarField from '@/components/StarField'

export default function GameBackground() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Космический фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-darker via-space-dark to-cosmic-purple">
        <div 
          className="absolute inset-0 opacity-60 animate-nebula"
          style={{
            background: 'linear-gradient(-45deg, #6366F1, #EC4899, #8B5CF6, #06B6D4)',
            backgroundSize: '400% 400%'
          }}
        />
      </div>
      <StarField />
    </div>
  )
}