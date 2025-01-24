import { create } from 'zustand'
import { Registros } from '../../types/conflicto'
import { listadoConflictos } from '../../services/ConflictoService'

type ConflicState = {
    conflictos:Registros
    listConflicts:() => Promise<void>
}

export const useConflictStore = create<ConflicState>((set, get) => ({
    conflictos:[],
    listConflicts: async () => {
        const conflictos = await listadoConflictos()
        set({
            conflictos
        })
    }
}))