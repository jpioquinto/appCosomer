import { ReactNode, useEffect } from "react"
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
    nodoPadre:boolean

}
export default function ItemNav({item, nodoPadre}: ItemProps) {
    const {toggle, clickElemen} = useNavBar()

    return (
        <li 
            className="nav-item" 
            key={"modulo-"+item.id}
            onClick={clickElemen}            
        >
            <NavLink to={item.ruta} className={toggle.collapsed}>							
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