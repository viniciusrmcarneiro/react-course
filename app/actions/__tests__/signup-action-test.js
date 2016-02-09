import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import deepFreeze from 'deep-freeze';
import expect from 'expect';

import {
    signup,
    invalid as signupInvalid,
    success as signupSuccess,
} from 'app/actions/signup-actions';

import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_INVALID,
} from 'app/actions';

import request from 'app/util/request';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
var sinon = require('sinon');
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

describe('SIGN-UP ACTION', function(){
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    })

    afterEach(()=>{
        sandbox.restore();
    })

    it('SIGN-UP ASYNC - SUCCESS', function(done){
        const stub = sandbox.stub(request,"put")
        const expectedActions = [
            {
                type: SIGNUP_REQUEST,
            },
            {
                type: SIGNUP_SUCCESS,
                email: 'test@test.com',
            },
        ];

        const promiseResult = stub.returnsPromise();
        promiseResult.resolves(expectedActions[1]);

        const store = mockStore({}, expectedActions, done);
        store.dispatch(signup({
            email: expectedActions[1].email,
            password: '123',
        }));
    });

    it('SIGN-UP ASYNC - INVALID REQUEST', function(done){
        const expectedActions = [
            {
                type: SIGNUP_INVALID,
                error: 'Email and password are required.',
                exception: undefined,
            },
        ];

        const store = mockStore({}, expectedActions, done);
        store.dispatch(signup());        
    });

    it('SIGN-UP ASYNC - TAKEN EMAIL', function(done){
        const stub = sandbox.stub(request,"put")
        const expectedActions = [
            {
                type: SIGNUP_REQUEST,
            },
            {
                type: SIGNUP_INVALID,
                error: 'ops, something wrong. Try again.',
                exception: {
                    message: 'email is already taken.',
                },
            },
        ];

        const promiseResult = stub.returnsPromise();
        promiseResult.rejects({message: expectedActions[1].exception.message,});

        const store = mockStore({}, expectedActions, done);
        store.dispatch(signup({
            email: 'test@test.com',
            password: '123',
        }));
    });

});
