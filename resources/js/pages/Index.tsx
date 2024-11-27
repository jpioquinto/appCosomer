import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import Spinner from "../components/Spinner"
import { useAuthStore } from "../store/auth"

export default function Index() {
    const {isAuthenticated} = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
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