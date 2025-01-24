import React from 'react'

import DataTable from 'datatables.net-react'
import DT from 'datatables.net-bs5'
import 'datatables.net-select-bs5'
import 'datatables.net-responsive-bs5'
import { Registros } from '../../../types/conflicto';

DataTable.use(DT);

type ConflictsProps = {
    conflictos:Registros
}

export default function TablaRegistro({conflictos}: ConflictsProps) {
    const columns = [
        { data: 'fecha', render: DT.render.date()},
        { data: 'estado' },
        { data: 'municipio' },
        { data: 'promovente'},
        { data: 'contraparte'},
        { data: 'vertiente'},
        { data: 'problematica'},
        { data: 'supConflicto'},
        { data: 'supAtendida'},
        { data: 'numBeneficiario', className:'text-center'},
        { data: 'regimen' },
        { data: 'descEstatus' },
        { data: 'sintEstatus' },
        { data: 'orgInvolucrada' },
        { data: 'id' },
      ];

  return (
    <DataTable 
        data={conflictos}
    
        columns={columns}
        className="display"
        options={{
            responsive: true,
            select: true,
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
        </thead>
    </DataTable>
  )
}
