import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('autoflow_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('autoflow_user')
      }
    }
  }, [])

  const login = (email, password) => {
    const userData = {
      id: 'user-1',
      email,
      name: email.split('@')[0],
      avatar: email.charAt(0).toUpperCase(),
    }
    setUser(userData)
    localStorage.setItem('autoflow_user', JSON.stringify(userData))
    return userData
  }

  const signup = (email, password, name) => {
    const userData = {
      id: 'user-' + Date.now(),
      email,
      name,
      avatar: name.charAt(0).toUpperCase(),
    }
    setUser(userData)
    localStorage.setItem('autoflow_user', JSON.stringify(userData))
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('autoflow_user')
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
