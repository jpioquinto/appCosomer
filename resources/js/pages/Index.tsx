import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'
import Spinner from "../components/Spinner"
import { useAuthStore } from "../store/auth"

export default function Index() {    
    const {isAuthenticated, setAuthenticated} = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('accessAuth')!))



        if (localStorage.getItem('accessAuth')) {
            const accessData = JSON.parse(localStorage.getItem('accessAuth')!);
            console.log(accessData.hasOwnProperty('token') && accessData.hasOwnProperty('user'))
            setAuthenticated(accessData.hasOwnProperty('token') && accessData.hasOwnProperty('user'))
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