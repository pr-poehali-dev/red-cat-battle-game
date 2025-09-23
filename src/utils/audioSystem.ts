class AudioSystem {
  private audioContext: AudioContext | null = null
  private volume = 0.3
  private backgroundMusicGain: GainNode | null = null
  private backgroundMusicNodes: OscillatorNode[] = []
  private isBackgroundMusicPlaying = false
  private backgroundMusicVolume = 0.15

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return this.audioContext
  }

  private createBeep(frequency: number, duration: number, type: OscillatorType = 'sine') {
    const context = this.initAudioContext()
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)

    oscillator.frequency.setValueAtTime(frequency, context.currentTime)
    oscillator.type = type

    gainNode.gain.setValueAtTime(0, context.currentTime)
    gainNode.gain.linearRampToValueAtTime(this.volume, context.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration)

    oscillator.start(context.currentTime)
    oscillator.stop(context.currentTime + duration)
  }

  playClickSound() {
    this.createBeep(800, 0.1, 'square')
  }

  playAttackSound() {
    const context = this.initAudioContext()
    
    // Первый звук атаки
    setTimeout(() => this.createBeep(1200, 0.05, 'square'), 0)
    // Второй звук для эффекта "пиу-пиу"
    setTimeout(() => this.createBeep(1000, 0.05, 'square'), 50)
  }

  playCoinSound() {
    // Мелодичное "динь-динь-динь"
    setTimeout(() => this.createBeep(800, 0.1, 'sine'), 0)
    setTimeout(() => this.createBeep(1000, 0.1, 'sine'), 100)
    setTimeout(() => this.createBeep(1200, 0.1, 'sine'), 200)
  }

  playLevelUpSound() {
    // Торжественная мелодия левел-апа
    const notes = [523, 659, 784, 1047] // До, Ми, Соль, До октавой выше
    notes.forEach((note, index) => {
      setTimeout(() => this.createBeep(note, 0.3, 'triangle'), index * 150)
    })
  }

  playEnemyDeathSound() {
    // Драматичный звук поражения врага
    const context = this.initAudioContext()
    
    // Низкий удар
    this.createBeep(100, 0.2, 'sawtooth')
    // Высокий взрыв
    setTimeout(() => this.createBeep(2000, 0.1, 'square'), 100)
  }

  playUpgradeSound() {
    // Приятный звук покупки улучшения
    setTimeout(() => this.createBeep(600, 0.1, 'triangle'), 0)
    setTimeout(() => this.createBeep(800, 0.1, 'triangle'), 80)
  }

  // Космическая фоновая музыка
  startBackgroundMusic() {
    if (this.isBackgroundMusicPlaying) return

    const context = this.initAudioContext()
    this.backgroundMusicGain = context.createGain()
    this.backgroundMusicGain.connect(context.destination)
    this.backgroundMusicGain.gain.setValueAtTime(this.backgroundMusicVolume, context.currentTime)

    // Создаем несколько гармонических слоев для космического звука
    const baseFreq = 220 // Нота ля
    const harmonics = [1, 1.5, 2, 3, 4] // Гармоники для богатого звучания
    
    harmonics.forEach((harmonic, index) => {
      this.createBackgroundOscillator(baseFreq * harmonic, 'sine', index * 0.1)
    })

    // Добавляем медленные модуляции для космического эффекта
    this.createModulatedBackground()
    
    this.isBackgroundMusicPlaying = true
  }

  private createBackgroundOscillator(frequency: number, type: OscillatorType, delay: number) {
    const context = this.initAudioContext()
    if (!this.backgroundMusicGain) return

    const oscillator = context.createOscillator()
    const gainNode = context.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.backgroundMusicGain)
    
    oscillator.frequency.setValueAtTime(frequency, context.currentTime)
    oscillator.type = type
    
    // Очень тихий звук для фона
    gainNode.gain.setValueAtTime(0, context.currentTime + delay)
    gainNode.gain.linearRampToValueAtTime(0.1, context.currentTime + delay + 2)
    
    // Медленные колебания частоты для космического эффекта
    const lfo = context.createOscillator()
    const lfoGain = context.createGain()
    
    lfo.frequency.setValueAtTime(0.1, context.currentTime) // Очень медленные колебания
    lfo.type = 'sine'
    lfoGain.gain.setValueAtTime(frequency * 0.01, context.currentTime) // Небольшая модуляция
    
    lfo.connect(lfoGain)
    lfoGain.connect(oscillator.frequency)
    
    oscillator.start(context.currentTime + delay)
    lfo.start(context.currentTime + delay)
    
    this.backgroundMusicNodes.push(oscillator)
  }

  private createModulatedBackground() {
    const context = this.initAudioContext()
    if (!this.backgroundMusicGain) return

    // Создаем дополнительный слой с фильтром для космического звука
    const oscillator = context.createOscillator()
    const filter = context.createBiquadFilter()
    const gainNode = context.createGain()
    
    oscillator.frequency.setValueAtTime(55, context.currentTime) // Очень низкая частота
    oscillator.type = 'sawtooth'
    
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(200, context.currentTime)
    filter.Q.setValueAtTime(10, context.currentTime)
    
    // Модуляция фильтра для "космического ветра"
    const filterLfo = context.createOscillator()
    const filterLfoGain = context.createGain()
    
    filterLfo.frequency.setValueAtTime(0.05, context.currentTime)
    filterLfo.type = 'sine'
    filterLfoGain.gain.setValueAtTime(150, context.currentTime)
    
    filterLfo.connect(filterLfoGain)
    filterLfoGain.connect(filter.frequency)
    
    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.backgroundMusicGain)
    
    gainNode.gain.setValueAtTime(0, context.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.05, context.currentTime + 3)
    
    oscillator.start(context.currentTime)
    filterLfo.start(context.currentTime)
    
    this.backgroundMusicNodes.push(oscillator)
  }

  stopBackgroundMusic() {
    if (!this.isBackgroundMusicPlaying) return

    const context = this.initAudioContext()
    
    // Плавно затухаем музыку
    if (this.backgroundMusicGain) {
      this.backgroundMusicGain.gain.linearRampToValueAtTime(0, context.currentTime + 1)
    }
    
    // Останавливаем все осцилляторы через секунду
    setTimeout(() => {
      this.backgroundMusicNodes.forEach(node => {
        try {
          node.stop()
        } catch (e) {
          // Игнорируем ошибки если узел уже остановлен
        }
      })
      this.backgroundMusicNodes = []
      this.backgroundMusicGain = null
      this.isBackgroundMusicPlaying = false
    }, 1000)
  }

  toggleBackgroundMusic() {
    if (this.isBackgroundMusicPlaying) {
      this.stopBackgroundMusic()
    } else {
      this.startBackgroundMusic()
    }
  }

  isPlayingBackgroundMusic() {
    return this.isBackgroundMusicPlaying
  }
}

export const audioSystem = new AudioSystem()