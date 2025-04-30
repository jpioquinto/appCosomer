import React, {useEffect, useState} from 'react'

import { makeHash, tienePermiso } from '../../../utils'
import { useModuloStore } from '../../../store/modulo'
import { useReport } from '../../../hooks/useReport'
import { useLocation } from 'react-router-dom'
import type { Acciones } from '../../../types'
import TablaReportes from './TablaReportes'
import Filter from './partial/Filter'

export default function Reporte() {
  const {key, isEmpty, url, setKeyElement, loadCatalog, getConflicts, clickDescargar} = useReport()
  
  const {modulo, setModulo} = useModuloStore()

  const location = useLocation()

  useEffect(() => {
    loadCatalog()
    setKeyElement(makeHash(6))
  }, [])

  useEffect(() => {    
    setModulo(location.state) 
    loadCatalog() 
    setKeyElement(makeHash(6))  
  }, [modulo])

  return (
    <>
      <div className="panel-header bg-primary-gradient">
        <div className="page-inner py-5">
          <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
            <div>
              <h3 className="text-white fw-bold mb-3">Reportes</h3>
              <h6 className="text-white op-7 mb-2">En esta sección podrá generar y descargar reportes de las diferentes vertientes.</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="page-inner mt--5 pt-0">
        <div className="card full-height">          
          <div className="card-body">
            <Filter key={key.keyElement}/>            
            <div className='container-fluid'>
              {
                  tienePermiso(modulo?.acciones as Acciones, 14) && !isEmpty && (
                    <div className='row'>
                      <div className="col-md-12">
                        <div className="ml-md-auto mt-3 py-2 py-md-0 pull-right">
                          <a 
                            className="btn btn-outline-success btn-round btn-sm me-0 fw-bolder"
                            href={url!}                            
                            onClick={clickDescargar}
                          >
                            <i className="fa fa-file-excel"/> Descargar
                          </a>
                        </div>
                      </div>
                    </div>)
              }
              <TablaReportes conflicts={getConflicts()} key={key.keyTable} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
