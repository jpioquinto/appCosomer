import React, {useState, useEffect} from 'react'
import {useLocation} from "react-router-dom"

import { useModuloStore } from '../../store/modulo'
import { usePerfilStore } from '../../store/perfil'
import { useURStore } from '../../store/urStore'
import { useUserStore } from '../../store/user'
import Breadcrumb from "../partial/Breadcrumb"
import useModal from '../../hooks/useModal'
import TablaUsuarios from './TablaUsuarios'
import { makeHash } from '../../utils'
import ModalUser from './ModalUser'

export default function Usuario() {
    const location = useLocation();
    
    const {modal, triggerModal, closeModal} = useModal();    

    const {modulo, setModulo} = useModuloStore()

    const {listUsers, users} = useUserStore();

    const {listURs} = useURStore()

    const {listPerfils} = usePerfilStore()

    const [keyTable, setKeyTable] = useState(makeHash(12));
   
    useEffect(() => {
        setModulo(location.state)
        setKeyTable(makeHash(12))
        listPerfils()
        listUsers()     
        listURs()
    }, [modulo])

    return (
        <div className="page-inner">
            <div className="page-header justify-content-between">
                <Breadcrumb nombre={`${modulo.descripcion}`} id={modulo.id} />
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={triggerModal}>
                    <i className="fas fa-user-plus" ></i> Nuevo
                </button>
            </div> 
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                                <h4 className="card-title">Listado de Usuarios</h4>
                        </div>
                        <div className="card-body">
                            <TablaUsuarios users={users} key={keyTable} />
                            
                            <ModalUser propModal={modal} close={closeModal}/>                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}