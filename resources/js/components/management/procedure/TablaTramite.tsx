import React, {useRef} from 'react'

import DataTable, {DataTableRef} from 'datatables.net-react'
import DataTablesCore from 'datatables.net'
import DT from 'datatables.net-bs5'
import 'datatables.net-select-bs5'
import 'datatables.net-responsive-bs5'
import { Registros, Registro } from '../../../types/conflicto'
import { useModuloStore } from '../../../store/modulo'
import type { Acciones } from '../../../types'
import BtnAccion from './BtnAccion'


DataTable.use(DT);

type ConflictsProps = {
    conflictos:Registros,
    prueba:() => void
}

export default function TablaTramite({conflictos, prueba}: ConflictsProps) {
    const modulo = useModuloStore(state=>state.modulo);
    
    const table = useRef<DataTableRef>(null);

    const columns = [
        { data: 'fecha', render: DT.render.date()},
        { data: 'estado' },
        { data: 'municipio' },
        { data: 'promovente'},
        { data: 'contraparte'},
        { data: 'vertiente'},
        { data: 'supConflicto'},
        { data: 'supAtendida'},  
        { data: 'regimen' },
        { data: 'descEstatus' },
        { data: 'sintEstatus' },
        { data: 'orgInvolucrada' },
        { data: 'id' },
    ];

    const generarAcciones = (registro:Registro) => {            
        return <BtnAccion acciones={modulo.acciones as Acciones} conflicto={registro} key={registro.id} prueba={prueba}/>     
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
        const intervalId = setInterval(() => initTooltips(table.current ? table.current.dt() : undefined, intervalId), 750);
    }

  return (
    <DataTable 
        data={conflictos}
        ref={table}
        columns={columns}
        className="display"
        onInit={initEvent}
        onDraw={(e: Event) =>setTooltips()}
        options={{
            responsive: {
                details: {
                    renderer:   DataTablesCore.Responsive.renderer.listHiddenNodes()
                }
            },
            select: true,
        }}
        slots={{
            12: (data, row) => (generarAcciones(row))
        }} 
    >
        <thead>
            <tr>
                <th className="text-center">Fecha</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Municipio</th>
                <th className="text-center">Promovente</th>
                <th className="text-center">Contraparte</th>
                <th className="text-center">Vertiente</th>
                <th className="text-center">Superficie en Conflicto</th>
                <th className="text-center">Superficie Atendida</th>
                <th className="text-center">Régimen Social</th>
                <th className="text-center">Estatus</th>
                <th className="text-center">Sintésis de Atención</th>
                <th className="text-center">Organización Inv.</th>
                <th className="text-center">Acciones</th>
            </tr>
        </thead>
    </DataTable>
  )
}
