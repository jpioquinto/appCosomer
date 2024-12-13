import {React, useState, useEffect} from 'react'
import Breadcrumb from "../partial/Breadcrumb"
import {useLocation} from "react-router-dom"
import useModal from '../../hooks/useModal'
import ModalUser from './ModalUser'
import ModalTest from './ModalTest'
import TablaUsuarios from './TablaUsuarios'

import type { MenuItem } from "../../types"

export default function Usuario() {
    const location = useLocation();
    
    const {modal, triggerModal, closeModal} = useModal();    

    const [modulo, setModulo] = useState<MenuItem>({})

    useEffect(() => {
        setModulo(location.state)
        //console.log(modulo)        
    }, [])

    return (
        <div className="page-inner">
            <div className="page-header justify-content-between">
                <Breadcrumb nombre={modulo.descripcion} id={modulo.id} />
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
                            <TablaUsuarios />
                            
                            <ModalUser propModal={modal} close={closeModal}/>                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}