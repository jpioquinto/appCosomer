import { MouseEvent, useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { useSidebarStore } from '../store/sidebar'

library.add(fas, far)

export default function Sidebar() {

	const {claseMinimize, minimize, firstToggle, setMinimize, setFirstToggle, addClaseMinimize, removeClaseMinimize} = useSidebarStore();

	const [classToggle, setClassToggle] = useState<string>('btn btn-toggle toggle-sidebar');

	const [iconToggle, setIconToggle] = useState<String>('gg-menu-right');

	const [sideNavToggler, setSideNavToggler] = useState({
		clase:'sidenav-toggler',
		open:false,
	});

	const [topBarToggler, setTopBarToggler] = useState({
		clase:'topbar-toggler more',
		open:false,
	});

	useEffect(() => {
		//setSideNavToggler({...sideNavToggler, open:true})

		if (claseMinimize.split(' ').includes('sidebar_minimize')) {
			setMinimize(1);
		}
		
		setFirstToggle(true);
	}, [claseMinimize]);

	const addClase = (clases: string[], clase: string, indice: number = -1): string => {
		indice > 0 ? clases[indice] = clase : clases.push(clase);

		return clases.join(' ');
	}

	const removeClase = (clases: string[], clase: string): string => {
		const resultado = clases.filter($clase => $clase !== clase)

		return resultado.join(' ')
	}

	const handlerMouseEnter = (e: MouseEvent<HTMLElement>) => {	
		if (minimize == 1 && !firstToggle) {
			addClaseMinimize('sidebar_minimize_hover');						
			setFirstToggle(true);		
		} else {
			removeClaseMinimize('sidebar_minimize_hover');						
		}
	}

	const handlerMouseLeave = (e: MouseEvent<HTMLElement>) => {
		if (minimize == 1 && firstToggle) {
			removeClaseMinimize('sidebar_minimize_hover');	
			setFirstToggle(false);		
		}
	}

	const clickSideNavToggler = (e: MouseEvent<HTMLButtonElement>) => {
		if (sideNavToggler.open) {
			document.getElementsByTagName('html')[0].classList.remove('nav_open');
			setSideNavToggler({
				clase:removeClase(sideNavToggler.clase.split(' '), 'toggled'),
				open:false
			});
		} else {
			document.getElementsByTagName('html')[0].classList.add('nav_open');
			setSideNavToggler({
				clase:addClase(sideNavToggler.clase.split(' '), 'toggled'),
				open:true
			});
		}
	}

	const clickToggleSidebar = (e: MouseEvent<HTMLButtonElement>) => {
		let $claseToggle = classToggle;

		if (minimize === 1) {
			$claseToggle = removeClase(classToggle.split(' '), 'toggled');
			removeClaseMinimize('sidebar_minimize');
			setIconToggle('gg-menu-right');	
			setMinimize(0);
		} else {
			$claseToggle = addClase(classToggle.split(' '), 'toggled', 3);
			addClaseMinimize('sidebar_minimize');
			setIconToggle('gg-more-vertical-alt');
			setMinimize(1);
		}
		
		setClassToggle($claseToggle);
	}

	const clickTopBar = (e: MouseEvent<HTMLButtonElement>) => {
		if (topBarToggler.clase) {
			document.getElementsByTagName('html')[0].classList.remove('topbar_open');
			setTopBarToggler({
				clase:removeClase(topBarToggler.clase.split(' '), 'toggled'),
				open:false
			});
		} else {
			document.getElementsByTagName('html')[0].classList.add('topbar_open');
			setTopBarToggler({
				clase:addClase(topBarToggler.clase.split(' '), 'toggled'),
				open:true
			});
		}
	}

    return (
		<div className="sidebar sidebar-style-2" onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave}>
			<div className="sidebar-logo">				
				<div className="logo-header" data-background-color="blue">

					<a href="index.html" className="logo">
						<img src="assets/img/kaiadmin/logo_light.svg" alt="navbar brand" className="navbar-brand" height="20" />
					</a>
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
					<div className="user">
						<div className="avatar-sm float-start me-2">
							<img src="assets/img/profile.jpg" alt="..." className="avatar-img rounded-circle" />
						</div>
						<div className="info">
							<a data-bs-toggle="collapse" href="#collapseExample" aria-expanded="true">
								<span>
									Hizrian
									<span className="user-level">Administrator</span>
									<span className="caret"></span>
								</span>
							</a>
							<div className="clearfix"></div>

							<div className="collapse in" id="collapseExample">
								<ul className="nav">
									<li>
										<a href="#profile">
											<span className="link-collapse">My Profile</span>
										</a>
									</li>
									<li>
										<a href="#edit">
											<span className="link-collapse">Edit Profile</span>
										</a>
									</li>
									<li>
										<a href="#settings">
											<span className="link-collapse">Settings</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<ul className="nav nav-primary mt-2">
						<li className="nav-item active">
							<a data-bs-toggle="collapse" href="#dashboard" className="collapsed" aria-expanded="false">
								<FontAwesomeIcon icon="fas fa-home" />
								<p>Dashboard</p>
								<span className="caret"></span>
							</a>
							<div className="collapse" id="dashboard">
								<ul className="nav nav-collapse">
									<li>
										<a href="../demo1/index.html">
											<span className="sub-item">Dashboard 1</span>
										</a>
									</li>
									<li>
										<a href="../demo2/index.html">
											<span className="sub-item">Dashboard 2</span>
										</a>
									</li>
									<li>
										<a href="../demo3/index.html">
											<span className="sub-item">Dashboard 3</span>
										</a>
									</li>
									<li>
										<a href="../demo4/index.html">
											<span className="sub-item">Dashboard 4</span>
										</a>
									</li>
									<li>
										<a href="../demo5/index.html">
											<span className="sub-item">Dashboard 5</span>
										</a>
									</li>
									<li>
										<a href="../demo6/index.html">
											<span className="sub-item">Dashboard 6</span>
										</a>
									</li>
									<li>
										<a href="../demo7/index.html">
											<span className="sub-item">Dashboard 7</span>
										</a>
									</li>
									<li>
										<a href="../demo8/index.html">
											<span className="sub-item">Dashboard 8</span>
										</a>
									</li>
									<li>
										<a href="../demo9/index.html">
											<span className="sub-item">Dashboard 9</span>
										</a>
									</li>
								</ul>
							</div>
						</li>
						<li className="nav-section">
							<span className="sidebar-mini-icon">
								<FontAwesomeIcon icon="fa fa-ellipsis-h" />
							</span>
							<h4 className="text-section">Módulos</h4>
						</li>
						<li className="nav-item">
							<a href="calendar.html">							
								<FontAwesomeIcon icon="far fa-calendar-alt" />
								<p>Calendar</p>
								<span className="badge badge-info">1</span>
							</a>
						</li>
						<li className="nav-item">
							<a href="widgets.html">
								<FontAwesomeIcon icon="fas fa-desktop" />
								<p>Widgets</p>
								<span className="badge badge-success">4</span>
							</a>
						</li>
						<li className="nav-section">
							<span className="sidebar-mini-icon">
								<FontAwesomeIcon icon="fa fa-ellipsis-h" />
							</span>
							<h4 className="text-section">Snippets</h4>
						</li>
						<li className="nav-item">
							<a data-bs-toggle="collapse" href="#email-nav">
								<FontAwesomeIcon icon="far fa-envelope" />
								<p>Email</p>
								<span className="caret"></span>
							</a>
							<div className="collapse" id="email-nav">
								<ul className="nav nav-collapse">
									<li>
										<a href="email-inbox.html">
											<span className="sub-item">Inbox</span>
										</a>
									</li>
									<li>
										<a href="email-compose.html">
											<span className="sub-item">Email Compose</span>
										</a>
									</li>
									<li>
										<a href="email-detail.html">
											<span className="sub-item">Email Detail</span>
										</a>
									</li>
								</ul>
							</div>
						</li>
						<li className="nav-item">
							<a data-bs-toggle="collapse" href="#messages-app-nav">
								<FontAwesomeIcon icon="far fa-paper-plane" />
								<p>Messages App</p>
								<span className="caret"></span>
							</a>
							<div className="collapse" id="messages-app-nav">
								<ul className="nav nav-collapse">
									<li>
										<a href="messages.html">
											<span className="sub-item">Messages</span>
										</a>
									</li>
									<li>
										<a href="conversations.html">
											<span className="sub-item">Conversations</span>
										</a>
									</li>
								</ul>
							</div>
						</li>
						<li className="nav-item">
							<a href="invoice.html">
								<FontAwesomeIcon icon="fas fa-file-invoice-dollar" />
								<p>Invoices</p>
								<span className="badge badge-count">6</span>
							</a>
						</li>
						<li className="nav-item">
							<a href="404.html">
								<FontAwesomeIcon icon="fas fa-paint-roller" />
								<p>404</p>
								<span className="badge badge-count">6</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>		
    )
}