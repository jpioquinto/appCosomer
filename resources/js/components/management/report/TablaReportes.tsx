import React, {useRef, useEffect} from 'react'

import DataTable, {DataTableRef} from 'datatables.net-react'
import DataTablesCore from 'datatables.net'
import DT from 'datatables.net-bs5'
import 'datatables.net-select-bs5'
import 'datatables.net-responsive-bs5'

import { useCatalogStore } from '../../../store/catalogStore'
import languaje from '../../../data/Spanish_Mexico.json'
import { Registros } from '../../../types/conflicto'

DataTable.use(DT);

type ConflictsProps = {
    conflicts:Registros,
}

export default function TablaReportes({conflicts}: ConflictsProps) {
    const {getEstatus, setOptionsEstatus} = useCatalogStore();

    const table = useRef<DataTableRef>(null);

    const columns = [
        { data: 'folio'},
        { data: 'vertAcronimo', className:'text-center'},
        { data: 'anioFiscal', className:'text-center'},
        { data: 'asunto'},
        { data: 'estado'},
        { data: 'municipio'},
        { data: 'promovente'},
        { data: 'predio'},
        { data: 'descEstatus'},
        { data: 'supconflicto'},
        { data: 'supatendida'},
        { data: 'numBeneficiario'},
        { data: 'regimen'},
        { data: 'nombreRegSoc'},
        { data: 'puebloIndigena'},
        { data: 'problematica'},
        { data: 'observaciones'},
      ];

  return (
    <DataTable 
        data={conflicts}
        ref={table}
        columns={columns}
        className="display"
        options={{
            pageLength: 100,
            language: languaje,
            responsive: {
                details: {
                    renderer:   DataTablesCore.Responsive.renderer.listHiddenNodes()
                }
            },
            searching:false,
            select: true
        }} 
    >
        <thead>
            <tr>
                <th className="text-center">Folio</th>
                <th className="text-center">Tipo Asunto</th>
                <th className="text-center">Ejercicio Fiscal</th>
                <th className="text-center">Asunto</th>
                <th className="text-center">Entidad</th>
                <th className="text-center">Municipio</th>
                <th className="text-center">Promovente</th>
                <th className="text-center">Nombre del Predio</th>
                <th className="text-center">Estatus</th>
                <th className="text-center">Superficie Legal</th>
                <th className="text-center">Superficie Medida</th>
                <th className="text-center">Núm. Beneficiados</th>
                <th className="text-center">Régimen Social</th>
                <th className="text-center">Nombre Rég. Social</th>
                <th className="text-center">Pueblo Indigena</th>
                <th className="text-center">Problemática</th>
                <th className="text-center">Observaciones</th>
            </tr>
        </thead>
    </DataTable>
  )
}
