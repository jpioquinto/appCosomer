import {React, useState, useEffect} from 'react'
import Breadcrumb from "../partial/Breadcrumb"
import {useLocation} from "react-router-dom"

import type { MenuItem } from "../../types"

export default function Perfil() {
    const location = useLocation();
    
    const [modulo, setModulo] = useState<MenuItem>({})

    useEffect(() => {
        setModulo(location.state)
    }, [])

    return (
        <>
            <div className="page-inner">
                <div className="page-header">
                    <Breadcrumb nombre={modulo.descripcion} id={modulo.id} />
                </div> 
            </div>
        </>
    )
}