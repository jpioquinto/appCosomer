import React, {useEffect, MouseEvent} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useConflictStore } from '../../../store/conflict/conflictStore'
import { useCatalogStore } from '../../../store/catalogStore'
import { useModuloStore } from '../../../store/modulo'
import ModalRegistro from '../register/ModalRegistro'
import { useEdoStore } from '../../../store/edoStore'
import { useFilter } from '../../../hooks/useFilter'
import { useReport } from '../../../hooks/useReport'
import Breadcrumb from '../../partial/Breadcrumb'
import useModal from '../../../hooks/useModal'
import Filter from '../report/partial/Filter'
import TablaAsuntos from './TablaAsuntos'
import { makeHash } from '../../../utils'

export default function Universe() {
    const {conflictos, keyTable, listConflicts, setKeyTable} = useConflictStore()

    const {key, setKeyElement, loadCatalog} = useReport()

    const {listEstatus, getEstatus} = useCatalogStore()

    const {modulo, setModulo} = useModuloStore()

    const {modal, closeModal} = useModal()

    const {getFilters} = useFilter()

    const location = useLocation()

    const navigate = useNavigate()

    const {edos} = useEdoStore()

    const clickConsultar = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        //console.log('buscaremos...conflictos', getFilters())
        listConflicts(getFilters())
    }
    
    useEffect(() => {
        if (edos.length>0) {
            setKeyElement(makeHash(6)) 
        }
    }, [edos])

    useEffect(() => {
        loadCatalog()
        getEstatus().length == 0 ? listEstatus() : undefined
        listConflicts()
        setModulo(location.state)
        setKeyTable(makeHash(12))        
        setKeyElement(makeHash(6))
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
                        <Filter clickConsultar={clickConsultar} key={key.keyElement}/>

                        <TablaAsuntos conflictos={conflictos} key={keyTable} seguimiento={seguimiento} />   

                        <ModalRegistro propModal={modal} close={closeModal}/>         
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
