import { useState } from 'react'
import { useNavBarStore } from '../store/navbar'
import type { Menu, MenuItem } from '../types';

export default function useNavBar() {
    const {menu, activarItem} = useNavBarStore();

    const [toggle, setToggle] = useState({
        activo:'',
        collapsed:'collapsed',
        collapse:'collapse',
        classItemPadre:'nav-item',
        classItem:'',
        show:false
    })
    
    const showElemens = (item: MenuItem) => {
        setToggle({
            ...toggle,            
            collapsed:'',
            classItemPadre:'nav-item',            
            collapse:'collapsing',
        });
        setTimeout(() => setToggle({...toggle, activo:item.activo, collapse:'collapse show', show:true}), 50)
    }

    const hideElemens = (item: MenuItem) => {
        setToggle({
            ...toggle,            
            collapsed:'collapsed',                        
            collapse:'collapsing',
        });
        setTimeout(() => setToggle({...toggle, collapse:'collapse', show:false}), 50)            
    }

    const clickElemen = (item: MenuItem, nodoPadre:boolean) => {   
           
        activarItem(item)     
        if (nodoPadre) {
            toggle.show ? hideElemens(item) : showElemens(item);
        } else {
            setToggle({...toggle, activo:item.activo})
        }
    }

    const esModuloPadre = (menu:Menu | MenuItem, $id:number) => {
        return Array.isArray(menu) ? menu.find(item =>  item.nodo_padre===$id)!==undefined : false;
    } 

    return {
        menu,   
        toggle,
        clickElemen,
        esModuloPadre
    }
}