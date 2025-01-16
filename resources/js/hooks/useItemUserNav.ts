import { useAuthStore } from "../store/auth";
import {useState, MouseEvent} from 'react'

type Toggle = {
    aria:boolean,
    classToggle:string
}

const initState = {
    aria:false,
    classToggle:'',
}

export function useItemUserNav() {
    const {contact, user} = useAuthStore()

    const [toggle, setToggle] = useState<Toggle>(initState)

    const showElemens = () => {
        setToggle({ 
            aria:true, 
            classToggle:'show',         
        });
    }

    const hideElemens = () => {
        setToggle(initState);
    }

    const handlerToggle= (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        toggle.aria ? hideElemens() : showElemens();
    }

    return {
        user,
        toggle,
        contact,
        handlerToggle
    }
}