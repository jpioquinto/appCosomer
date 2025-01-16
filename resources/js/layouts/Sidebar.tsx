import logo from './../../../public/assets/images/logos/logo.svg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { Link } from "react-router-dom"
import React from 'react'

import { useSidebar } from '../hooks/useSidebar'
import { useNavBarStore } from '../store/navbar'

import Nav from './navbar/Nav'
import UserNav from './navbar/UserNav';

library.add(fas, far)

export default function Sidebar() {

	const {classToggle, iconToggle, sideNavToggler, topBarToggler, handlerMouseEnter, handlerMouseLeave, clickSideNavToggler, clickToggleSidebar, clickTopBar} = useSidebar();
	
	const {menu} = useNavBarStore();

	/*useEffect(()=> {
		items.map(($item:item) => setLoaded($item))
	},[items])*/

    return (
		<div className="sidebar sidebar-style-2" onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave}>
			<div className="sidebar-logo">				
				<div className="logo-header" data-background-color="blue">
					<Link to="/" className="logo">
						<img src={logo} alt="navbar brand" className="navbar-brand logo-sidebar" />
					</Link>
					<div className="nav-toggle">
						<button className={classToggle} onClick={clickToggleSidebar}>
							<i className={iconToggle}></i>
						</button>
						<button className={`btn btn-toggle ${sideNavToggler.clase}`} onClick={clickSideNavToggler}>
							<i className="gg-menu-left"></i><strong>sidenav-toggler...</strong>
						</button>
					</div>
					<button className={topBarToggler.clase} onClick={clickTopBar}>
						<i className="gg-more-vertical-alt"></i><strong>topbar-toggler...</strong>
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