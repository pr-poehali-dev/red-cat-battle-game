import { useState, useEffect } from 'react'

interface User {
  id: number
  username: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  isLoading: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true
  })

  // Check for existing session on mount
  useEffect(() => {
    const checkStoredAuth = () => {
      try {
        const storedToken = localStorage.getItem('catKombatToken')
        const storedUser = localStorage.getItem('catKombatUser')
        
        if (storedToken && storedUser) {
          // Verify token is not expired (basic check)
          const tokenPayload = JSON.parse(atob(storedToken.split('.')[1]))
          const isExpired = tokenPayload.exp * 1000 < Date.now()
          
          if (!isExpired) {
            setAuthState({
              isAuthenticated: true,
              user: JSON.parse(localStorage.getItem('catKombatUserData') || '{}'),
              token: storedToken,
              isLoading: false
            })
            return
          } else {
            // Clear expired token
            localStorage.removeItem('catKombatToken')
            localStorage.removeItem('catKombatUser')
            localStorage.removeItem('catKombatUserData')
          }
        }
      } catch (error) {
        console.error('Auth check error:', error)
        // Clear invalid data
        localStorage.removeItem('catKombatToken')
        localStorage.removeItem('catKombatUser')
        localStorage.removeItem('catKombatUserData')
      }
      
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }

    checkStoredAuth()
  }, [])

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('https://functions.poehali.dev/154f9a14-edb0-4cfb-afa1-1eec25db4707', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store auth data
        localStorage.setItem('catKombatToken', data.token)
        localStorage.setItem('catKombatUser', data.user.username)
        localStorage.setItem('catKombatUserData', JSON.stringify(data.user))
        
        setAuthState({
          isAuthenticated: true,
          user: data.user,
          token: data.token,
          isLoading: false
        })
        
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Ошибка входа' }
      }
    } catch (error) {
      return { success: false, error: 'Ошибка подключения к серверу' }
    }
  }

  const register = async (username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('https://functions.poehali.dev/154f9a14-edb0-4cfb-afa1-1eec25db4707', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, action: 'register' })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store auth data
        localStorage.setItem('catKombatToken', data.token)
        localStorage.setItem('catKombatUser', data.user.username)
        localStorage.setItem('catKombatUserData', JSON.stringify(data.user))
        
        setAuthState({
          isAuthenticated: true,
          user: data.user,
          token: data.token,
          isLoading: false
        })
        
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Ошибка регистрации' }
      }
    } catch (error) {
      return { success: false, error: 'Ошибка подключения к серверу' }
    }
  }

  const logout = () => {
    localStorage.removeItem('catKombatToken')
    localStorage.removeItem('catKombatUser')
    localStorage.removeItem('catKombatUserData')
    localStorage.removeItem('catKombatGameStats') // Clear game data too
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false
    })
  }

  return {
    ...authState,
    login,
    register,
    logout
  }
}