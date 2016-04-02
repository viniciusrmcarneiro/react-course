import * as actionTypes from './index.js';
import request from 'app/util/request';
import { routeActions, } from 'react-router-redux';

export function gotoLogin(p){
    return dispatch => {
        dispatch({
            type: actionTypes.SIGNUP_SUCCESS_CONFIRMED,
        });

        dispatch(routeActions.replace('/login'));
    };
}

export function signup(p){
    // async action
    const {email, password,} = p || {};
    return function(dispatch){
        // dispatch message  and exit
        if (!email || !password){
            dispatch(invalid({error: 'Email and password are required.',}))
            return;
        }

        // dispatch signup in progress message
        dispatch({
            type: actionTypes.SIGNUP_REQUEST,
        });


        // server signup
        request.put('user', {email, password,})
            .then((response) => {
                dispatch(success({email,}));
            })
            .catch((ex) => {
                dispatch(invalid({
                    error: 'ops, something wrong. Try again.',
                    exception: ex,
                }));
            })
    }
}

export function success({email}){
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        email,
    }
}

export function invalid(p){
    const {error, exception} = p;
    return {
        type: actionTypes.SIGNUP_INVALID,
        error,
        exception,
    }
}
