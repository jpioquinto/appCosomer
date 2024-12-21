import { create } from 'zustand'
import { EdosSchema, MunpioSchema, MunpiosSchema } from '../types'
import { listadoEdos, listadoMunpio } from '../services/EdoService'

type EdoState = {
    edos:EdosSchema,
    munpios:object,
    currentMnpios:MunpiosSchema,
    getEdos:() => EdosSchema,
    listEdos:() => Promise<void>
    listMunpios:(edoId: MunpioSchema['estado_id']) => Promise<void>
}

export const useEdoStore = create<EdoState>((set, get) => ({
    edos:[] as EdosSchema,
    currentMnpios:[] as MunpiosSchema,
    munpios:{},
    getEdos:() => get().edos,
    listEdos: async () => {
        const edos = await listadoEdos()
        set({
            edos
        })
    },
    listMunpios: async (edoId) => {             
        if (get().munpios.hasOwnProperty(edoId)) {
            set({
                currentMnpios:get().munpios[edoId]
            }) 
            return
        }
        
        let datos    = {}
        datos[edoId] = await listadoMunpio(edoId)
        
        set((state) => ({
            munpios:{...state.munpios, ...datos},
            currentMnpios:datos[edoId]
        }))
    }
}))