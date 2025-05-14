import React, {useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useConflictStore } from '../../../store/conflict/conflictStore'
import { useCatalogStore } from '../../../store/catalogStore'
import { useModuloStore } from '../../../store/modulo'
import ModalRegistro from '../register/ModalRegistro'
import Breadcrumb from '../../partial/Breadcrumb'
import useModal from '../../../hooks/useModal'
import TablaAsuntos from './TablaAsuntos'
import { makeHash } from '../../../utils'

export default function Universe() {
    const location = useLocation()

    const navigate = useNavigate()

    const {conflictos, keyTable, listConflicts, setKeyTable} = useConflictStore()

    const {modal, closeModal} = useModal()
    
    const {listEstatus, getEstatus} = useCatalogStore()

    const {modulo, setModulo} = useModuloStore()

    useEffect(() => {
        getEstatus().length == 0 ? listEstatus() : undefined
        listConflicts()
        setModulo(location.state)
        setKeyTable(makeHash(12))
    }, [modulo])

    const seguimiento = () => {
        return navigate('/seguimiento/asunto')
    }
  return (
   <div className="page-inner">
        <div className="page-header justify-content-between">
            <Breadcrumb nombre={`${modulo.descripcion}`} id={modulo.id} />
        </div> 
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Listado de Asuntos</h4>
                    </div>
                    <div className="card-body">
                        <TablaAsuntos conflictos={conflictos} key={keyTable} seguimiento={seguimiento} />   

                        <ModalRegistro propModal={modal} close={closeModal}/>         
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
