import React from 'react'
import StarField from '@/components/StarField'

export default function GameBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: '#020617' }}>
      {/* Космический фон */}
      <div className="absolute inset-0" style={{ 
        background: 'linear-gradient(135deg, #020617 0%, #0F172A 35%, #6366F1 100%)'
      }}>
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