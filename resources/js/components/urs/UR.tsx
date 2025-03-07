import React, {useState, useEffect} from 'react'

import { useModuloStore } from '../../store/modulo'
import { useEdoStore } from '../../store/edoStore'
import { useURStore } from '../../store/urStore'
import Breadcrumb from "../partial/Breadcrumb"
import {useLocation} from "react-router-dom"

import useModal from '../../hooks/useModal'
import { makeHash } from '../../utils'
import TablaURs from './TablaURs'
import ModalUR from './ModalUR'

export default function UR() {
    const location = useLocation()

    const [keyTable, setKeyTable] = useState(makeHash(12))

    const {modal, triggerModal, closeModal} = useModal()
    
    const {modulo, setModulo} = useModuloStore()

    const {listURs, urs} = useURStore()

    const {listEdos}     = useEdoStore()

    useEffect(() => {
        setModulo(location.state)
        setKeyTable(makeHash(12))
        listURs()
        listEdos()
    }, [modulo])

    return (
        <div className="page-inner">
            <div className="page-header justify-content-between">
                <Breadcrumb nombre={`${modulo.descripcion}`} id={modulo.id} />
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
                            <TablaURs urs={urs} key={keyTable} />

                            <ModalUR propModal={modal} close={closeModal}/>
                        </div>
                    </div>
                </div>
            </div> 
        </div>        
    )
}