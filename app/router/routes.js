import React from 'react';
import { Route, IndexRoute, } from 'react-router'

import { bindActionCreators, } from 'redux'
import { connect, Provider, } from 'react-redux';

import * as authActions from 'app/actions/auth-actions';

import Main from 'app/components/main';
import Dashboard from 'app/components/dashboard';
import Profile from 'app/components/profile';

// import Home from 'app/components/home';
// import HomeIndex from 'app/components/home/default';
//
import Login from 'app/components/login';
import Logout from 'app/components/logout';
import Signup from 'app/components/sign-up';

import NotFound from 'app/components/not-found';

import { routeActions, } from 'react-router-redux';

const AuthConnector = connect(
	(state, props) => ({
		loginInfo: state.login,
	}),
	(dispatch) => ({
		routeActions: bindActionCreators(routeActions, dispatch),
		authActions: bindActionCreators(authActions, dispatch),
	})
);

const DashboardConnector = connect(
	(state, props) => ({
		loginInfo: state.login,
	}),
	(dispatch) => ({
		routeActions: bindActionCreators(routeActions, dispatch)
	})
);

const MainConnector = connect(
	(state, props) => ({
		loginInfo: state.login,
		menu: state.dashboard.menu,
	}),
	(dispatch) => ({
		routeActions: bindActionCreators(routeActions, dispatch)
	})
);

const routes = (
	<Route path="/" component={MainConnector(Main)}>
	<Route path="login" component={AuthConnector(Login)}/>
		{/*
		<IndexRoute component={HomeIndex} />
		*/}
		<Route path="sign-up" component={Signup} />

		<Route path="app" component={DashboardConnector(Dashboard)}>
			<Route path="logout" component={AuthConnector(Logout)}/>
			<Route path="item-1" component={(props, context) => <div>{`I'm item 1`}</div>} />
			<Route path="profile" component={Profile} />
		</Route>

		<Route path="*" component={NotFound}/>
	</Route>
);
// const routes = {
// 	component: App
// };

export default routes;
