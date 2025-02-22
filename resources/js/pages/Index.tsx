import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Spinner from "../components/Spinner"
import { useAuthStore } from "../store/auth"

export default function Index() {       
    const {isAuthenticated, setAuthenticated, setUser, setToken, setContact, setDataAuthenticate} = useAuthStore();

    const navigate = useNavigate();

    const setData = data => {
        //setAuthenticated(data.hasOwnProperty('token') && data.hasOwnProperty('user'))
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ data.token;        
        /*setContact(data.contact);
        setToken(data.token);
        setUser(data.user);*/

        setDataAuthenticate(data.user, data.contact, data.token);
    };

    useEffect(() => {
        if (localStorage.getItem('accessAuth')) {
            setData(JSON.parse(localStorage.getItem('accessAuth')!));            
        }   
          
        !isAuthenticated ? navigate('/login') : navigate('/inicio')
    }, [isAuthenticated]);
    
    return (
        <div className="container container-transparent animated fadeIn text-center">
            <h1>Programa de Atención de Conflictos Agrarios</h1>     
            <div className="loader-overlay loaded1">
                <Spinner />
            </div>
        </div>
    )
}