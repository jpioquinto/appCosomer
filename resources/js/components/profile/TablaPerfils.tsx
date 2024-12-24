import React, {useRef, useEffect, useState} from 'react'
import { useModuloStore } from '../../store/modulo'

import DataTable from 'datatables.net-react'
import DT from 'datatables.net-bs5'

import * as bootstrap from 'bootstrap'
import { PerfilsSchema } from '../../types'
 
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
        { data: 'creado_el' },
        { data: 'creador' },
        { data: 'id' },
      ];

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
                <th className="text-cente">Nombre</th>
                <th className="text-cente">Descripción</th>
                <th className="text-cente">Estatus</th>
                <th className="text-cente">Fecha de creación</th>
                <th className="text-cente">Creado por</th>
                <th className="text-cente">Acciones</th>
            </tr>
        </thead>
    </DataTable>
  )
}
