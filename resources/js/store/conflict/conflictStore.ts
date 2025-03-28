import { create } from 'zustand'
import { Registro, Registros, EstatusParam, Etapas, Etapa, Captura, ValueCapture } from '../../types/conflicto'
import { listadoConflictos, listadoEtapas } from '../../services/ConflictoService'
import { makeHash } from '../../utils'
import { Option } from '../../types'

type ConflictState = {
    conflictos:Registros,
    conflicto:Registro,
    estatus:Option,
    keyTable:string,
    etapas:Etapas,
    etapa:Etapa,
    captura:object,
    setCaptura:($captura:object) => void,
    setEstatus:(estatus:Option) => void,
    getEstatus:() => Option,
    updateEtapa:(etapa: Etapa) => void,
    setCurrentEtapa:(etapa: Etapa) => void,
    setCurrentConflicto:(conflicto: Registro) => void,
    updateConflicto:(conflicto: Registro) => void,
    updateCaptura:(captura:object) => void,
    addConflicto:(conflicto: Registro) => void,
    deleteConflicto:(id: Registro['id']) => void,
    listConflicts:(estatus?: Array<number> | undefined) => Promise<void>,
    listStages:(id: Registro['id']) => Promise<void>,
    updateStatusConflicto:(data: EstatusParam) => void,
    setKeyTable:(keyTable:string) => void
    updateCapturaEtapa:(etapaId: Etapa['id'], paramId: Captura['id'], captura: ValueCapture) => void,
}

export const useConflictStore = create<ConflictState>((set, get) => ({
    conflictos:[],
    conflicto:{} as Registro,
    estatus:{value:0, label:''},
    keyTable:makeHash(12),
    etapas:[],
    etapa:{} as Etapa,
    captura: {},
    setEstatus:(estatus) => set({estatus}),
    getEstatus:() => get().estatus,
    setCurrentEtapa:(etapa) => set({etapa}),
    setCurrentConflicto:(conflicto) => set({conflicto}),
    setKeyTable:(keyTable) => set({keyTable}), 
    setCaptura:($captura) => {
        const captura = {...get().captura, ...$captura}
        set({captura})
    },
    listConflicts: async (estatus) => {
        const conflictos = await listadoConflictos(estatus)
        set({
            conflictos
        })
    },
    listStages: async (id) => {
        const etapas = await listadoEtapas(id)
        set({etapas})
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
    },
    updateEtapa:($etapa) => {
        const etapas = get().etapas.map(etapa => etapa.id === $etapa.id ? $etapa : etapa)

        set({etapas})
    },
    updateCapturaEtapa:(etapaId, paramId, $captura) => {
        
        const etapas = get().etapas.map(etapa => {
            if (etapa.id === etapaId) {
                etapa.capturas?.map(captura => {
                    if (captura.id === paramId) {
                        captura.captura = $captura
                    }
                    return captura
                })
            }
            return etapa
        })

        get().setCaptura({[paramId]:$captura})
        set({etapas})
    },
    updateCaptura:(newCaptura) => {
        const captura = {...get().captura, newCaptura}
        set({captura})
    }
}))