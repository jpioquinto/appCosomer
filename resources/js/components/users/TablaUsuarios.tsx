import React, {useRef, useEffect} from 'react'

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
/*import 'datatables.nt-responsive-dt';
import 'datatables.net-select-dt';*/
import type { Acciones, MenuItem, User, Users } from '../../types';

import { useModuloStore } from '../../store/modulo';
import BtnAccion from '../partial/BtnAccion';
import Usuario from './Usuario';

 
DataTable.use(DT);

type UsersProps = {
    users:Users
}

export default function TablaUsuarios({users}: UsersProps) {

    const modulo = useModuloStore(state=>state.modulo)

    /*useEffect(()=>{
        console.log(users)
    },[users])*/
    
    const table = useRef();
    
    const columns = [
        { data: 'ur' },
        { data: 'nickname' },
        { data: 'perfil' },
        { data: 'estatus', className:'text-center'},
        { data: 'creado_el', className:'text-center'},
        { data: 'ultimo_acceso', className:'text-center'},
        { data: 'creador' },
        { data: 'id' },
      ];
    
    const generarAcciones = (user:User) => {
              
        return <BtnAccion acciones={modulo.acciones as Acciones} user={user} key={user.id} />        
    }
  return (
    <DataTable 
        data={users}
        ref={table}
        columns={columns}
        className="display"
        options={{
            responsive: true,
            select: true,
        }}
        slots={{
            3: (estatus, row) => {
                if (estatus===2) {
                    return <span className="badge rounded-pill badge-warning">Inactivo</span>
                }
                return <span className="badge rounded-pill badge-success">Activo</span>
            },
            7: (data, row) => {
                return generarAcciones(row)                
            }
        }}
    >
        <thead>
            <tr>
                <th rowSpan="2" className="text-center">UR</th>
                <th rowSpan="2" className="text-center">Usuario</th>
                <th rowSpan="2" className="text-center">Perfil</th>
                <th rowSpan="2" className="text-center">Estatus</th>
                <th colSpan="2" className="text-center">Fechas</th>
                <th rowSpan="2" className="text-center">Creado por</th>
                <th rowSpan="2" className="text-center">Acciones</th>
            </tr>
            <tr>
                <th className="text-center">Creado el</th>
                <th className="text-center">Último acceso</th>
            </tr>
        </thead>
    </DataTable>
  )
}
