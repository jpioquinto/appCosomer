import {useState, MouseEvent} from 'react'

type Toggle = {
    aria:boolean,
    classToggle:string
}

const initState = {
    aria:false,
    classToggle:'',
}
export function useItemActionsNav() {
    const [toggle, setToggle] = useState<Toggle>(initState);

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
        toggle,
        handlerToggle
    }
}