import React from 'react'

import { useSidebar } from '../hooks/useSidebar'
import { useNavBarStore } from '../store/navbar'

import { Link } from 'react-router-dom'
import UserNav from './navbar/UserNav'
import Nav from './navbar/Nav'
import { baseURL } from '../utils'

export default function Sidebar() {

	const {classToggle, iconToggle, sideNavToggler, topBarToggler, handlerMouseEnter, handlerMouseLeave, clickSideNavToggler, clickToggleSidebar, clickTopBar} = useSidebar();
	
	const {menu} = useNavBarStore();

    return (
		<div className="sidebar sidebar-style-2" onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave}>
			<div className="sidebar-logo">				
				<div className="logo-header" data-background-color="blue">
					<Link to="/" className="logo">
						<img src={`${baseURL()}/assets/images/logos/logo.svg`} alt="navbar brand" className="navbar-brand logo-sidebar" />
					</Link>
					<div className="nav-toggle">
						<button className={classToggle} onClick={clickToggleSidebar}>
							<i className={iconToggle}></i>
						</button>
						<button className={`btn btn-toggle ${sideNavToggler.clase}`} onClick={clickSideNavToggler}>
							<i className="gg-menu-left"></i>
						</button>
					</div>
					<button className={topBarToggler.clase} onClick={clickTopBar}>
						<i className="gg-more-vertical-alt"></i>
					</button>
				</div>				
			</div>	
			<div className="sidebar-wrapper scrollbar scrollbar-inner">
				<div className="sidebar-content">
					<UserNav />
					<Nav 
						menu={menu}
						clase={'nav nav-primary mt-2'}
						nivel={0}
						key={0}
					/>					
				</div>
			</div>
		</div>
    )
}