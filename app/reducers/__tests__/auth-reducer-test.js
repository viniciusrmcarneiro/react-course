import deepFreeze from 'deep-freeze';
import expect from 'expect';

import reducer from 'app/reducers';

import {
    login,
    success as loginSuccess,
} from 'app/actions/auth-actions';
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_INVALID,
    AUTH_LOGOUT,
} from 'app/actions';

describe('AUTH REDUCER', function(){

    it('LOGIN REQUEST', function(){
        const state = reducer(undefined, {});
        const actionRequestLogin = {
            type: AUTH_LOGIN_REQUEST,
        };
        deepFreeze(state);

        const newState = deepFreeze(reducer(state, actionRequestLogin));

        expect(newState.login).toEqual({
            isBusy: true,
            error: undefined,
            exception: undefined,
            loggedIn: false,
        });
    });

    it('LOGIN REQUEST - BUSY', function(){
        const actionRequestLogin = {
            type: AUTH_LOGIN_REQUEST,
        };

        const state = deepFreeze(reducer({}, actionRequestLogin));

        deepFreeze(state);

        const newState = deepFreeze(reducer(state, actionRequestLogin));

        expect(state.login).toEqual({
            isBusy: true,
            error: undefined,
            exception: undefined,
            loggedIn: false,
        });
    });

    it('LOGIN SUCCESS', function(){
        const state = reducer(undefined, {});
        const actionLoginSuccess = {
            type: AUTH_LOGIN_SUCCESS,
            token: '1234',
            loggedIn: true,
            email: 'm@k.com',
        };

        deepFreeze(state);

        const newState = deepFreeze(reducer(state, actionLoginSuccess));

        expect(newState.login).toEqual({
            isBusy: false,
            error: undefined,
            exception: undefined,
            token: actionLoginSuccess.token,
            email: actionLoginSuccess.email,
            loggedIn: true,
        });
    });

    it('LOGIN INVALID', function(){
        const state = reducer(undefined, {});
        const actionLoginInvalid = {
            type: AUTH_LOGIN_INVALID,
            error: 'WRONG PASSWORD'
        };

        deepFreeze(state);

        const newState = deepFreeze(reducer(state, actionLoginInvalid));

        expect(newState.login).toEqual({
            isBusy: false,
            error: actionLoginInvalid.error,
            exception: undefined,
            loggedIn: false,
        });
    });

    it('SHOULD LOGOUT', function(){
        const state = reducer(undefined, {});
        const actionLogout = {
            type: AUTH_LOGOUT,
        };

        deepFreeze(state);

        const newState = deepFreeze(reducer(state, actionLogout));

        expect(newState.login).toEqual({
            loggedIn: false,
        });
    });

    it('WHEN BUSY SHOULD NOT LOGOUT', function(){
        const actionRequestLogin = {
            type: AUTH_LOGIN_REQUEST,
        };

        const state = deepFreeze(reducer({}, actionRequestLogin));

        deepFreeze(state);
        const actionLogout = {
            type: AUTH_LOGOUT,
        };
        const newState = deepFreeze(reducer(state, actionLogout));

        expect(state.login).toEqual({
            isBusy: true,
            error: undefined,
            exception: undefined,
            loggedIn: false,
        });
    });

});
