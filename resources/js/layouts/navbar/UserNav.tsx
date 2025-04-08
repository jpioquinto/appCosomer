import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUserNav } from '../../hooks/useUserNav'

export default function UserNav() {
    const {user, toggle, getFoto, handlerCollapse} = useUserNav()

  return (
    <div className="user">
        <div className="avatar-sm float-start me-2">
            <img src={getFoto()} alt="Foto de perfil" className="avatar-img rounded-circle" />
        </div>
        <div className="info">
            <a 
                data-bs-toggle='collapse' 
                href='#config-user'
                className={toggle.classToggle}
                aria-expanded={`${toggle.aria}`}
                onClick={handlerCollapse}
            >
                <span>
                    {user.name}
                    <span className="user-level">{user.perfil}</span>
                    <span className="caret"></span>
                </span>
            </a>
            <div className="clearfix"></div>

            <div className={`${toggle.collapse}`}>
                <ul className="nav">
                    <li>
                        <NavLink to="/editar-perfil">
                            <span className="link-collapse">Editar perfil</span>
                        </NavLink>
                    </li>
                    <li>
                        <a href="#settings">
                            <span className="link-collapse">Cambiar contraseña</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
