import { create } from 'zustand'
import { PerfilSchema, PerfilsSchema, ArbolPermiso } from '../types'
import { listadoPerfiles, listadoPermisos } from '../services/PerfilService'

type PerfilState = {
    perfils:PerfilsSchema,
    perfil:PerfilSchema,
    permissions:ArbolPermiso,
    setCurrentPerfil:(perfil: PerfilSchema) => void,
    getPerfil:() => PerfilSchema,
    getPerfils:() => PerfilsSchema,
    listPerfils:() => Promise<void>
    listPermissions:(id: PerfilSchema['id'] | undefined) => Promise<void>
}

export const usePerfilStore = create<PerfilState>((set, get) => ({
    perfils:[] as PerfilsSchema,
    perfil:{} as PerfilSchema,
    permissions:[] as ArbolPermiso,
    setCurrentPerfil:(perfil) => set({perfil}),
    getPerfil:() => get().perfil,
    getPerfils:() => get().perfils,
    listPerfils: async () => {
        const perfils = await listadoPerfiles()
        set({
            perfils
        })
    },
    listPermissions: async (id) => {
        const permissions = await listadoPermisos(id)
        set({
            permissions
        })
    }
}))