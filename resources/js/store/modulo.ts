import { create } from 'zustand'
import type { MenuItem } from '../types'

type ModuloState = {
    modulo:MenuItem,
    setModulo:(modulo: MenuItem) => void

}

export const useModuloStore = create<ModuloState>((set) => ({
    modulo:{} as MenuItem,
    setModulo: (modulo) => {
        set({   
            modulo
        })
    }
}))