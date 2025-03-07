import type { MenuItem } from "../../types"
import React from 'react'

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