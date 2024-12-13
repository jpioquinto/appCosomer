import { create } from 'zustand'
import { Modulos, Menu, MenuItem } from '../types'
import { getModulos, getMenu } from '../services/ModuloService' 

type NavBarState = {
    modulos:Modulos,
    menu:Menu,
    obtenerItems:() => Promise<void>,
    obtenerMenu:() => Promise<void>,
    activarItem:(item:MenuItem) => void,
    getMenu:() => Menu
}

const activarItems = (menu:Menu, item:MenuItem) => {
    return menu.map($item => {
        if ($item.id!==item.id) {
            $item.activo = item.nodo_padre>0 
                            ? ($item.id===item.nodo_padre ? 'active' : '') : '' ;
        } else {
            $item.activo = 'active';
        }

        if (Array.isArray($item.items) && $item.items.length>0) {
            $item.items = activarItems($item.items as Menu, item);
        }

        return $item 
    });    
}

export const useNavBarStore = create<NavBarState>((set, get) => ({
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
    },
    activarItem:(item:MenuItem) => { 
              
        set(state => ({
            menu:activarItems(state.menu, item)
        }))
    },
    getMenu:() => get().menu
}))