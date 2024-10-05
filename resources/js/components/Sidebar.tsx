export default function Sidebar() {
    return (
		<div className="sidebar sidebar-style-2">
			<div className="sidebar-logo">				
				<div className="logo-header" data-background-color="blue">

					<a href="index.html" className="logo">
						<img src="assets/img/kaiadmin/logo_light.svg" alt="navbar brand" className="navbar-brand" height="20" />
					</a>
					<div className="nav-toggle">
						<button className="btn btn-toggle toggle-sidebar">
							<i className="gg-menu-right"></i>
						</button>
						<button className="btn btn-toggle sidenav-toggler">
							<i className="gg-menu-left"></i>
						</button>
					</div>
					<button className="topbar-toggler more">
						<i className="gg-more-vertical-alt"></i>
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
								<i className="fas fa-home"></i>
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
								<i className="fa fa-ellipsis-h"></i>
							</span>
							<h4 className="text-section">Components</h4>
						</li>
						<li className="nav-item">
							<a href="calendar.html">
								<i className="far fa-calendar-alt"></i>
								<p>Calendar</p>
								<span className="badge badge-info">1</span>
							</a>
						</li>
						<li className="nav-item">
							<a href="widgets.html">
								<i className="fas fa-desktop"></i>
								<p>Widgets</p>
								<span className="badge badge-success">4</span>
							</a>
						</li>
						<li className="nav-section">
							<span className="sidebar-mini-icon">
								<i className="fa fa-ellipsis-h"></i>
							</span>
							<h4 className="text-section">Snippets</h4>
						</li>
						<li className="nav-item">
							<a data-bs-toggle="collapse" href="#email-nav">
								<i className="far fa-envelope"></i>
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
								<i className="far fa-paper-plane"></i>
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
								<i className="fas fa-file-invoice-dollar"></i>
								<p>Invoices</p>
								<span className="badge badge-count">6</span>
							</a>
						</li>
						<li className="nav-item">
							<a href="404.html">
								<i className="fas fa-paint-roller"></i>
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