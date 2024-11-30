import { create } from 'zustand'
import { items } from '../types'

type NavBarState = {
    items:items,
    loaded:items,
    setItems:(items:items) => void,
    setLoaded:(item:items) => void
}

export const useNavBarStore = create<NavBarState>((set) => ({
    items:[],
    loaded:[],
    setItems:($items) => {
        set(state => ({
            items:$items
        }))
    },
    setLoaded:(item) => {
        set(state => ({
            //loaded:[...state.loaded, item]
        }))
    }
}))