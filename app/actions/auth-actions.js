import * as actionTypes from './index.js';
import request from 'app/util/request';
import { routeActions, } from 'redux-simple-router';
import { loadMenu } from './dashboard-actions';

export function logout(){
	// async action
	return function(dispatch, getState){
		if (getState().login.isBusy){
			return;
		}

		// dispatch authentication in progress message
		dispatch({
			type: actionTypes.AUTH_LOGOUT
		});

		dispatch(routeActions.replace('/'));
	}
}

export function login(p){
	// async action
	const {email, password,} = p || {};
	return function(dispatch){
		// dispatch message  and exit
		if (!email || !password){
			dispatch(invalid({error:'Email and password are required.',}))
			return;
		}

		// dispatch authentication in progress message
		dispatch({
			type: actionTypes.AUTH_LOGIN_REQUEST,
		});

		// server authentication
		request.post('auth/login', {email, password,})
			.then((response) => {
				if (response.token){
					dispatch(success({
						token: response.token,
						email,
					}));

					dispatch(loadMenu({
						menu:[
							{desc:'Item1', route:'/app/item-1',},
							{desc:'Item2', route:'/app/item-2',},
							{desc:'Item3', route:'/app/item-3',},
						],
					}));

					dispatch(routeActions.replace('/app'));
					return;
				}

				dispatch(invalid({
					error: 'Invalid credentials. try again.',
				}));

			})
			.catch((ex) => {
				dispatch(invalid({
					error: 'ops, something wrong. Try again.',
					exception: ex,
				}));
			})
	}
}

export function success(p){
	const {token,email} = p || {};
	return {
		type: actionTypes.AUTH_LOGIN_SUCCESS,
		token,
		email,
	}
}

export function invalid(p){
	const {error, exception} = p;
	return {
		type: actionTypes.AUTH_LOGIN_INVALID,
		error,
		exception,
	}
}
