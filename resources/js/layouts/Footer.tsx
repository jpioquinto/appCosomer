import React, {useState} from 'react'
export default function Footer() {
    let fechaActual = new Date();
    
    const [anio, setAnio] = useState<int>(fechaActual.getFullYear())

    return (
        <footer className="footer">
            <div className="container-fluid">
                <nav className="pull-left">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.gob.mx/sedatu">
                                <img src={`${import.meta.env.VITE_APP_URL}/assets/images/logos/logo.svg`} alt="navbar brand" className="navbar-brand logo-sidebar" />
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="copyright ms-auto">
                    <span className='fw-medium'>{anio}, Subsecretaría de Ordenamiento Agrario e Inventarios de la Propiedad | Dirección General de Concertación Agraria</span>
                </div>				
            </div>
        </footer>
    )
}