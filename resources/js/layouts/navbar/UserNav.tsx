import React from 'react'
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
                data-bs-toggle="collapse" 
                href="#collapseUser" 
                className={toggle.classToggle}
                aria-expanded={toggle.aria} 
                onClick={handlerCollapse}
            >
                <span>
                    {user.name}
                    <span className="user-level">{user.perfil}</span>
                    <span className="caret"></span>
                </span>
            </a>
            <div className="clearfix"></div>

            <div className={toggle.collapse} id="collapseUser">
                <ul className="nav">
                    <li>
                        <a href="#edit">
                            <span className="link-collapse">Editar perfil</span>
                        </a>
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
