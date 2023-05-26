import { getUser } from '@/api'
import { TUser } from '@/types'
import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  user: TUser | undefined
  setUser: (value: TUser | undefined) => void
}

const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
})

const UserProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [user, setUser] = useState<TUser | undefined>(
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '{}') || undefined
      : undefined
  )

  const { data, isLoading } = useQuery(
    ['user', user?.id],
    () => {
      if (user) {
        return getUser(user.id)
      }
    },
    {
      enabled: user ? true : false,
      onSuccess: (data) => {
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
      },
      keepPreviousData: true,
    }
  )

  return (
    <UserContext.Provider
      value={{
        user: data,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

function useUser(): UserContextType {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export { UserProvider, useUser }
