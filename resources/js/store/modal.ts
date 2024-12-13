import { create } from 'zustand'

type ModalState = {
    modal:{
        show:boolean,
        clase:string
    },
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