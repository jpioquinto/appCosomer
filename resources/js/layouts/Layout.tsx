import { Outlet } from "react-router-dom"
import '../../css/app/plugins.min.css'
import '../../css/app/kaiadmin.min.css'

import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Layout() {
    return (
        <>            
            <Sidebar />
            <div className="main-panel">
                <Header />
                <div className="container">
                    <Outlet />  
                </div>
                <Footer />  
            </div>        
        </>
    )
}