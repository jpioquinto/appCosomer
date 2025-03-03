import { create } from 'zustand'
import { Registro, Registros } from '../../types/conflicto'
import { listadoConflictos } from '../../services/ConflictoService'
import { makeHash } from '../../utils'

type ConflicState = {
    conflictos:Registros,
    conflicto:Registro,
    keyTable:string,
    setCurrentConflicto:(conflicto: Registro) => void,
    updateConflicto:(conflicto: Registro) => void,
    addConflicto:(conflicto: Registro) => void,
    deleteConflicto:(id: Registro['id']) => void
    listConflicts:() => Promise<void>,
    setKeyTable:(keyTable:string) => void
}

export const useConflictStore = create<ConflicState>((set, get) => ({
    conflictos:[],
    conflicto:{} as Registro,
    keyTable:makeHash(12),
    setCurrentConflicto:(conflicto) => set({conflicto}),
    setKeyTable:(keyTable) => set({keyTable}), 
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
    },
    deleteConflicto: (id) => {
        set(state => ({
            conflictos:state.conflictos.filter(conflicto => conflicto.id !== id)
        }))
    }
}))