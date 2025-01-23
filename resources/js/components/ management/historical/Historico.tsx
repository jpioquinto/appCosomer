import React, {useEffect, useState} from 'react'
import Breadcrumb from '../../partial/Breadcrumb'
import { useModuloStore } from '../../../store/modulo'
import { makeHash } from '../../../utils'
import { useLocation } from 'react-router-dom'
import TablaRegistro from '../register/TablaRegistro'

export default function Historico() {
    const location = useLocation();

    const {modulo, setModulo} = useModuloStore()

    const [keyTable, setKeyTable] = useState<string>(makeHash(12))

    useEffect(() => {
        setModulo(location.state)
        setKeyTable(makeHash(12))
    }, [modulo])

  return (
   <div className="page-inner">
        <div className="page-header justify-content-between">
            <Breadcrumb nombre={`${modulo.descripcion}`} id={modulo.id} />
            <button type="button" className="btn btn-outline-primary btn-sm">
                <i className="fas fa-user-plus" ></i> Nueva
            </button>
        </div> 
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                            <h4 className="card-title">Listado de...</h4>
                    </div>
                    <div className="card-body">
                        <TablaRegistro key={keyTable} />            
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
