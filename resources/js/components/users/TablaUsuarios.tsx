import React from 'react'

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
/*import 'datatables.nt-responsive-dt';
import 'datatables.net-select-dt';*/

import { listadoUsuarios } from '../../services/UserService';
 
DataTable.use(DT);

export default function TablaUsuarios() {
    const listadoUsers = async () => {
        const datos = await listadoUsuarios()

        return datos;
    }
    console.log(listadoUsers())
  return (
    <DataTable className="display">
        <thead>
            <tr>
                <th rowSpan="2" className="text-center">UR</th>
                <th rowSpan="2" className="text-center">Usuario</th>
                <th rowSpan="2" className="text-center">Perfil</th>
                <th rowSpan="2" className="text-center">Estatus</th>
                <th colSpan="2" className="text-center">Fechas</th>
                <th rowSpan="2" className="text-center">Creado por</th>
            </tr>
            <tr>
                <th className="text-center">Creado el</th>
                <th className="text-center">Último acceso</th>
            </tr>
        </thead>
    </DataTable>
  )
}
