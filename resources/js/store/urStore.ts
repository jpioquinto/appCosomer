import { create } from 'zustand'
import { URSchema, URsSchema } from '../types'
import { listadoURs } from '../services/UrService'

type URState = {
    urs:URsSchema,
    ur:URSchema,
    getUR:() => URSchema,
    getURs:() => URsSchema,
    listURs:() => Promise<void>
}

export const useURStore = create<URState>((set, get) => ({
    urs:[] as URsSchema,
    ur:{} as URSchema,
    getUR:() => get().ur,
    getURs:() => get().urs,
    listURs: async () => {
        const urs = await listadoURs()
        set({
            urs
        })
    }
}))