import React, {useState} from 'react'
import { baseURL } from '../utils'

export default function Footer() {
    let fechaActual = new Date();
    
    const [anio, setAnio] = useState<number>(fechaActual.getFullYear())

    return (
        <footer className="footer">
            <div className="container-fluid">
                <nav className="pull-left">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.gob.mx/sedatu" target='_blank'>
                                <img src={`${baseURL()}/assets/images/logos/logo.svg`} alt="navbar brand" className="navbar-brand logo-sidebar" />
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="copyright ms-auto">
                    <span className='fw-medium'>{anio}, Subsecretaría de Ordenamiento Agrario e Inventarios de la Propiedad | Dirección General de Concertación Agraria y Mediación</span>
                </div>				
            </div>
        </footer>
    )
}