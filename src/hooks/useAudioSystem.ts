import { useState } from 'react'

// Звуковые эффекты с Web Audio API
const createAudioContext = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  
  const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.type = type
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  }
  
  return {
    // Звук атаки/клика
    playAttackSound: () => {
      createTone(800, 0.1, 'square', 0.15)
      setTimeout(() => createTone(600, 0.05, 'sawtooth', 0.1), 50)
    },
    
    // Звук получения монет
    playCoinSound: () => {
      createTone(800, 0.1, 'sine', 0.2)
      setTimeout(() => createTone(1000, 0.1, 'sine', 0.15), 100)
      setTimeout(() => createTone(1200, 0.15, 'sine', 0.1), 200)
    },
    
    // Звук левел-апа
    playLevelUpSound: () => {
      const notes = [523, 659, 784, 1047] // C, E, G, C (октава выше)
      notes.forEach((note, index) => {
        setTimeout(() => createTone(note, 0.3, 'triangle', 0.2), index * 150)
      })
    },
    
    // Звук смерти врага
    playEnemyDeathSound: () => {
      createTone(400, 0.2, 'sawtooth', 0.15)
      setTimeout(() => createTone(200, 0.3, 'square', 0.1), 100)
    },
    
    // Звук покупки улучшения
    playUpgradeSound: () => {
      createTone(1000, 0.15, 'triangle', 0.2)
      setTimeout(() => createTone(1200, 0.15, 'sine', 0.15), 75)
    },
    
    // Звук спецатаки "Звёздный Взрыв"
    playSpecialAbilitySound: () => {
      // Мощный космический взрыв
      createTone(150, 0.3, 'sawtooth', 0.25)
      setTimeout(() => createTone(300, 0.25, 'square', 0.2), 50)
      setTimeout(() => createTone(600, 0.2, 'sine', 0.18), 100)
      setTimeout(() => createTone(1200, 0.25, 'triangle', 0.15), 150)
      setTimeout(() => createTone(2400, 0.3, 'sine', 0.12), 200)
    },

    backgroundMusic: {
      oscillators: [] as OscillatorNode[],
      gainNodes: [] as GainNode[],
      isPlaying: false,

      start: function() {
        this.isPlaying = true
      },

      stop: function() {
        this.isPlaying = false
      },

      toggle: function() {
        this.isPlaying = !this.isPlaying
      }
    }
  }
}

export type AudioSystem = ReturnType<typeof createAudioContext>

export const useAudioSystem = () => {
  const [audioSystem] = useState(() => createAudioContext())
  return audioSystem
}