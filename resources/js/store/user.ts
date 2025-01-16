import { create } from 'zustand'
import type { Option, User, UserAuth, Users } from '../types'
import { listadoUsuarios } from '../services/UserService'

type UserState =  {
    user:UserAuth,
    users:Users,
    urSelected:Option,
    perfilSelected:Option,
    getPerfilSelected:() => Option,
    getURSelected:() => Option,
    setUser:(user: UserAuth) => void,
    getUsers:() => Users,
    listUsers:() => Promise<void>
    changeStatus:(estatus:User['estatus'], id:User['id']) => void
    changeUR:(urSelected:Option, id:User['id']) => void
    changePerfil:(perfilSelected:Option, id:User['id']) => void
    setUrSelected:(urSelected:Option) => void
    setPerfilSelected:(perfilSelected:Option) => void
}

export const useUserStore = create<UserState>((set, get) => ({
    user: {
        username:'',
        name_full:'',
        perfil:'',
        name:'',
    },
    users:[],
    urSelected:{value:0, label:'', sigla:''},
    perfilSelected:{value:0, label:'', sigla:undefined},
    getPerfilSelected:() => get().perfilSelected,
    getURSelected:() => get().urSelected,
    setUrSelected:(urSelected) => {
        set({
            urSelected
        })
    },
    setPerfilSelected:(perfilSelected) => {
        set({
            perfilSelected
        })
    },
    changePerfil: (perfilSelected, id) => {
        const users = get().users.map(user => {
            if (user.id===id) {
                user.perfil_id = perfilSelected.value;
                user.perfil    = perfilSelected.label;
            }
            return user
        })
        set({
            users
        })
    },
    changeUR: (urSelected, id) => {
        const users = get().users.map(user => {
            if (user.id===id) {
                user.ur    = urSelected.sigla
                user.ur_id = urSelected.value
            }
            return user
        })
        set({
            users
        })
    },
    changeStatus: (estatus, id) => {
        const users = get().users.map(user => {
            if (user.id===id) {
                user.estatus = estatus
            }
            return user
        })
        set({
            users
        })
    },
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