import React from 'react'

import DataTable from 'datatables.net-react'
import DT from 'datatables.net-bs5'

DataTable.use(DT);

export default function TablaRegistro() {
    const columns = [
        { data: 'fecha' },
        { data: 'estado' },
        { data: 'municipio' },
        { data: 'promovente'},
        { data: 'contraparte'},
        { data: 'vertiente'},
        { data: 'problematica'},
        { data: 'superficie'},
        { data: 'superficie_atendida'},
        { data: 'num_beneficiarios' },
        { data: 'reg_social' },
        { data: 'estatus' },
        { data: 'sintesis_estatus' },
        { data: 'org_involucrada' },
        { data: 'id' },
      ];

  return (
    <DataTable 
        data={[]}
    
        columns={columns}
        className="display"
        options={{
            responsive: true,
            select: true,
        }}
    >
        <tr>
                <th className="text-center">Fecha</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Municipio</th>
                <th className="text-center">Promovente</th>
                <th className="text-center">Contraparte</th>
                <th className="text-center">Vertiente</th>
                <th className="text-center">Problemática</th>
                <th className="text-center">Superficie en Conflicto</th>
                <th className="text-center">Superficie Atendida</th>
                <th className="text-center">Número de Beneficiarios</th>
                <th className="text-center">Régimen Social</th>
                <th className="text-center">Estatus</th>
                <th className="text-center">Sintésis del Estatus</th>
                <th className="text-center">Organización Inv.</th>
                <th className="text-center">Acciones</th>
            </tr>
    </DataTable>
  )
}
