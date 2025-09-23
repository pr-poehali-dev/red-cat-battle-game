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

    // Фоновая космическая музыка
    backgroundMusic: {
      oscillators: [] as OscillatorNode[],
      gainNodes: [] as GainNode[],
      isPlaying: false,

      start: function() {
        if (this.isPlaying) return

        // Создаем гармонические слои для космического звучания
        const baseFreq = 110 // Нота ля (низкая октава)
        const harmonics = [1, 1.5, 2, 2.5, 3] // Гармоники

        harmonics.forEach((harmonic, index) => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          const filterNode = audioContext.createBiquadFilter()

          // Настройка фильтра для мягкого звучания
          filterNode.type = 'lowpass'
          filterNode.frequency.setValueAtTime(800, audioContext.currentTime)
          filterNode.Q.setValueAtTime(0.5, audioContext.currentTime)

          oscillator.connect(filterNode)
          filterNode.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.setValueAtTime(baseFreq * harmonic, audioContext.currentTime)
          oscillator.type = index % 2 === 0 ? 'sine' : 'triangle'

          // Очень тихий фон
          gainNode.gain.setValueAtTime(0, audioContext.currentTime)
          gainNode.gain.linearRampToValueAtTime(0.02 / (index + 1), audioContext.currentTime + 2 + index * 0.5)

          // Медленная модуляция для космического эффекта
          const lfo = audioContext.createOscillator()
          const lfoGain = audioContext.createGain()
          
          lfo.frequency.setValueAtTime(0.1 + index * 0.02, audioContext.currentTime)
          lfo.type = 'sine'
          lfoGain.gain.setValueAtTime(baseFreq * harmonic * 0.005, audioContext.currentTime)
          
          lfo.connect(lfoGain)
          lfoGain.connect(oscillator.frequency)

          oscillator.start(audioContext.currentTime + index * 0.5)
          lfo.start(audioContext.currentTime + index * 0.5)

          this.oscillators.push(oscillator)
          this.gainNodes.push(gainNode)
        })

        // Добавляем космический "ветер"
        const noiseOsc = audioContext.createOscillator()
        const noiseGain = audioContext.createGain()
        const noiseFilter = audioContext.createBiquadFilter()

        noiseFilter.type = 'highpass'
        noiseFilter.frequency.setValueAtTime(2000, audioContext.currentTime)
        
        noiseOsc.connect(noiseFilter)
        noiseFilter.connect(noiseGain)
        noiseGain.connect(audioContext.destination)
        
        noiseOsc.frequency.setValueAtTime(50, audioContext.currentTime)
        noiseOsc.type = 'sawtooth'
        
        noiseGain.gain.setValueAtTime(0, audioContext.currentTime)
        noiseGain.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 3)

        noiseOsc.start(audioContext.currentTime)
        this.oscillators.push(noiseOsc)
        this.gainNodes.push(noiseGain)

        this.isPlaying = true
      },

      stop: function() {
        if (!this.isPlaying) return

        // Плавно затухаем
        this.gainNodes.forEach(gainNode => {
          gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1)
        })

        // Останавливаем через секунду
        const self = this
        setTimeout(() => {
          self.oscillators.forEach(osc => {
            try { osc.stop() } catch (e) { /* игнорируем ошибки */ }
          })
          self.oscillators = []
          self.gainNodes = []
          self.isPlaying = false
        }, 1000)
      },

      toggle: function() {
        if (this.isPlaying) {
          this.stop()
        } else {
          this.start()
        }
      }
    }
  }
}

export const useAudioSystem = () => {
  const [audioSystem] = useState(() => createAudioContext())
  return audioSystem
}