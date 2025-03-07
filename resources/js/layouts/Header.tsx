import React from 'react'
import ItemActionsNav from './navbar/ItemActionsNav'
import { useSidebar } from '../hooks/useSidebar'
import ItemUserNav from './navbar/ItemUserNav'
import { Link } from 'react-router-dom'

export default function Header() {
    const {clickSideNavToggler, clickTopBar, clickToggleSidebar} = useSidebar();
    return (
        <div className="main-header">
            <div className="main-header-logo">
                
                <div className="logo-header" data-background-color="blue">
                    <Link to="/" className="logo">
                        <img src={`${import.meta.env.VITE_APP_URL}/assets/images/logos/logo.svg`} alt="navbar brand" className="navbar-brand" height="20" />
                    </Link>
                    <button className="navbar-toggler sidenav-toggler ms-auto" type="button" onClick={clickSideNavToggler} data-bs-toggle="collapse" data-bs-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            <i className="gg-menu-right"></i>
                        </span>
                    </button>
                    <button className="topbar-toggler more" onClick={clickTopBar}><i className="icon-options-vertical"></i></button>
                    <div className="nav-toggle">
                        <button className="btn btn-toggle toggle-sidebar" onClick={clickToggleSidebar}>
                            <i className="gg-menu-right"></i>
                        </button>
                    </div>
                </div>
                
            </div>
            
            <nav className="navbar navbar-header navbar-expand-lg" data-background-color="blue2">

                <div className="container-fluid">
                    <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button type="submit" className="btn btn-search pe-1">
                                    <i className='fa fa-search search-icon'></i>
                                </button>
                            </div>
                            <input type="text" placeholder="Búsqueda ..." className="form-control" />
                        </div>
                    </nav>

                    <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
                        <li className="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" aria-haspopup="true">
                                <i className="fa fa-search"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-search animated fadeIn">
                                <form className="navbar-left navbar-form nav-search">
                                    <div className="input-group">
                                        <input type="text" placeholder="Búsqueda ..." className="form-control" />
                                    </div>
                                </form>
                            </ul>
                        </li>                        
                        <li className="nav-item topbar-icon dropdown hidden-caret">
                           <ItemActionsNav /> 
                        </li>
                        
                        <li className="nav-item topbar-user dropdown hidden-caret">
                            <ItemUserNav />
                        </li>
                    </ul>
                </div>
            </nav>        
        </div>
    )
}