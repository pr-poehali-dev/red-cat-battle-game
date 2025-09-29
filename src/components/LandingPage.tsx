import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StarField from '@/components/StarField'
import Icon from '@/components/ui/icon'
import { useAuth } from '@/hooks/useAuth'

export default function LandingPage() {
  const { login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      icon: 'Sword',
      title: 'Эпические Бои',
      description: 'Сражайся с врагами в космических битвах и побеждай!'
    },
    {
      icon: 'Heart',
      title: 'Коллекция Котов',
      description: 'Собирай уникальных космических воинов-котов'
    },
    {
      icon: 'Trophy',
      title: 'Турниры',
      description: 'Участвуй в галактических чемпионатах'
    },
    {
      icon: 'Shield',
      title: 'Гильдии',
      description: 'Объединяйся с друзьями для великих побед'
    },
    {
      icon: 'Target',
      title: 'Квесты',
      description: 'Выполняй миссии и получай награды'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (!isLogin && password !== confirmPassword) {
        setError('Пароли не совпадают!')
        setIsLoading(false)
        return
      }

      const result = isLogin 
        ? await login(username, password)
        : await register(username, email, password)

      if (!result.success) {
        setError(result.error || 'Произошла ошибка')
      } else {
        // Успешная авторизация/регистрация - перезагружаем страницу чтобы показать игру
        window.location.reload()
      }
    } catch (err) {
      setError('Ошибка подключения к серверу')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Звёздный фон */}
      <StarField />
      
      {/* Космическая анимация */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.4) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.4) 0%, transparent 50%)'
          }}
        />
      </div>

      {/* Летающие кометы */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-80 animate-[comet1_8s_linear_infinite]">
          <div className="absolute -left-8 top-0 w-8 h-0.5 bg-gradient-to-l from-cyan-400 to-transparent opacity-60"></div>
        </div>
        <div className="absolute w-1.5 h-1.5 bg-purple-300 rounded-full opacity-70 animate-[comet2_12s_linear_infinite]" style={{animationDelay: '3s'}}>
          <div className="absolute -left-6 top-0 w-6 h-0.5 bg-gradient-to-l from-purple-300 to-transparent opacity-50"></div>
        </div>
        <div className="absolute w-1 h-1 bg-pink-300 rounded-full opacity-60 animate-[comet3_15s_linear_infinite]" style={{animationDelay: '7s'}}>
          <div className="absolute -left-4 top-0 w-4 h-0.5 bg-gradient-to-l from-pink-300 to-transparent opacity-40"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-6 text-center">
          <div className="flex items-center justify-center mb-4 animate-[fadeInDown_1s_ease-out]">
            <Icon name="Zap" size={40} className="text-purple-400 mr-3 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent animate-[glow_2s_ease-in-out_infinite]">
              CAT KOMBAT
            </h1>
          </div>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed animate-[fadeInUp_1s_ease-out_0.3s_both]">
            Самая эпическая космическая RPG, где твои коты становятся легендарными воинами галактики! 
            Сражайся, побеждай и покоряй вселенную!
          </p>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Game Info */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="text-center lg:text-left animate-[fadeInLeft_1s_ease-out_0.5s_both]">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Покори
                  <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Галактику!
                  </span>
                </h2>
                <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
                  Собирай легендарных космических котов, прокачивай их способности, участвуй в турнирах 
                  и сражайся за контроль над вселенной в самой захватывающей игре!
                </p>
              </div>

              {/* Features Animation */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl animate-[scaleIn_1s_ease-out_0.7s_both] animate-[float_3s_ease-in-out_infinite]">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name={features[currentFeature].icon} size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">{features[currentFeature].title}</h3>
                    <p className="text-white/80 text-sm">{features[currentFeature].description}</p>
                  </div>
                </div>
                
                {/* Feature indicators */}
                <div className="flex space-x-2">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentFeature ? 'bg-purple-400 w-8 shadow-lg shadow-purple-400/50' : 'bg-white/30 w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Game Stats */}
              <div className="grid grid-cols-3 gap-4 animate-[fadeInUp_1s_ease-out_0.9s_both]">
                <div className="text-center bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-4 border border-purple-300/20 shadow-lg">
                  <div className="text-3xl font-bold text-purple-400">50+</div>
                  <div className="text-white/70 text-sm">Уникальных котов</div>
                </div>
                <div className="text-center bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-lg rounded-xl p-4 border border-cyan-300/20 shadow-lg">
                  <div className="text-3xl font-bold text-cyan-400">∞</div>
                  <div className="text-white/70 text-sm">Приключений</div>
                </div>
                <div className="text-center bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-4 border border-pink-300/20 shadow-lg">
                  <div className="text-3xl font-bold text-pink-400">24/7</div>
                  <div className="text-white/70 text-sm">Онлайн битвы</div>
                </div>
              </div>

              {/* Hero Images */}
              <div className="grid md:grid-cols-2 gap-6 animate-[fadeInUp_1s_ease-out_1.1s_both]">
                <div className="relative group animate-[fadeInLeft_1s_ease-out_1.3s_both]">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <img 
                    src="/img/a919a5d2-af97-45a4-a29d-f61b41b17cb5.jpg" 
                    alt="Космическая битва котов" 
                    className="relative rounded-2xl shadow-2xl w-full h-48 object-cover border border-white/20 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h4 className="font-bold">Эпические Битвы</h4>
                    <p className="text-white/70 text-sm">Сражайся в космосе</p>
                  </div>
                </div>
                <div className="relative group animate-[fadeInRight_1s_ease-out_1.5s_both]">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <img 
                    src="/img/8bf585ab-d16a-4bbe-b240-cbe3631b173d.jpg" 
                    alt="Космический кот герой" 
                    className="relative rounded-2xl shadow-2xl w-full h-48 object-cover border border-white/20 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h4 className="font-bold">Легендарные Герои</h4>
                    <p className="text-white/70 text-sm">Собирай могучих котов</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Auth */}
            <div className="flex justify-center order-1 lg:order-2">
              <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl animate-[fadeInRight_1s_ease-out_0.6s_both] hover:scale-105 transition-all duration-500">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl text-white mb-2">Начни Приключение</CardTitle>
                  <CardDescription className="text-white/70">
                    Войди в игру или создай новый аккаунт
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={isLogin ? "login" : "register"} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10 animate-[scaleIn_1s_ease-out_0.6s_both]">
                      <TabsTrigger 
                        value="login" 
                        onClick={() => setIsLogin(true)}
                        className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                      >
                        Вход
                      </TabsTrigger>
                      <TabsTrigger 
                        value="register" 
                        onClick={() => setIsLogin(false)}
                        className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                      >
                        Регистрация
                      </TabsTrigger>
                    </TabsList>

                    <form onSubmit={handleSubmit} className="space-y-4 animate-[fadeInUp_1s_ease-out_0.8s_both]">
                      <div>
                        <Input
                          type="text"
                          placeholder="Имя игрока"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          required
                        />
                      </div>
                      
                      {!isLogin && (
                        <div>
                          <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                      )}

                      <div>
                        <Input
                          type="password"
                          placeholder="Пароль"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          required
                        />
                      </div>

                      {!isLogin && (
                        <div>
                          <Input
                            type="password"
                            placeholder="Подтвердите пароль"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                      )}

                      {/* Error Message */}
                      {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-3 py-2 rounded-lg text-sm">
                          {error}
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        className={`w-full font-semibold py-3 ${
                          isLogin 
                            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600' 
                            : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
                        } text-white shadow-lg transition-all duration-500 transform hover:scale-110 hover:shadow-xl animate-pulse`}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <Icon name="Loader2" size={20} className="animate-spin" />
                            <span>Загрузка...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <Icon name={isLogin ? "LogIn" : "UserPlus"} size={20} />
                            <span>{isLogin ? 'Войти в Игру' : 'Создать Аккаунт'}</span>
                          </div>
                        )}
                      </Button>
                    </form>

                    {/* Features Preview */}
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <p className="text-center text-white/60 text-sm mb-4">В игре тебя ждет:</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center text-purple-300">
                          <Icon name="Sword" size={16} className="mx-auto mb-1" />
                          <div>Битвы</div>
                        </div>
                        <div className="text-center text-cyan-300">
                          <Icon name="Trophy" size={16} className="mx-auto mb-1" />
                          <div>Турниры</div>
                        </div>
                        <div className="text-center text-pink-300">
                          <Icon name="Crown" size={16} className="mx-auto mb-1" />
                          <div>Рейтинги</div>
                        </div>
                      </div>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center p-6">
          <p className="text-white/60 animate-[fadeInUp_1s_ease-out_1.7s_both]">Присоединяйся к эпической космической битве! 🚀⚔️🐱</p>
        </footer>
      </div>
    </div>
  )
}