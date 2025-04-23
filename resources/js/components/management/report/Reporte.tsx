import React, {useEffect, useState} from 'react'

import { useConflicto } from '../../../hooks/useConflicto'
import { useModuloStore } from '../../../store/modulo'
import { useEdoStore } from '../../../store/edoStore'
import { useLocation } from 'react-router-dom'
import { makeHash } from '../../../utils'
import Filter from './partial/Filter'

export default function Reporte() {
  //const [keyTable, setKeyTable] = useState(makeHash(6))
  const [keyFilter, setKeyFilter] = useState(makeHash(6))

  const {listEdos, getEdos}     = useEdoStore()

  const {modulo, setModulo} = useModuloStore()
    
  const {catalog} = useConflicto()

  const location = useLocation()

  const loadCatalog = () => {
    getEdos().length == 0 ? listEdos() : undefined
    catalog.getVertientes().length == 0 ? catalog.listVertientes() : undefined
    catalog.getEstatus().length    == 0 ? catalog.listEstatus()    : undefined
  }

  useEffect(() => {
    loadCatalog()
    setKeyFilter(makeHash(6))
  }, [])

  useEffect(() => {
    setKeyFilter(makeHash(6))
    setModulo(location.state) 
    loadCatalog()   
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
          <div className="card-body vh-100">
            <Filter key={keyFilter}/>
          </div>
        </div>
      </div>
    </>
  )
}
