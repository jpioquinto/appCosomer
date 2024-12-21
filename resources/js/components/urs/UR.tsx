import React, {useState, useEffect} from 'react'
import Breadcrumb from "../partial/Breadcrumb"
import {useLocation} from "react-router-dom"
import { useURStore } from '../../store/urStore'
import { useEdoStore } from '../../store/edoStore'

import type { MenuItem } from "../../types"
import ModalUR from './ModalUR'
import TablaURs from './TablaURs'
import useModal from '../../hooks/useModal'

export default function UR() {
    const location = useLocation()

    const {modal, triggerModal, closeModal} = useModal()
    
    const [modulo, setModulo] = useState<MenuItem>({})

    const {listURs, urs} = useURStore()

    const {listEdos}     = useEdoStore()

    useEffect(() => {
        setModulo(location.state)
        listURs()
        listEdos()
    }, [modulo])

    return (
        <>
            <div className="page-inner">
                <div className="page-header justify-content-between">
                    <Breadcrumb nombre={modulo.descripcion} id={modulo.id} />
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={triggerModal}>
                        <i className="fas fa-plus-circle" ></i> Nueva
                    </button>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Listado de Unidades Responsables</h4>
                            </div>
                            <div className="card-body">
                                <TablaURs urs={urs}/>
                                <ModalUR propModal={modal} close={closeModal}/>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    )
}