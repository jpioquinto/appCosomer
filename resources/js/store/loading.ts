import { create } from 'zustand'
import { addClase, removeClase } from '../utils'

type LoadingProps = {
        clase:string        
        isLoading:boolean  
            
}

type LoadingState = {
    load:LoadingProps
    loadHidden:() => void
    loadShow:() => void
    setIsLoading:(loading:boolean) => void
}

export const useLoadingStore = create<LoadingState>(set => ({
    load:{
        clase:'loader-overlay loaded',
        isLoading:false
    },
    loadHidden: () => {
        set(state => ({
            load:{...state.load, clase: addClase(state.load.clase.split(' '), 'loaded')}
        }))
    },
    loadShow: () => {
        set(state => ({
            load:{...state.load, clase: removeClase(state.load.clase.split(' '), 'loaded')}            
        }))
    },
    setIsLoading: loading => {
        set(state => ({
            load:{...state.load, isLoading: loading}    
        }))
    }
}))