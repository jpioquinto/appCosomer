import { create } from 'zustand'
import type { PropsModal } from '../types'

type ModalState = {
    modal:PropsModal,
    showModalStore:() => void,
    hideModalStore:() => void,
}

export const useModalStore = create<ModalState>((set) => ({
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
    }

}))