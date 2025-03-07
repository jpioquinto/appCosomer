import React, { MouseEvent } from "react"
import { NavLink } from 'react-router-dom'
import type { Menu, MenuItem } from "../../types"

import useNavBar from '../../hooks/useNavBar'

import Nav from './Nav'

type ItemProps = {
    item:MenuItem,
    nodoPadre:boolean,
    nivel:number
}
export default function ItemNav({item, nodoPadre, nivel}: ItemProps) {
    const {toggle, clickElemen} = useNavBar()

    return (
        <li 
            className={ nodoPadre 
                        ? ( nivel==0 ? toggle.classItemPadre + ` ${item.activo} submenu` : `${item.activo} submenu`) 
                        : `${toggle.classItem} ${item.activo}`
                    } 
            key={"modulo-"+item.id}
            onClick={(e: MouseEvent<HTMLElement>) => {e.stopPropagation(); clickElemen(item, nodoPadre);}}            
        >
            <NavLink to={item.ruta!} state={item} className={nodoPadre ? toggle.collapsed : undefined}>							
                <i className={item.icono}></i>
                <p className="pt-1">{item.nombre}</p>
                {nodoPadre ? (<span className="caret"></span>) : ''}
            </NavLink>
            {
                nodoPadre 
                ? (<div className={toggle.collapse} id={'modulo-'+(100+item.id)}>
                        <Nav menu={item.items as Menu} clase={'nav nav-collapse'} nivel={nivel+1} key={`items-`+item.id}/>
                    </div>) : ''
            }
        </li>
    )
}