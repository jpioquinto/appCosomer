import React, {useEffect, useState} from 'react'
import { useConflictStore } from '../../../store/conflict/conflictStore'
import useSegundaModal from '../../../hooks/useSegundaModal'
import { useModuloStore } from '../../../store/modulo'
import ModalDiagnostico from './ModalDiagnostico'
import Breadcrumb from '../../partial/Breadcrumb'
import { useLocation } from 'react-router-dom'
import useModal from '../../../hooks/useModal'
import { makeHash } from '../../../utils'
import TablaTramite from './TablaTramite'
import ModalCedula from './ModalCedula'
import { useNavigate } from 'react-router-dom'

export default function Tramite() {
    const location = useLocation()

    const {modal, closeModal} = useModal()

    const {segundaModal, closeSecondModal} = useSegundaModal()

    const {modulo, setModulo} = useModuloStore()

    const {keyTable, conflictos, listConflicts, setKeyTable} = useConflictStore()

    useEffect(() => {
        listConflicts()
        setModulo(location.state)
        setKeyTable(makeHash(12))
    }, [modulo])
    //const history  = useHistory()
    const navigate = useNavigate()
    const prueba = () => {
        console.log('hey chido...')
        //history.push('/registro');
        return navigate('/registro')
    }

  return (
     <div className="page-inner">
        <div className="page-header justify-content-between">
            <Breadcrumb nombre={`${modulo.descripcion}`} id={modulo.id} />
            <button onClick={prueba}>Prueba</button>
        </div> 
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                            <h4 className="card-title">Listado de...</h4>
                    </div>
                    <div className="card-body">
                        <TablaTramite conflictos={conflictos} key={keyTable} prueba={prueba} /> 

                        <ModalDiagnostico propModal={modal} close={closeModal}/> 

                        <ModalCedula propModal={segundaModal} close={closeSecondModal}/>  
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
