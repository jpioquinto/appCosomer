import { create } from 'zustand'
import { listadoPuestos } from '../services/ContactSevice'
import { Puestos } from '../types'

type ContactState = {
    puestos:Puestos,
    getPuestos: () => Puestos,
    listPuestos: () => Promise<void>
}

export const useContactStore = create<ContactState>((set, get) => ({
    puestos:[] as Puestos,
    getPuestos:() => get().puestos,
    listPuestos: async () => {
        const puestos = await listadoPuestos()
        set({
            puestos
        })
    }
}))