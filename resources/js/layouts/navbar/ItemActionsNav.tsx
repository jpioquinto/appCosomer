import React from 'react'

import { useItemActionsNav } from '../../hooks/useItemActionsNav'

export default function ItemActionsNav() {
    const {toggle, handlerToggle} = useItemActionsNav();
  return (
    <>
        <a className={`nav-link ${toggle.classToggle}`} href='#' data-bs-toggle="dropdown" aria-expanded={`${toggle.aria}`} onClick={handlerToggle}>
            <i className='fas fa-layer-group'></i>
        </a>
        <div className={`dropdown-menu quick-actions animated fadeIn ${toggle.classToggle}`}>
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
                                    <i className="far fa-calendar-alt" />
                                </div>
                                <span className="text">Calendar</span>
                            </div>
                        </a>
                        <a className="col-6 col-md-4 p-0" href="#">
                            <div className="quick-actions-item">
                                <div className="avatar-item bg-warning rounded-circle">
                                    <i className="fas fa-map" />
                                </div>
                                <span className="text">Maps</span>
                            </div>
                        </a>
                        <a className="col-6 col-md-4 p-0" href="#">
                            <div className="quick-actions-item">
                                <div className="avatar-item bg-info rounded-circle">
                                    <i className="fas fa-file-excel" />
                                </div>
                                <span className="text">Reports</span>
                            </div>
                        </a>
                        <a className="col-6 col-md-4 p-0" href="#">
                            <div className="quick-actions-item">
                                <div className="avatar-item bg-success rounded-circle">
                                    <i className="fas fa-envelope" />
                                </div>
                                <span className="text">Emails</span>
                            </div>
                        </a>
                        <a className="col-6 col-md-4 p-0" href="#">
                            <div className="quick-actions-item">
                                <div className="avatar-item bg-primary rounded-circle">
                                    <i className="fas fa-file-invoice-dollar" />
                                </div>
                                <span className="text">Invoice</span>
                            </div>
                        </a>
                        <a className="col-6 col-md-4 p-0" href="#">
                            <div className="quick-actions-item">
                                <div className="avatar-item bg-secondary rounded-circle">
                                    <i className="fas fa-credit-card" />
                                </div>
                                <span className="text">Payments</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
