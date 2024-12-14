import { create } from 'zustand'
import type { Auth, UserAuth } from '../types'

type AuthState = Auth & {
    setUser:(user: UserAuth) => void
    setToken:(token:string) => void
    setAuthenticated:(authenticated:boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    token:'',
    isAuthenticated:false,
    user: {
        username:'',
        nombre:'',
        perfil:''
    },
    setUser: (user) => {
        set({
            user
        })
    },
    setToken: (token) => {
        set(state => ({
            token:token
        }))
    },
    setAuthenticated:(authenticated) => {
        set(state => ({
            isAuthenticated:authenticated
        }))
    }
}))