import { useAuthStore } from "../store/auth";
import {useState, MouseEvent} from 'react'

export function useUserNav() {
    const {user, contact, getFoto, setFoto} = useAuthStore()

    const [toggle, setToggle] = useState({
        aria:'true',
        classToggle:'',
        collapse:'in collapse',
        show:false
    })

    const showElemens = () => {
        setToggle({
            ...toggle,  
            aria:'true', 
            classToggle:'',         
            collapse:'in collapse show',
            show:true
        });
        //setTimeout(() => setToggle({...toggle, activo:item.activo, collapse:'collapse show', show:true}), 50)
    }

    const hideElemens = () => {
        setToggle({
            ...toggle,    
            aria:'false',
            classToggle:'collapsed',
            collapse:'in collapse',
            show:false        
        });
        //setTimeout(() => setToggle({...toggle, collapse:'collapse', show:false}), 50)            
    }

    const handlerCollapse = (e: MouseEvent<HTMLElement>) => {
        //e.preventDefault();
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