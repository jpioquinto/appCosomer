import { create } from 'zustand'
import type { UserAuth, Users } from '../types'
import { listadoUsuarios } from '../services/UserService'

type UserState =  {
    user:UserAuth,
    users:Users,
    setUser:(user: UserAuth) => void,
    getUsers:() => Users,
    listUsers:() => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
    user: {
        username:'',
        nombre:'',
        perfil:''
    },
    users:[],
    setUser: (user) => {
        set({
            user
        })
    },
    getUsers:() => get().users,
    listUsers: async () => {
        const users = await listadoUsuarios()
        set({
            users
        })

    }    
}))