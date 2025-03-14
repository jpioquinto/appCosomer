import React, {useRef, useEffect} from 'react'

import DataTable, {DataTableRef} from 'datatables.net-react'
import DataTablesCore from 'datatables.net'
import DT from 'datatables.net-bs5'
import 'datatables.net-select-bs5'
import 'datatables.net-responsive-bs5'

import languaje from '../../../data/Spanish_Mexico.json'
import { Registro, Registros } from '../../../types/conflicto'
import { useCatalogStore } from '../../../store/catalogStore'
import type { Acciones } from '../../../types'
import { useModuloStore } from '../../../store/modulo'
import BtnAccion from './BtnAccion'
import * as bootstrap from 'bootstrap'

import type { Option } from '../../../types'

DataTable.use(DT);

type ConflictsProps = {
    conflictos:Registros
}

export default function TablaAsuntos({conflictos}: ConflictsProps) {
    const modulo = useModuloStore(state=>state.modulo);

    const {getEstatus, setOptionsEstatus} = useCatalogStore();

    const table = useRef<DataTableRef>(null);

    const columns = [
        { data: 'folio' },
        { data: 'vertAcronimo', className:'text-center'},
        { data: 'anioFiscal', className:'text-center'},
        { data: 'asunto' },
        { data: 'estado' },
        { data: 'municipio' },
        { data: 'promovente'},
        { data: 'predio'},
        { data: 'descEstatus' },
        { data: 'supconflicto'},
        { data: 'supatendida'},
        { data: 'id' },
      ];

    const generarAcciones = (registro:Registro) => {            
        return <BtnAccion acciones={modulo.acciones as Acciones} conflicto={registro} key={registro.id}/>     
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

    useEffect(() => {
        let $options: Option[] = [];
        getEstatus().forEach((estatus) => {
            $options.push({value: estatus.id, label: estatus.descripcion})
        })
        setOptionsEstatus($options)
    }, [])

  return (
    <DataTable 
        data={conflictos}
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
            11: (data, row) => (generarAcciones(row))
        }}
    >
        <thead>
            <tr>
                <th className="text-center">Folio</th>
                <th className="text-center">Rubro</th>
                <th className="text-center">Ejercicio Fiscal</th>
                <th className="text-center">Asunto</th>
                <th className="text-center">Entidad</th>
                <th className="text-center">Municipio</th>
                <th className="text-center">Promovente</th>
                <th className="text-center">Nombre del Predio</th>
                <th className="text-center">Estatus</th>
                <th className="text-center">Superficie Legal</th>
                <th className="text-center">Superficie Medida</th>
                <th className="text-center">Acciones</th>
            </tr>
        </thead>
    </DataTable>
  )
}
