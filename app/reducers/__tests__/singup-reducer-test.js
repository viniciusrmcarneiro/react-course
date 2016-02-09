import deepFreeze from 'deep-freeze';
import expect from 'expect';

import reducer from 'app/reducers';

import {
    signup,
    success as signupSuccess,
} from 'app/actions/signup-actions';
import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_INVALID,
} from 'app/actions';

describe('SIGNUP REDUCER', function(){

    it('SIGNUP REQUEST', function(){
        const state = reducer(undefined, {});
        const actionRequest = {
            type: SIGNUP_REQUEST,
        };
        deepFreeze(state);

        const newState = deepFreeze(reducer(state, actionRequest));

        expect(newState.signup).toEqual({
            isBusy: true,
            error: undefined,
            exception: undefined,
        });
    });

    it('SIGNUP REQUEST - BUSY', function(){
        const actionRequest = {
            type: SIGNUP_REQUEST,
        };

        const state = deepFreeze(reducer({}, actionRequest));

        deepFreeze(state);

        const newState = deepFreeze(reducer(state, actionRequest));

        expect(state.signup).toEqual({
            isBusy: true,
            error: undefined,
            exception: undefined,
        });
    });

    it('SIGNUP SUCCESS', function(){
        const state = reducer(undefined, {});
        const actionSignupSuccess = {
            type: SIGNUP_SUCCESS,
            email: 'test@test.com',
        };

        deepFreeze(state);

        const newState = deepFreeze(reducer(state, actionSignupSuccess));

        expect(newState.signup).toEqual({
            isBusy: false,
            error: undefined,
            exception: undefined,
            email: actionSignupSuccess.email,
        });
    });

    it('SIGNUP INVALID', function(){
        const state = reducer(undefined, {});
        const actionInvalid = {
            type: SIGNUP_INVALID,
            error: 'email alredy is taken.'
        };

        deepFreeze(state);

        const newState = deepFreeze(reducer(state, actionInvalid));

        expect(newState.signup).toEqual({
            isBusy: false,
            error: actionInvalid.error,
            exception: undefined,
        });
    });


});
