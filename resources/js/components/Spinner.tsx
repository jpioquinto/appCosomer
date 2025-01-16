import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import "../../css/spinner.css"

export default function Spinner({texto, omitCancel}) {
    return (
        <div className="spinner">
            {texto ? (<h5>{texto}</h5>) : (<h5>Cargando, espere un momento...</h5>)}
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div><br />
            {omitCancel ? '' : (<a className="btn btn-danger"><FontAwesomeIcon icon="fas fa-circle-xmark" /> Cancelar</a>)}
        </div>
    )
}