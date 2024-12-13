import { create } from 'zustand'
import type { User } from '../types'

type UserState =  {
    user:User,
    setUser:(user: User) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: {
        username:'',
        nombre:'',
        perfil:''
    },
    setUser: (user) => {
        set({
            user
        })
    }
}))