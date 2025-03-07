import React, {useRef} from 'react'

import DataTable, {DataTableRef} from 'datatables.net-react'
import DataTablesCore from 'datatables.net'
import DT from 'datatables.net-bs5'

import type { Acciones, URsSchema, URSchema } from '../../types'
import languaje from './../../data/Spanish_Mexico.json'
import { useModuloStore } from '../../store/modulo'
//import { makeHash } from '../../utils'
import BtnAccion from './BtnAccion'
import * as bootstrap from 'bootstrap'
 
DataTable.use(DT);

type URsProps = {
    urs:URsSchema
}

export default function TablaURs({urs}: URsProps) {

    const modulo = useModuloStore(state=>state.modulo)
    
    const table = useRef<DataTableRef>(null);
    
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
            pageLength: 100,
            language: languaje,
            responsive: {
                details: {
                    renderer:   DataTablesCore.Responsive.renderer.listHiddenNodes()
                }
            },
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
                <th className="text-center">Nombre</th>
                <th className="text-center">Acrónimo</th>
                <th className="text-center">Calle</th>
                <th className="text-center">Num. Ext.</th>
                <th className="text-center">Num. Int.</th>
                <th className="text-center">Col.</th>
                <th className="text-center">C.P.</th>
                <th className="text-center">Entidad</th>
                <th className="text-center">Del./Munpio.</th>
                <th className="text-center">Acciones</th>
            </tr>
        </thead>
    </DataTable>
  )
}
