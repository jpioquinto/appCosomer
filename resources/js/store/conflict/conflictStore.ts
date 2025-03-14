import { create } from 'zustand'
import { Registro, Registros, EstatusParam } from '../../types/conflicto'
import { listadoConflictos } from '../../services/ConflictoService'
import { makeHash } from '../../utils'
import { Option } from '../../types'

type ConflicState = {
    conflictos:Registros,
    conflicto:Registro,
    estatus:Option,
    keyTable:string,
    setEstatus:(estatus:Option) => void,
    getEstatus:() => Option,
    setCurrentConflicto:(conflicto: Registro) => void,
    updateConflicto:(conflicto: Registro) => void,
    addConflicto:(conflicto: Registro) => void,
    deleteConflicto:(id: Registro['id']) => void,
    listConflicts:(estatus?: Array<number> | undefined) => Promise<void>,
    updateStatusConflicto:(data: EstatusParam) => void,
    setKeyTable:(keyTable:string) => void
}

export const useConflictStore = create<ConflicState>((set, get) => ({
    conflictos:[],
    conflicto:{} as Registro,
    estatus:{value:0, label:''},
    keyTable:makeHash(12),
    setEstatus:(estatus) => set({estatus}),
    getEstatus:() => get().estatus,
    setCurrentConflicto:(conflicto) => set({conflicto}),
    setKeyTable:(keyTable) => set({keyTable}), 
    listConflicts: async (estatus) => {
        const conflictos = await listadoConflictos(estatus)
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
    },
    updateStatusConflicto: (data) => {
        const conflictos = get().conflictos.map(conflicto => {
            if (conflicto.id === data.id) {
                conflicto.estatusId   = data.estatus.value
                conflicto.descEstatus = data.estatus.label
            }
            return conflicto
        })
        set({conflictos})
    }
}))