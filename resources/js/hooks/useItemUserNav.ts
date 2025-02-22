import { useAuthStore } from "../store/auth";
import {useState, MouseEvent} from 'react'
import { logout } from "../services/UserService";
import { notificacion } from "../utils";
import { useNavigate } from "react-router-dom";

import { useConfigStore } from "../store/config";
import { Contact, UserAuth } from "../types";

type Toggle = {
    aria:boolean,
    classToggle:string
}

const initState = {
    aria:false,
    classToggle:'',
}

export function useItemUserNav() {
    const getInterceptor = useConfigStore(state => state.getInterceptor);

    const {contact, user, setUser, setToken, setContact, setAuthenticated} = useAuthStore();
    
    const [toggle, setToggle] = useState<Toggle>(initState);

    const naviagte = useNavigate();


    const showElemens = () => {
        setToggle({ 
            aria:true, 
            classToggle:'show',         
        });
    }

    const hideElemens = () => {
        setToggle(initState);
    }

    const desactivarInterceptor = () => {
        axios.interceptors.request.eject(getInterceptor());
    }

    const cerrarSession = async () => {
        try {
            const result = await logout();
            if (result?.solicitud) {
                notificacion(result.message, 'success');

                axios.defaults.headers.common['Authorization'] = '';
                localStorage.removeItem('accessAuth');
                
                desactivarInterceptor();
                setAuthenticated(false);
                setContact({} as Contact);
                setUser({} as UserAuth);
                setToken('');
                
                naviagte('/login');
                
                return result;
            } else {
                throw new Error(result?.response?.data?.message || result.message);
            }
        } catch (error) {
            notificacion(error.message, 'error');
            return error;
        }
        
    }

    const handlerToggle= (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        toggle.aria ? hideElemens() : showElemens();
    }

    const clickLogout = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log('Cerrar sesión...');
        cerrarSession();
    }

    return {
        user,
        toggle,
        contact,
        clickLogout,
        handlerToggle
    }
}