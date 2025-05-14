import { create } from 'zustand'
import type { PropsModal } from '../types'
import { makeHash } from '../utils'

type ModalState = {
    modal:PropsModal,
    keyModal:string,
    setKeyModal:(keyModal:string) => void,
    showModalStore:() => void,
    hideModalStore:() => void,
}

export const useModalStore = create<ModalState>((set) => ({
    keyModal:makeHash(5),
    modal:{
        show:false,
        clase:''
    },
    showModalStore:() => {
        set({
            modal:{
                show:true,
                clase:'show'
            }
        })
    },
    hideModalStore:() => {
        set({
            modal:{
                show:false,
                clase:''
            }
        })
    },
    setKeyModal:(keyModal) => set({keyModal})
}))