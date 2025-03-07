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
            collapse:'in collapse show animate__animated animate__fadeIn',
            show:true
        });
    }

    const hideElemens = () => {
        setToggle({
            aria:'false',
            classToggle:'collapsed',
            collapse:'in collapse animate__animated animate__fadeOutUp',
            show:false        
        });
    }

    const handlerCollapse = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setToggle({...toggle, collapse:'in collapsing'});
        setTimeout(() => toggle.show ? hideElemens() : showElemens(), 150);
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