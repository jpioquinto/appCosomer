import { create } from 'zustand'
import { Modulos, Menu } from '../types'
import { getModulos, getMenu } from '../services/ModuloService' 

type NavBarState = {
    modulos:Modulos,
    menu:Menu,
    obtenerItems:() => Promise<void>,
    obtenerMenu:() => Promise<void>
}

export const useNavBarStore = create<NavBarState>((set) => ({
    modulos:[],
    menu:[],
    obtenerItems:async () => {
        const modulos = await getModulos();
        set({
            modulos
        })
    },
    obtenerMenu:async () => {
        const menu = await getMenu();
        set({
            menu
        })
    }
}))