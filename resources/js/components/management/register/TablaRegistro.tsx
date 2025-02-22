import React, {useRef, useState, useEffect} from 'react'

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

export default function TablaRegistro({conflictos}: ConflictsProps) {
    const modulo = useModuloStore(state=>state.modulo);

    const {getEstatus, setOptionsEstatus} = useCatalogStore();

    const table = useRef<DataTableRef>(null);

    const columns = [
        { data: 'fecha', render: DT.render.date()},
        { data: 'folio' },
        { data: 'estado' },
        { data: 'municipio' },
        { data: 'promovente'},
        { data: 'contraparte'},
        { data: 'vertiente'},
        { data: 'problematica'},
        { data: 'supconflicto'},
        { data: 'numBeneficiario', className:'text-center'},
        { data: 'regimen' },
        { data: 'descEstatus' },
        { data: 'orgInvolucrada' },
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
            language: languaje,
            responsive: {
                details: {
                    renderer:   DataTablesCore.Responsive.renderer.listHiddenNodes()
                }
            },
            select: true,
        }}       
        slots={{
            13: (data, row) => (generarAcciones(row))
        }}
    >
        <thead>
            <tr>
                <th className="text-center">Fecha</th>
                <th className="text-center">Folio</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Municipio</th>
                <th className="text-center">Promovente</th>
                <th className="text-center">Contraparte</th>
                <th className="text-center">Vertiente</th>
                <th className="text-center">Problemática</th>
                <th className="text-center">Superficie en Conflicto</th>
                <th className="text-center">Número de Beneficiarios</th>
                <th className="text-center">Régimen Social</th>
                <th className="text-center">Estatus</th>
                <th className="text-center">Organización Inv.</th>
                <th className="text-center">Acciones</th>
            </tr>
        </thead>
    </DataTable>
  )
}
