import {React, useState, useEffect} from 'react'
import Breadcrumb from "../partial/Breadcrumb"
import {useLocation} from "react-router-dom"
import ModalUser from './ModalUser'

import type { MenuItem } from "../../types"

export default function Usuario() {
    const location = useLocation();
    
    const [modulo, setModulo] = useState<MenuItem>({})

    useEffect(() => {
        setModulo(location.state)
        console.log(modulo)
    }, [])

    return (
        <div className="page-inner">
            <div className="page-header justify-content-between">
                <Breadcrumb nombre={modulo.descripcion} id={modulo.id} />
                <button type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#userModal">
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
                            <ModalUser />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}