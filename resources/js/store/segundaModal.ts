import { create } from 'zustand'
import type { PropsModal } from '../types'

type ModalState = {
    segundaModal:PropsModal,
    showModalStore:() => void,
    hideModalStore:() => void,
}

export const useSegundaModalStore = create<ModalState>((set) => ({
    segundaModal:{
        show:false,
        clase:''
    },
    showModalStore:() => {
        set({
            segundaModal:{
                show:true,
                clase:'show'
            }
        })
    },
    hideModalStore:() => {
        set({
            segundaModal:{
                show:false,
                clase:''
            }
        })
    }

}))