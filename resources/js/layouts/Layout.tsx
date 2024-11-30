import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAuthStore } from '../store/auth'
import { useNavigate } from "react-router-dom"

import Sidebar from "./Sidebar"
import Header from "./Header"
import Footer from "./Footer"

import { useSidebarStore } from '../store/sidebar'
import { getModulos } from "../services/ModuloService"
import { useNavBarStore } from '../store/navbar'

export default function Layout() {

    const {claseMinimize} = useSidebarStore();

    const {token, isAuthenticated} = useAuthStore();

    const {setItems} = useNavBarStore();

    const navigate = useNavigate();

    useEffect(() => {        

        /*axios.post('api/permisos')
            .then(response => {console.log(response.data)})
            .catch(error => {});*/        
        console.log(getModulos())      
            
        if (!isAuthenticated || token==='' || !token) {
            navigate('./login');
            return;
        }
    }, [isAuthenticated]);    

    return (
        <div className={claseMinimize}>            
            <Sidebar />
            <div className="main-panel">
                <Header />
                <div className="container">
                    <Outlet />  
                </div>
                <Footer />  
            </div>        
        </div>
    )
}