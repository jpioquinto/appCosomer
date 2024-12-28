import React, {useRef, useEffect, useState} from 'react'
import { useModuloStore } from '../../store/modulo'

import DataTable from 'datatables.net-react'
import DT from 'datatables.net-bs5'

import { Acciones, PerfilSchema, PerfilsSchema } from '../../types'
import BtnAccion from './BtnAccion'
import * as bootstrap from 'bootstrap'
 
DataTable.use(DT);

type PerfilsProps = {
    perfils:PerfilsSchema
}

export default function TablaPerfils({perfils}: PerfilsProps) {
    const modulo = useModuloStore(state=>state.modulo)
    
    const table = useRef(null);
    
    const columns = [
        { data: 'nombre' },
        { data: 'descripcion' },
        { data: 'estatus' },
        { data: 'creado_el', className:'text-center', render: DT.render.datetime()},
        { data: 'creador' },
        { data: 'id' },
      ];

    const generarAcciones = (perfil:PerfilSchema) => {
              
        return <BtnAccion acciones={modulo.acciones as Acciones} perfil={perfil} key={perfil.id} />        
    }

    const setTooltips = () => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        return () => tooltipList.map(t => t.dispose())
    }

    const initTooltips = (table, intervalId:number) => {     
        if (!table) {
            return
        }  
        setTooltips()        
        clearInterval(intervalId)                
    }

    const initEvent = (e: Event) => {        
        const intervalId = setInterval(() => initTooltips(table.current ? table.current!.dt() : undefined, intervalId), 750);
    }

  return (
    <DataTable 
        data={perfils}
        ref={table}
        columns={columns}
        className="display"
        onInit={initEvent}
        onDraw={(e: Event) =>setTooltips()}
        options={{
            responsive: true,
            select: true,
        }}
        slots={{
            2: (estatus, row) => {
                if ([2,3].includes(estatus)) {
                    return <span className="badge rounded-pill badge-warning">Inactivo</span>
                }
                return <span className="badge rounded-pill badge-success">Activo</span>
            },
            5: (data, row) => {
                return generarAcciones(row)                
            }
        }}
    >
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estatus</th>
                <th className="text-center">Fecha de creación</th>
                <th>Creado por</th>
                <th className="text-center">Acciones</th>
            </tr>
        </thead>
    </DataTable>
  )
}
