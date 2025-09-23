import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import StarField from '@/components/StarField'
import Icon from '@/components/ui/icon'
import { useAuth } from '@/hooks/useAuth'

interface LandingPageProps {
  onLogin?: (username: string, token: string) => void
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const { login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = isLogin 
        ? await login(username, password)
        : await register(username, email, password)

      if (!result.success) {
        setError(result.error || 'Произошла ошибка')
      }
    } catch (err) {
      setError('Ошибка подключения к серверу')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-space-dark via-cosmic-purple/20 to-space-dark overflow-hidden">
      <StarField />
      
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan/10 via-transparent to-cosmic-pink/10 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-cyan/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cosmic-pink/20 rounded-full blur-3xl animate-float"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          
          {/* Game Logo */}
          <div className="text-center space-y-4">

            <h1 className="text-5xl font-cosmic font-bold bg-gradient-to-r from-cosmic-cyan via-white to-cosmic-pink bg-clip-text text-transparent drop-shadow-2xl">
              CAT KOMBAT
            </h1>
            <p className="text-xl text-cosmic-cyan/80 font-semibold drop-shadow-lg">
              Космическая битва котов-воинов
            </p>
          </div>

          {/* Auth Card */}
          <Card className="bg-space-dark/90 backdrop-blur-xl border-2 border-cosmic-cyan shadow-2xl shadow-cosmic-cyan/30">
            <CardHeader className="text-center pb-2">
              <div className="flex space-x-1 bg-space-dark/50 rounded-lg p-1">
                <Button
                  variant={isLogin ? "default" : "ghost"}
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 ${isLogin ? 'bg-cosmic-cyan text-space-dark' : 'text-cosmic-cyan hover:bg-cosmic-cyan/20'}`}
                >
                  Вход
                </Button>
                <Button
                  variant={!isLogin ? "default" : "ghost"}
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 ${!isLogin ? 'bg-cosmic-pink text-space-dark' : 'text-cosmic-pink hover:bg-cosmic-pink/20'}`}
                >
                  Регистрация
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Имя игрока</label>
                  <Input
                    type="text"
                    placeholder="Введите имя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-space-dark/50 border-cosmic-cyan/50 text-white placeholder:text-gray-400 focus:border-cosmic-cyan"
                  />
                </div>

                {/* Email Field (Registration only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Email</label>
                    <Input
                      type="email"
                      placeholder="Введите email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-space-dark/50 border-cosmic-pink/50 text-white placeholder:text-gray-400 focus:border-cosmic-pink"
                    />
                  </div>
                )}

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Пароль</label>
                  <Input
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-space-dark/50 border-cosmic-cyan/50 text-white placeholder:text-gray-400 focus:border-cosmic-cyan"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-3 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-12 font-bold text-lg ${
                    isLogin 
                      ? 'bg-gradient-to-r from-cosmic-cyan to-cosmic-cyan/80 hover:from-cosmic-cyan/90 hover:to-cosmic-cyan text-space-dark' 
                      : 'bg-gradient-to-r from-cosmic-pink to-cosmic-pink/80 hover:from-cosmic-pink/90 hover:to-cosmic-pink text-space-dark'
                  } shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Icon name="Loader2" size={20} className="animate-spin" />
                      <span>Загрузка...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Icon name={isLogin ? "LogIn" : "UserPlus"} size={20} />
                      <span>{isLogin ? 'Войти в игру' : 'Создать аккаунт'}</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Game Features */}
              <div className="pt-4 border-t border-cosmic-cyan/30">
                <div className="text-center space-y-2">
                  <p className="text-xs text-gray-400">Особенности игры:</p>
                  <div className="flex justify-around text-xs text-cosmic-cyan">
                    <div className="flex items-center space-x-1">
                      <Icon name="Zap" size={12} />
                      <span>Эпические бои</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="TrendingUp" size={12} />
                      <span>Прокачка</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Crown" size={12} />
                      <span>Рейтинги</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500">
            <p>Присоединяйся к космической битве! 🚀</p>
          </div>
        </div>
      </div>
    </div>
  )
}