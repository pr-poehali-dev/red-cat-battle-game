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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 overflow-hidden">
      <StarField />
      
      {/* Modern Cosmic Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/10 to-pink-500/5 animate-pulse"></div>
        
        {/* Floating orbs with modern glow */}
        <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-2xl animate-float opacity-70"></div>
        <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-gradient-to-r from-purple-400/25 to-pink-500/25 rounded-full blur-2xl animate-float opacity-60" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/15 to-purple-600/15 rounded-full blur-3xl animate-pulse opacity-50"></div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.3)_70%)]"></div>
        
        {/* Edge lighting */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-pink-500/30 to-transparent"></div>
      </div>
      
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