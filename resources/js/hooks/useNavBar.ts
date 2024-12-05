import { useState, MouseEvent } from 'react'
import { useNavBarStore } from '../store/navbar'
import type { Modulo, Modulos, Menu, MenuItem } from '../types';

export default function useNavBar() {
    const {menu} = useNavBarStore();

    const [toggle, setToggle] = useState({
        collapsed:'collapsed',
        collapse:'collapse',
        classItem:'nav-item'
    })

    const clickElemen = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setToggle({
            ...toggle,
            collapsed:'',
            classItem:'nav-item active',
            collapse:'collapsing',
        });

        setTimeout(() => setToggle({...toggle, collapse:'collapse show'}), 750)
    }

    const esModuloPadre = (menu:Menu | MenuItem, $id:number) => {
        return Array.isArray(menu) ? menu.find(item =>  item.nodo_padre===$id) : false;
    } 

    return {
        menu,   
        toggle,
        clickElemen,
        esModuloPadre
    }
}