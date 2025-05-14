import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify'
import { useLoadingStore } from "../store/loading"
import { useConfigStore } from "../store/config"
import { useAuthStore } from '../store/auth'

import Sidebar from "./Sidebar"
import Header from "./Header"
import Footer from "./Footer"

import { useSidebarStore } from '../store/sidebar'
import { useNavBarStore } from '../store/navbar'
import Loading from "../components/Loading"
import $axios from "../utils/axios"

import 'animate.css'

export default function Layout() {

    const {claseMinimize} = useSidebarStore();

    const {token, isAuthenticated} = useAuthStore();

    const setInterceptor = useConfigStore(state => state.setInterceptor);

    const {setIsLoading, loadShow, loadHidden} = useLoadingStore();

    const {obtenerMenu} = useNavBarStore();

    const navigate = useNavigate();

    const activarInterceptor = () => {
        const interceptor = $axios.interceptors.request.use((config) => {
            setIsLoading(true); loadShow();
            return config;
        }, (error) => {
            setIsLoading(true); loadShow();
            return Promise.reject(error);
        });

        $axios.interceptors.response.use((response) => {
            setIsLoading(false); loadHidden();
            return response;
        }, function(error) {
            setIsLoading(false); loadHidden();
            return Promise.reject(error);
        });

        setInterceptor(interceptor);
    };

    useEffect(() => {  
        activarInterceptor();                 
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
            <Loading />      
        </div>
    )
}