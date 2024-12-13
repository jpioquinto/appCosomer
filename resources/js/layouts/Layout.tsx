import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useAuthStore } from '../store/auth'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'

import Sidebar from "./Sidebar"
import Header from "./Header"
import Footer from "./Footer"

import { useSidebarStore } from '../store/sidebar'
import { useNavBarStore } from '../store/navbar'

export default function Layout() {

    const {claseMinimize} = useSidebarStore();

    const {token, isAuthenticated} = useAuthStore();

    const {obtenerMenu} = useNavBarStore();

    const navigate = useNavigate();

    useEffect(() => {                   
        if (!isAuthenticated || token==='' || !token) {
            navigate('./login');
            return;
        }
        obtenerMenu();
    }, [isAuthenticated]);    

    return (
        <div className={claseMinimize}>            
            <Sidebar />
            <div className="main-panel">
                <Header />
                <div className="container">
                    <Outlet />  
                </div>
                <ToastContainer />
                <Footer />  
            </div>        
        </div>
    )
}