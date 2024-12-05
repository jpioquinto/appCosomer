import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import type { MenuItem } from "../../types"



library.add(fas, far)

type ItemProps = {
    item:MenuItem,
}

export default function ItemInfoNav({item}: ItemProps) {
    return (
        <li className="nav-section">
            <span className="sidebar-mini-icon">
                <i className={item.icono} ></i>
            </span>
            <h4 className="text-section">{item.nombre}</h4>
        </li>
    )
}