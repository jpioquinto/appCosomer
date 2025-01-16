import logo from './../../../public/assets/images/logos/logo.svg'
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import ItemUserNav from './navbar/ItemUserNav'

library.add(fas, far)

export default function Header() {
    return (
        <div className="main-header">
            <div className="main-header-logo">
                
                <div className="logo-header" data-background-color="blue">
                    <a href="index.html" className="logo">
                        <img src={logo} alt="navbar brand" className="navbar-brand" height="20" />
                    </a>
                    <button className="navbar-toggler sidenav-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            <i className="gg-menu-right"></i>
                        </span>
                    </button>
                    <button className="topbar-toggler more"><i className="icon-options-vertical"></i></button>
                    <div className="nav-toggle">
                        <button className="btn btn-toggle toggle-sidebar">
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
                                    <FontAwesomeIcon icon="fa-solid fa-search search-icon" />
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
                                        <input type="text" placeholder="Search ..." className="form-control" />
                                    </div>
                                </form>
                            </ul>
                        </li>                        
                        <li className="nav-item topbar-icon dropdown hidden-caret">
                            <a className="nav-link dropdown-toggle" href="#" id="notifDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon icon="fas fa-layer-group" />
                            </a>
                            <div className="dropdown-menu quick-actions animated fadeIn" aria-labelledby="notifDropdown">
                                <div className="quick-actions-header">
                                    <span className="title mb-1">Acciones Rápidas</span>
                                    <span className="subtitle op-7">Atajos</span>
                                </div>
                                <div className="quick-actions-scroll scrollbar-outer">
                                    <div className="quick-actions-items">
                                        <div className="row m-0">
                                            <a className="col-6 col-md-4 p-0" href="#">
                                                <div className="quick-actions-item">
                                                    <div className="avatar-item bg-danger rounded-circle">
                                                        <FontAwesomeIcon icon="far fa-calendar-alt" />
                                                    </div>
                                                    <span className="text">Calendar</span>
                                                </div>
                                            </a>
                                            <a className="col-6 col-md-4 p-0" href="#">
                                                <div className="quick-actions-item">
                                                    <div className="avatar-item bg-warning rounded-circle">
                                                        <FontAwesomeIcon icon="fas fa-map" />
                                                    </div>
                                                    <span className="text">Maps</span>
                                                </div>
                                            </a>
                                            <a className="col-6 col-md-4 p-0" href="#">
                                                <div className="quick-actions-item">
                                                    <div className="avatar-item bg-info rounded-circle">
                                                        <FontAwesomeIcon icon="fas fa-file-excel" />
                                                    </div>
                                                    <span className="text">Reports</span>
                                                </div>
                                            </a>
                                            <a className="col-6 col-md-4 p-0" href="#">
                                                <div className="quick-actions-item">
                                                    <div className="avatar-item bg-success rounded-circle">
                                                        <FontAwesomeIcon icon="fas fa-envelope" />
                                                    </div>
                                                    <span className="text">Emails</span>
                                                </div>
                                            </a>
                                            <a className="col-6 col-md-4 p-0" href="#">
                                                <div className="quick-actions-item">
                                                    <div className="avatar-item bg-primary rounded-circle">
                                                        <FontAwesomeIcon icon="fas fa-file-invoice-dollar" />
                                                    </div>
                                                    <span className="text">Invoice</span>
                                                </div>
                                            </a>
                                            <a className="col-6 col-md-4 p-0" href="#">
                                                <div className="quick-actions-item">
                                                    <div className="avatar-item bg-secondary rounded-circle">
                                                        <FontAwesomeIcon icon="fas fa-credit-card" />
                                                    </div>
                                                    <span className="text">Payments</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
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