import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'

import { useModuloStore } from '../../store/modulo'
import Breadcrumb from '../partial/Breadcrumb'
import useModal from '../../hooks/useModal'
import TablaModulos from './TablaModulos'
import ModalModulo from './ModalModulo'
import { makeHash } from '../../utils'

export default function Modulo() {
    const {modal, triggerModal, closeModal} = useModal(); 

    const {modulos, modulo, setModulo, listModules} = useModuloStore();

    const [keyTable, setKeyTable] = useState(makeHash(12));

    const location = useLocation();

    useEffect(() => {
        setModulo(location.state);
        setKeyTable(makeHash(12))
        listModules();
    }, [modulo])

  return (
    <div className="page-inner">
        <div className="page-header justify-content-between">
            <Breadcrumb nombre={`${modulo.descripcion}`} id={modulo.id} />
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={triggerModal}>
                <i className="fas fa-wrench" ></i> Nuevo
            </button>
        </div> 
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                            <h4 className="card-title">Listado de Módulos</h4>
                    </div>
                    <div className="card-body">
                        <TablaModulos modules={modulos} key={keyTable}/>
                        <ModalModulo propModal={modal} close={closeModal}/>  
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
