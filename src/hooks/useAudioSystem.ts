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

        // Приятная космическая мелодия - пентатоническая гамма
        const melodyNotes = [220, 247, 293, 330, 370] // A, B, D, E, F# пентатоника
        
        melodyNotes.forEach((freq, index) => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          const filterNode = audioContext.createBiquadFilter()

          // Мягкий фильтр для теплого звучания
          filterNode.type = 'lowpass'
          filterNode.frequency.setValueAtTime(1200, audioContext.currentTime)
          filterNode.Q.setValueAtTime(1, audioContext.currentTime)

          oscillator.connect(filterNode)
          filterNode.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
          oscillator.type = 'sine'

          // Приятная громкость
          gainNode.gain.setValueAtTime(0, audioContext.currentTime)
          gainNode.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 1 + index * 0.3)

          // Плавная модуляция для живого звучания
          const lfo = audioContext.createOscillator()
          const lfoGain = audioContext.createGain()
          
          lfo.frequency.setValueAtTime(0.2 + index * 0.1, audioContext.currentTime)
          lfo.type = 'sine'
          lfoGain.gain.setValueAtTime(freq * 0.01, audioContext.currentTime)
          
          lfo.connect(lfoGain)
          lfoGain.connect(oscillator.frequency)

          oscillator.start(audioContext.currentTime + index * 0.8)
          lfo.start(audioContext.currentTime + index * 0.8)

          this.oscillators.push(oscillator, lfo)
          this.gainNodes.push(gainNode, lfoGain)
        })

        // Звуки пролетающих космических объектов каждые 8-15 секунд
        const createSpaceshipSound = () => {
          const shipOsc = audioContext.createOscillator()
          const shipGain = audioContext.createGain()
          const shipFilter = audioContext.createBiquadFilter()

          shipFilter.type = 'bandpass'
          shipFilter.frequency.setValueAtTime(800, audioContext.currentTime)
          shipFilter.Q.setValueAtTime(5, audioContext.currentTime)
          
          shipOsc.connect(shipFilter)
          shipFilter.connect(shipGain)
          shipGain.connect(audioContext.destination)
          
          // Звук пролетающего корабля - Doppler эффект
          shipOsc.frequency.setValueAtTime(400, audioContext.currentTime)
          shipOsc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 2)
          shipOsc.type = 'sawtooth'

          shipGain.gain.setValueAtTime(0, audioContext.currentTime)
          shipGain.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 0.5)
          shipGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2)

          shipOsc.start(audioContext.currentTime)
          shipOsc.stop(audioContext.currentTime + 2)
          
          this.oscillators.push(shipOsc)
          this.gainNodes.push(shipGain)
        }

        // Звук кометы - высокочастотный свист
        const createCometSound = () => {
          const cometOsc = audioContext.createOscillator()
          const cometGain = audioContext.createGain()
          const cometFilter = audioContext.createBiquadFilter()

          cometFilter.type = 'highpass'
          cometFilter.frequency.setValueAtTime(2000, audioContext.currentTime)
          
          cometOsc.connect(cometFilter)
          cometFilter.connect(cometGain)
          cometGain.connect(audioContext.destination)
          
          // Быстрый свист кометы
          cometOsc.frequency.setValueAtTime(3000, audioContext.currentTime)
          cometOsc.frequency.exponentialRampToValueAtTime(1500, audioContext.currentTime + 1)
          cometOsc.type = 'sine'

          cometGain.gain.setValueAtTime(0, audioContext.currentTime)
          cometGain.gain.linearRampToValueAtTime(0.015, audioContext.currentTime + 0.2)
          cometGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1)

          cometOsc.start(audioContext.currentTime)
          cometOsc.stop(audioContext.currentTime + 1)
          
          this.oscillators.push(cometOsc)
          this.gainNodes.push(cometGain)
        }

        // Запускаем случайные звуки космических объектов
        const scheduleSpaceSounds = () => {
          if (!this.isPlaying) return
          
          // Случайный выбор между кораблем и кометой
          if (Math.random() > 0.6) {
            createSpaceshipSound()
          } else {
            createCometSound()
          }
          
          // Следующий звук через 8-15 секунд
          setTimeout(scheduleSpaceSounds, 8000 + Math.random() * 7000)
        }

        // Начинаем через 5 секунд
        setTimeout(scheduleSpaceSounds, 5000)

        // Тихий космический фон - звездная пыль
        const spaceOsc = audioContext.createOscillator()
        const spaceGain = audioContext.createGain()
        const spaceFilter = audioContext.createBiquadFilter()

        spaceFilter.type = 'lowpass'
        spaceFilter.frequency.setValueAtTime(300, audioContext.currentTime)
        
        spaceOsc.connect(spaceFilter)
        spaceFilter.connect(spaceGain)
        spaceGain.connect(audioContext.destination)
        
        spaceOsc.frequency.setValueAtTime(60, audioContext.currentTime)
        spaceOsc.type = 'sawtooth'
        
        spaceGain.gain.setValueAtTime(0, audioContext.currentTime)
        spaceGain.gain.linearRampToValueAtTime(0.008, audioContext.currentTime + 4)

        spaceOsc.start(audioContext.currentTime)
        this.oscillators.push(spaceOsc)
        this.gainNodes.push(spaceGain)

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