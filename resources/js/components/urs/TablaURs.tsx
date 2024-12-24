import React, {useRef, useEffect, useState} from 'react'

import DataTable from 'datatables.net-react'
import DT from 'datatables.net-bs5'
import type { Acciones, URsSchema, URSchema, User, Users } from '../../types'

import { useModuloStore } from '../../store/modulo'
import BtnAccion from './BtnAccion'
import * as bootstrap from 'bootstrap'
 
DataTable.use(DT);

type URsProps = {
    urs:URsSchema
}

export default function TablaURs({urs}: URsProps) {

    const modulo = useModuloStore(state=>state.modulo)
    
    const table = useRef(null);
    
    const columns = [
        { data: 'nombre' },
        { data: 'sigla' },
        { data: 'calle' },
        { data: 'ext' },
        { data: 'int' },
        { data: 'col' },
        { data: 'cp' },
        { data: 'edo' },
        { data: 'mpio' },
        { data: 'id' },
      ];

    const generarAcciones = (ur:URSchema) => {
              
        return <BtnAccion acciones={modulo.acciones as Acciones} ur={ur} key={ur.id} />        
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
        data={urs}
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
            9: (data, row) => {
                return generarAcciones(row)                
            }
        }}
    >
        <thead>
            <tr>
                <th rowSpan="2" className="text-center">Nombre</th>
                <th rowSpan="2" className="text-center">Acrónimo</th>
                <th colSpan="5" className="text-center">Dirección</th>
                <th rowSpan="2" className="text-center">Entidad</th>
                <th rowSpan="2" className="text-center">Del./Munpio.</th>
                <th rowSpan="2" className="text-center">Acciones</th>
            </tr>
            <tr>
                <th className="text-center">Calle</th>
                <th className="text-center">Num. Ext.</th>
                <th className="text-center">Num. Int.</th>
                <th className="text-center">Col.</th>
                <th className="text-center">C.P.</th>
            </tr>
        </thead>
    </DataTable>
  )
}
