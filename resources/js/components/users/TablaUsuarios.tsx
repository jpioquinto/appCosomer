import React, {useRef, useEffect, useState} from 'react'

import DataTable from 'datatables.net-react'
import DT from 'datatables.net-bs5'
/*import 'datatables.nt-responsive-dt';
import 'datatables.net-select-dt';*/
import type { Acciones, User, Users } from '../../types'

import { useModuloStore } from '../../store/modulo'
import BtnAccion from './BtnAccion'
import * as bootstrap from 'bootstrap'
 
DataTable.use(DT);

type UsersProps = {
    users:Users
}

export default function TablaUsuarios({users}: UsersProps) {

    const modulo = useModuloStore(state=>state.modulo)

    let [rowsActions, setRowsActions] = useState(0)   
    
    const table = useRef();//console.log(table)
    
    const columns = [
        { data: 'ur' },
        { data: 'nickname' },
        { data: 'perfil' },
        { data: 'estatus', className:'text-center'},
        { data: 'creado_el', className:'text-center', render: DT.render.datetime()},
        { data: 'ultimo_acceso', className:'text-center', render: DT.render.datetime()},
        { data: 'creador' },
        { data: 'id' },
      ];
    
    const generarAcciones = (user:User) => {
        setRowsActions(++rowsActions)
              
        return <BtnAccion acciones={modulo.acciones as Acciones} user={user} key={user.id} />        
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
        data={users}
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
