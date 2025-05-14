import type { LoadingProps } from '../types'
import React from 'react'

import "../../css/spinner.css"

export default function Spinner({texto, omitCancel}: LoadingProps) {
    return (
        <div className="spinner">
            {texto ? (<h5>{texto}</h5>) : (<h5>Cargando, espere un momento...</h5>)}
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div><br />
            {omitCancel ? '' : (<a className="btn btn-danger"><i className={'fas fa-times-circle'} /> Cancelar</a>)}
        </div>
    )
}