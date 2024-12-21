import { create } from 'zustand'
import { PerfilSchema, PerfilsSchema } from '../types'
import { listadoPerfiles } from '../services/PerfilService'

type PerfilState = {
    perfils:PerfilsSchema,
    perfil:PerfilSchema,
    getPerfil:() => PerfilSchema,
    getPerfils:() => PerfilsSchema,
    listPerfils:() => Promise<void>
}

export const usePerfilStore = create<PerfilState>((set, get) => ({
    perfils:[] as PerfilsSchema,
    perfil:{} as PerfilSchema,
    getPerfil:() => get().perfil,
    getPerfils:() => get().perfils,
    listPerfils: async () => {
        const perfils = await listadoPerfiles()
        set({
            perfils
        })
    }
}))