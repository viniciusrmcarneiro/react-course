import React,
 { PropTypes, } from 'react';

class Dashboard extends React.Component {
	componentWillMount(){
		if (!this.props.loginInfo || !this.props.loginInfo.token){
			this.props.routeActions.replace(`/login`);
		}
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

export default Dashboard;
