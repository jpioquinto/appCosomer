import { create } from 'zustand'
import { URSchema, URsSchema } from '../types'
import { listadoURs } from '../services/UrService'

type URState = {
    urs:URsSchema,
    ur:URSchema,
    setCurrentUR:(ur: URSchema) => void,
    updateUR:($ur: URSchema) => void,
    addUR:($ur: URSchema) => void,
    deleteUR:($id: URSchema['id']) => void,
    getUR:() => URSchema,
    getURs:() => URsSchema,
    listURs:() => Promise<void>
}

export const useURStore = create<URState>((set, get) => ({
    urs:[] as URsSchema,
    ur:{} as URSchema,
    getUR:() => get().ur,
    getURs:() => get().urs,
    setCurrentUR:(ur) => set({ur}),
    updateUR: ($ur) => {
        set((state) => ({
            urs: state.urs.map(ur => ur.id === $ur.id ? $ur : ur),
            ur:{} as URSchema            
        }))
    },
    addUR:($ur) => {
        const urs = [$ur, ...get().urs]
        set({
            urs
        })
    },
    deleteUR:($id) => {
        set((state) => ({
            urs:state.urs.filter(ur => ur.id !== $id)
        }))
    },
    listURs: async () => {
        const urs = await listadoURs()
        set({
            urs
        })
    }
}))