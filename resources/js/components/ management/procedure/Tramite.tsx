import React, {useEffect, useState} from 'react'
import Breadcrumb from '../../partial/Breadcrumb'
import { useLocation } from 'react-router-dom'
import { useModuloStore } from '../../../store/modulo'
import { useConflictStore } from '../../../store/conflict/conflictStore'
import { makeHash } from '../../../utils'
import TablaTramite from './TablaTramite'

export default function Tramite() {
    const location = useLocation()

    const {modulo, setModulo} = useModuloStore()

    const {conflictos, listConflicts} = useConflictStore()

    const [keyTable, setKeyTable] = useState<string>(makeHash(12))

    useEffect(() => {
        listConflicts()
        setModulo(location.state)
        setKeyTable(makeHash(12))
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
                            <h4 className="card-title">Listado de...</h4>
                    </div>
                    <div className="card-body">
                        <TablaTramite conflictos={conflictos} key={keyTable} />   
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
