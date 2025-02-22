import { useAuthStore } from "../store/auth";
import {useState, MouseEvent} from 'react'

type ToggleUserNav = {
    aria:string,
    classToggle:string,
    collapse:string,
    show:boolean
}

export function useUserNav() {
    const {user, contact, getFoto, setFoto} = useAuthStore()

    const [toggle, setToggle] = useState<ToggleUserNav>({
        aria:'true',
        classToggle:'',
        collapse:'in collapse',
        show:false
    })

    const showElemens = () => {
        setToggle({
            aria:'true', 
            classToggle:'',         
            collapse:'in collapse show',
            show:true
        });
        //setTimeout(() => setToggle({...toggle, activo:item.activo, collapse:'collapse show', show:true}), 50)
    }

    const hideElemens = () => {
        setToggle({
            aria:'false',
            classToggle:'collapsed',
            collapse:'in collapse',
            show:false        
        });
        //setTimeout(() => setToggle({...toggle, collapse:'collapse', show:false}), 50)            
    }

    const handlerCollapse = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        toggle.show ? hideElemens() : showElemens();
	}

    return {
        user,
        contact,
        toggle,
        getFoto,
        setFoto,
        handlerCollapse
    }
}