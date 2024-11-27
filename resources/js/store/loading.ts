import { create } from 'zustand'

type LoadingState = {
    clase:string
    isLoading:boolean
    hidden:() => void
    show:() => void
    setIsLoading:(loading:boolean) => void
}

const useLoadingStore = create<LoadingState>(set => ({
    clase:'loader-overlay loaded',
    isLoading:false,
    hidden: () => {
        set(state => ({
            clase:addClase(state.clase.split(' '), 'loaded')
        }))
    },
    show: () => {
        set(state => ({
            clase:removeClase(state.clase.split(' '), 'loaded')
        }))
    },
    setIsLoading: loading => {
        set(state => ({
            isLoading:loading
        }))
    }
}))