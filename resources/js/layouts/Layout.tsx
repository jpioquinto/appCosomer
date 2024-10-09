import { Outlet } from "react-router-dom"


import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import Footer from "../components/Footer"

import { useSidebarStore } from '../store/sidebar'

export default function Layout() {

    const {claseMinimize} = useSidebarStore();

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