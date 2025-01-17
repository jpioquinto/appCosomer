import { BrowserRouter, Routes, Route } from 'react-router-dom'

import WebFont from 'webfontloader'

import React, {useEffect} from 'react'

import Layout from './layouts/Layout'
import Index from './pages/Index'
import Login from './components/Login'
import Dashboard from './components/Dashboard.tsx'
import Usuario from './components/users/Usuario.tsx'
import Perfil from './components/profile/Perfil.tsx'
import EditarPerfil from './components/users/EditarPerfil.tsx'
import UR from './components/urs/UR.tsx'


export default function AppRouter() {

    return (
        <BrowserRouter>
            <Routes>                               
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route element={<Layout />}>
                    <Route path='/inicio' element={<Dashboard />} />
                    <Route path='/usuarios' element={<Usuario />} />
                    <Route path='/perfiles' element={<Perfil />} />
                    <Route path='/editar-perfil' element={<EditarPerfil />} />
                    <Route path='/urs' element={<UR />} />                    
                </Route>  
            </Routes>
        </BrowserRouter>
    )
}