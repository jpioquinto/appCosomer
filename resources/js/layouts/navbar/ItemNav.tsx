import { MouseEvent } from "react"
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import type { Menu, MenuItem } from "../../types"

import useNavBar from '../../hooks/useNavBar'

import Nav from './Nav'

library.add(fas, far)

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
            <NavLink to={item.ruta} className={nodoPadre ? toggle.collapsed : undefined}>							
                <FontAwesomeIcon icon={item.icono} />&nbsp;
                <p className="pt-1">{item.nombre}</p>
                {nodoPadre ? (<span className="caret"></span>) : ''}
            </NavLink>
            {
                nodoPadre 
                ? (<div className={toggle.collapse} id={'modulo-'+(100+item.id)}>
                        <Nav menu={item.items as Menu} clase={'nav nav-collapse'} key={`items-`+item.id}/>
                    </div>) : ''
            }
        </li>
    )
}