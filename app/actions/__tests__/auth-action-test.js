import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import deepFreeze from 'deep-freeze';
import expect from 'expect';

import {
    login,
    logout,
    success as loginSuccess,
} from 'app/actions/auth-actions';
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_INVALID,
    DASHBOARD_LOAD_MENU,
    AUTH_LOGOUT,
} from 'app/actions';

import request from 'app/util/request';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
var sinon = require('sinon');
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

describe('AUTH ACTION', function(){
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    })

    afterEach(()=>{
        sandbox.restore();
    })

    it('LOGIN REQUEST ASYNC - SUCCESS', function(done){
        const stub = sandbox.stub(request,"post")
        const expectedActions = [
            {
                type: AUTH_LOGIN_REQUEST,
            },
            {
                type: AUTH_LOGIN_SUCCESS,
                token: '123',
                email: 'm@k.com',
            },
            {
                type: DASHBOARD_LOAD_MENU,
                menu: [
                    { desc: 'Item1', route: '/app/item-1' },
                    { desc: 'Item2', route: '/app/item-2' },
                    { desc: 'Item3', route: '/app/item-3' },
                ],
            },
            { payload: { args: ['/app'], method: 'replace' }, type: '@@router/TRANSITION' },
        ];

        const promiseResult = stub.returnsPromise();
        promiseResult.resolves(expectedActions[1]);

        const store = mockStore({}, expectedActions, done);
        store.dispatch(login({
            email:'m@k.com',
            password:'123',
        }));
    });

    it('LOGOUT ASYNC - WHEN IT IS BUSY ', function(){
        var dispatchSpy = sinon.spy();
        expect(undefined).toEqual(logout()(dispatchSpy,() => ({ login: { isBusy: true,}})));
        expect(0).toEqual(dispatchSpy.callCount);
    });

    it('LOGOUT ASYNC', function(done){
        const expectedActions = [
            {
                type: AUTH_LOGOUT,
            },
            { payload: { args: ['/'], method: 'replace' }, type: '@@router/TRANSITION' },
        ];

        const store = mockStore({
            login: {},
        },

        expectedActions, done);

        store.dispatch(logout());
    });

    it('LOGIN REQUEST ASYNC - EMPTY', function(done){
        const expectedActions = [
            {
                type: AUTH_LOGIN_INVALID,
                error: 'Email and password are required.',
                exception: undefined,
            },
        ];

        const store = mockStore({}, expectedActions, done);
        store.dispatch(login());
    });

    it('LOGIN REQUEST ASYNC - INVALID', function(done){
        const stub = sandbox.stub(request,"post")
        const expectedActions = [
            {
                type: AUTH_LOGIN_REQUEST,
            },
            {
                type: AUTH_LOGIN_INVALID,
                error: 'Invalid credentials. try again.',
                exception: undefined,
            },
        ];

        const promiseResult = stub.returnsPromise();
        promiseResult.resolves({});

        const store = mockStore({}, expectedActions, done);
        store.dispatch(login({
            email:'m@k.com',
            password:'123',
        }));
    });

    it('LOGIN REQUEST ASYNC - SERVER ERROR', function(done){

        const stub = sandbox.stub(request,"post")
        const expectedActions = [
            {
                type: AUTH_LOGIN_REQUEST,
            },
            {
                type: AUTH_LOGIN_INVALID,
                error: 'ops, something wrong. Try again.',
                exception: {message:'OPS',},

            },
        ];

        const promiseResult = stub.returnsPromise();
        promiseResult.rejects({message:'OPS'});

        const store = mockStore({}, expectedActions, done);
        store.dispatch(login({
            email:'m@k.com',
            password:'123',
        }));
    });
});
