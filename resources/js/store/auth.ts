import { create } from 'zustand'
import type { Auth, UserAuth , Contact} from '../types'

type AuthState = Auth & {
    getFoto:() => string
    setUser:(user: UserAuth) => void
    setContact:(contact: Contact) => void
    setToken:(token:string) => void
    setAuthenticated:(authenticated:boolean) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token:'',
    isAuthenticated:false,
    user: {
        username:'',
        name:'',
        name_full:'',
        perfil:''
    },
    contact: {
        nombre:'',
        apPaterno:'',
        apMaterno:'',
        cargo:'',
        puestoId:0,
        munpioId:0,
        edoId:0,
        correo:'',
        foto:''
    },
    getFoto:() => get().contact.foto || '',
    setContact: (contact) => {
        set({
            contact
        })
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