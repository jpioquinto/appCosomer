import { create } from 'zustand'
import { Registro, Registros } from '../../types/conflicto'
import { listadoConflictos } from '../../services/ConflictoService'

type ConflicState = {
    conflictos:Registros,
    conflicto:Registro,
    setCurrentConflicto:(conflicto: Registro) => void,
    updateConflicto:(conflicto: Registro) => void,
    listConflicts:() => Promise<void>
}

export const useConflictStore = create<ConflicState>((set, get) => ({
    conflictos:[],
    conflicto:{} as Registro,
    setCurrentConflicto:(conflicto) => set({conflicto}),
    listConflicts: async () => {
        const conflictos = await listadoConflictos()
        set({
            conflictos
        })
    },
    updateConflicto:($conflicto) => {
        set(state => ({
            conflictos:state.conflictos.map(conflicto => conflicto.id === $conflicto.id ? $conflicto : conflicto),
            conflicto: {} as Registro
        }))
    },
    addConflicto:($conflicto) => {
        const conflictos = [$conflicto, ...get().conflictos]
        set({conflictos})
    }
}))