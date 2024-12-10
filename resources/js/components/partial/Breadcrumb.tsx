import { useNavBarStore } from '../../store/navbar'

import type { Menu } from '../../types'

import React from 'react'

type ModuloProps = {
    nombre:string,
    id:number
}

export default function Breadcrumb({nombre, id}: ModuloProps) {
    const {menu} = useNavBarStore();

    const generarListado = ($menu:Menu, $id:number) => {
        const listado : JSX.Element[] = []

        $menu.map(item => {
            if (item.id!==$id) {
                if (Array.isArray(item.items) && item.items.length>0) {
                    listado.push( generarListado(item.items as Menu, $id) );
                }
                return item;
            } 

            if (item.nodo_padre>0) {
                listado.push(generarListado(menu, item.nodo_padre));                 
            }
            
            listado.push(
                <li className="separator" key={`separator-${item.icono}`}><i className='flaticon-right-arrow'></i></li>              
            )
            listado.push(<li className='nav-item' key={`bread-${item.id}`}><a>{item.nombre}</a></li> )
            return item;
        })

        return listado
    }

  return (
    <div className="d-flex">
        <h4 className="page-title"> {nombre} </h4>
        <ul className="breadcrumbs">
            <li className="nav-home">
                <a href="#">
                    <i className='flaticon-home'></i>
                </a>
            </li>
            {generarListado(menu, id)}                        
        </ul>
    </div>
  )
}
