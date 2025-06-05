import { create } from 'zustand'
import { Registro, Registros, EstatusParam, Etapas, Etapa, Parametro, ValueCapture, FilterReport } from '../../types/conflicto'
import { listadoConflictos, listadoEtapas } from '../../services/ConflictoService'
import { makeHash } from '../../utils'
import { Option } from '../../types'

type ConflictState = {
    conflictos:Registros,
    completed:Registros,
    conflicto:Registro,
    estatus:Option,
    keyTable:string,
    etapas:Etapas,
    etapa:Etapa,
    captura:object,
    parametro:Parametro,
    resetCaptura:($captura:object) => void,
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
    listConflicts:(data?: FilterReport) => Promise<void>,
    listConflictsCompleted:(data?: FilterReport) => Promise<void>,
    listStages:(id: Registro['id']) => Promise<void>,
    updateStatusConflicto:(data: EstatusParam) => void,
    setKeyTable:(keyTable:string) => void,
    setParametro:(parametro: Parametro) => void,
    updateCapturaEtapa:(etapaId: Etapa['id'], paramId: Parametro['id'], captura: ValueCapture) => void,
    deleteCapturaEtapa:(etapaId: Etapa['id'], paramId: Parametro['id']) => void,
    updateEvidenceCapture:(paramId: Parametro['id'], $path:string) => void,
    switchCapture:(etapaId: Etapa['id'], paramId: Parametro['id']) => void,
    finishCapture:(etapaId: Etapa['id'], paramId: Parametro['id']) => void,
    initCapture:(etapaId: Etapa['id'], paramId: Parametro['id']) => void,
}

export const useConflictStore = create<ConflictState>((set, get) => ({
    conflictos:[],
    completed:[],
    conflicto:{} as Registro,
    parametro:{} as Parametro,
    estatus:{value:0, label:''},
    keyTable:makeHash(12),
    etapas:[],
    etapa:{} as Etapa,
    captura: {},
    setParametro:(parametro:Parametro) => set({parametro}),
    resetCaptura:(captura) => set({captura}),
    setEstatus:(estatus) => set({estatus}),
    getEstatus:() => get().estatus,
    setCurrentEtapa:(etapa) => set({etapa}),
    setCurrentConflicto:(conflicto) => set({conflicto}),
    setKeyTable:(keyTable) => set({keyTable}), 
    setCaptura:($captura) => {
        const captura = {...get().captura, ...$captura}
        set({captura})
    },
    listConflicts: async (data) => {
        const conflictos = await listadoConflictos(data)
        set({
            conflictos
        })
    },
    listConflictsCompleted: async (data) => {
        const completed = await listadoConflictos(data)
        set({
            completed
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
                conflicto.estatusId   = +data.estatus.value
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
    switchCapture:(etapaId, paramId) => {
        const etapas = get().etapas.map(etapa => {
            if (etapa.id === etapaId) {
                etapa.capturas?.map(parametro => {
                    if (parametro.id === paramId) {
                        parametro.capturando = !parametro.capturando
                       // parametro.keyParam = `param-${parametro.id}` + makeHash(5) // remove
                    }
                    return parametro
                })
            }
            return etapa
        })

        set({etapas})
    },
    initCapture:(etapaId, paramId) => {
        get().switchCapture(etapaId, paramId)
    },
    finishCapture:(etapaId, paramId) => {
        get().switchCapture(etapaId, paramId)
    },
    deleteCapturaEtapa:(etapaId, paramId) => {
        
        const etapas = get().etapas.map(etapa => {
            if (etapa.id === etapaId) {
                etapa.capturas?.map(parametro => {
                    if (parametro.id === paramId) {
                        parametro.captura = null
                        parametro.capturando = false
                        parametro.keyParam = `param-${parametro.id}` + makeHash(5) 
                    }
                    return parametro
                })
            }
            return etapa
        })
        const captura = get().captura
        captura.hasOwnProperty(paramId) ? delete captura[paramId] : undefined
        set({captura})
        set({etapas})
    },
    updateCapturaEtapa:(etapaId, paramId, $captura) => {
        
        const etapas = get().etapas.map(etapa => {
            if (etapa.id === etapaId) {
                etapa.capturas?.map(captura => {
                    if (captura.id === paramId) {
                        $captura = (captura.captura && captura.captura?.id) ? {...$captura, id:captura.captura?.id} : $captura
                        captura.captura  = captura.captura ? {...captura.captura, ...$captura} : $captura
                        captura.keyParam = `param-${captura.id}` + makeHash(5) 
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
    },
    updateEvidenceCapture:(paramId, $path) => {
        const etapas = get().etapas.map(etapa => {            
            etapa.capturas?.map(captura => {
                if (captura.id !== paramId) {
                    return true
                }
                captura?.captura?.docs?.push($path)  //here              
                return captura
            })            
            return etapa
        })

        const captura = get().captura
        !captura[paramId].hasOwnProperty('docs') ? captura[paramId]['docs'] = [] : undefined
        captura[paramId].docs = [...captura[paramId].docs.filter(path => path!==$path), $path]

        set({captura})
        set({etapas})
    }
}))