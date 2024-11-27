import { create } from 'zustand'
import type { Auth } from '../types'

type AuthState = Auth & {
    setToken:(token:string) => void
    setAuthenticated:(authenticated:boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    token:'',
    isAuthenticated:false,
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