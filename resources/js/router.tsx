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

import MarcoJuridico from './components/management/legal/MarcoJuridico.tsx'
import Seguimiento from './components/management/procedure/Seguimiento.tsx'
import Historico from './components/management/historical/Historico.tsx'
import Solicitud from './components/management/request/Solicitud.tsx'
import Registro from './components/management/register/Registro.tsx'
import Tramite from './components/management/procedure/Tramite.tsx'
import Modulo from './components/module/Modulo.tsx'

import NotFound from './components/NotFound.tsx'

export default function AppRouter() {

    return (
        <BrowserRouter>
            <Routes>                               
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route element={<Layout />}>
                    <Route path='/inicio' element={<Dashboard />} />
                    <Route path='/usuarios' element={<Usuario />} />
                    <Route path='/modulos' element={<Modulo />} />
                    <Route path='/perfiles' element={<Perfil />} />
                    <Route path='/editar-perfil' element={<EditarPerfil />} />
                    <Route path='/urs' element={<UR />} />                    
                    <Route path='/control-de-gestion' element={<Solicitud />} />                    
                    <Route path='/marco-juridico' element={<MarcoJuridico />} />                    
                    <Route path='/historico' element={<Historico />} />                    
                    <Route path='/registro' element={<Registro />} />                    
                    <Route path='/asuntos-concluidos' element={<Tramite />} />                    
                    <Route path='/tramite/seguimiento' element={<Seguimiento />} />                    
                    <Route path='*' element={<NotFound />} />                    
                </Route>  
            </Routes>
        </BrowserRouter>
    )
}