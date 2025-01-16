import React from 'react'
import { Link } from 'react-router-dom'
import { useItemUserNav } from '../../hooks/useItemUserNav'
export default function ItemUserNav() {
    const {contact, toggle, handlerToggle} = useItemUserNav()

  return (
    <>
        <a 
            className={`dropdown-toggle profile-pic ${toggle.classToggle}`} 
            data-bs-toggle="dropdown" href="#" aria-expanded={`${toggle.aria}`}
            onClick={handlerToggle}    
        >
            <div className="avatar-sm">
                <img src={contact.foto!} alt="Avatar de perfil" className="avatar-img rounded-circle" />
            </div>
            <span className="profile-username">
                <span className="op-7">Bienvenid@,</span> <span className="fw-bold">{contact.nombre}</span>
            </span>
        </a>
        <ul className={`dropdown-menu dropdown-user animated fadeIn ${toggle.classToggle}`}>
            <div className="dropdown-user-scroll scrollbar-outer">
                <li>
                    <div className="user-box">
                        <div className="avatar-lg"><img src={contact.foto!} alt="imagen de perfil" className="avatar-img rounded" /></div>
                        <div className="u-text">
                            <h4>{contact.nombre}</h4>
                            <p className="text-muted">{contact.correo ? contact.correo : 'Sin correo electrónico'}</p>
                            <Link className="btn btn-xs btn-secondary btn-sm" to="/editar-perfil">Ver perfil</Link>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item">Cambiar contraseña</a>
                    <a className="dropdown-item">Salir</a>
                </li>
            </div>
        </ul>
    </>
  )
}
