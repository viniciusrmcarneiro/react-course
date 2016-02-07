import React,
 { PropTypes, } from 'react';
import { Link } from 'react-router';
import {
	Navbar,
	Nav,
	NavItem,
	NavDropdown,
	MenuItem,
} from 'react-bootstrap';

class Main extends React.Component {

	static propTypes = {
		loginInfo: PropTypes.shape({
			loggedIn: PropTypes.bool.isRequired,
			email: PropTypes.string,
		}).isRequired,
		routeActions: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
		menu: PropTypes.array,
	};
	constructor(){
		super();
		this.state = {};
	}

	pushRoute(route, ev){
		if (ev) {
			ev.preventDefault();
		}

		this.setState({navBarExpanded: false,}, () => this.props.routeActions.push(route))
	}

	renderLoggedIn(){
		return ([
			<Nav key="custom">
				{this.props.menu && this.props.menu.map((item, index) =>
					<NavItem
						eventKey={3+index}
						key={3+index}
						onClick={() => this.pushRoute(item.route)}
					>{item.desc}</NavItem>
				)}
			</Nav>,

			<Nav key="auth" pullRight>
				<NavItem eventKey={1} onClick={() => this.pushRoute('/app/profile')}>{this.props.loginInfo.firstName || this.props.loginInfo.email}</NavItem>
				<NavItem eventKey={2} onClick={() => this.pushRoute('/app/logout')}>logout</NavItem>
			</Nav>,
		]);
	}

	renderNoLoggedIn(){
		return (
			<Nav pullRight>
				<NavItem eventKey={1} onClick={() => this.pushRoute('/sign-up')}>Sign up</NavItem>
				<NavItem eventKey={2} onClick={() => this.pushRoute('/login')}>Login</NavItem>
			</Nav>
		);
	}

	render() {
		return (
			<div>
				<Navbar
					onToggle={(navBarExpanded) => this.setState({navBarExpanded})}
					expanded={this.state.navBarExpanded}
				>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#"
								onClick={(ev)=> this.pushRoute('/', ev)}
							>React Course</a>
						</Navbar.Brand>
						<Navbar.Toggle/>
					</Navbar.Header>
					<Navbar.Collapse>
						{
							this.props.loginInfo.loggedIn == true
								? this.renderLoggedIn()
								: this.renderNoLoggedIn()
						}
					</Navbar.Collapse>
				</Navbar>

				<div className="container">
					{this.props.children || <div>Sou a pagina principal. TESTE</div>}
				</div>

			</div>
		)
	}

}

export default Main;
