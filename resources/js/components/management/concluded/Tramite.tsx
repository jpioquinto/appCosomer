import React, {useEffect, MouseEvent} from 'react'

import { useConflictStore } from '../../../store/conflict/conflictStore'
import useSegundaModal from '../../../hooks/useSegundaModal'
import { useLocation, useNavigate } from 'react-router-dom'
import { useModuloStore } from '../../../store/modulo'
import { useEdoStore } from '../../../store/edoStore'
import { useReport } from '../../../hooks/useReport'
import ModalDiagnostico from './ModalDiagnostico'
import Breadcrumb from '../../partial/Breadcrumb'
import useModal from '../../../hooks/useModal'
import Filter from '../report/partial/Filter'
import { makeHash } from '../../../utils'
import TablaTramite from './TablaTramite'
import ModalCedula from './ModalCedula'
import { useFilter } from '../../../hooks/useFilter'

export default function Tramite() {
    const location = useLocation()

    const {modal, closeModal} = useModal()

    const {segundaModal, closeSecondModal} = useSegundaModal()

    const {key, setKeyElement, loadCatalog} = useReport()

    const {modulo, setModulo} = useModuloStore()

    const {getFilters} = useFilter()

    const {keyTable, completed, listConflictsCompleted, setKeyTable} = useConflictStore()
    
    const navigate = useNavigate()

    const {edos} = useEdoStore()

    const seguimiento = () => {        
        return navigate('/seguimiento/asunto')
    }

    const clickConsultar = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        
        listConflictsCompleted({...getFilters(), estatus:'1,2'})
    }

    useEffect(() => {
        if (edos.length>0) {
            setKeyElement(makeHash(6)) 
        }
    }, [edos])

    useEffect(() => {
        loadCatalog()
        listConflictsCompleted({estatus:'1,2'})        
        setModulo(location.state)
        setKeyTable(makeHash(12))
        setKeyElement(makeHash(6))
    }, [modulo])

  return (
     <div className="page-inner">
        <div className="page-header justify-content-between">
            <Breadcrumb nombre={`${modulo.descripcion}`} id={modulo.id} />
        </div> 
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Listado de Asuntos Concluídos</h4>
                    </div>
                    <div className="card-body">
                        <Filter clickConsultar={clickConsultar} key={key.keyElement} hideStatus={true}/>

                        <TablaTramite conflictos={completed} key={keyTable} seguimiento={seguimiento} /> 

                        <ModalDiagnostico propModal={modal} close={closeModal}/> 

                        <ModalCedula propModal={segundaModal} close={closeSecondModal}/>  
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
