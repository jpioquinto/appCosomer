import { Outlet } from "react-router-dom"
import '../../css/app/plugins.min.css'
import '../../css/app/kaiadmin.min.css'

import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function Layout() {
    return (
        <>            
            <Sidebar />
            <Header />
            <Outlet />            
        </>
    )
}