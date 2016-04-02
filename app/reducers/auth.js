import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_INVALID,
    AUTH_LOGIN_ERROR,

    AUTH_LOGOUT,

    SIGNUP_SUCCESS,
} from 'app/actions';
const initialState = {
    loggedIn: false,
};

export default function AuthReducers(state = initialState, action) {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                defaultEmail: action.email,
            };

        case AUTH_LOGOUT:
            if (state.isBusy){
                return state;
            }
            return Object.assign({}, initialState);

        case AUTH_LOGIN_REQUEST:
            if (state.isBusy){
                return state;
            }
            return Object.assign({}, state, {
                isBusy: true,
                error: undefined,
                exception: undefined,
            });

        case AUTH_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isBusy: false,
                loggedIn: true,
                error: undefined,
                exception: undefined,
                token: action.token,
                email: action.email,
            })
        case AUTH_LOGIN_INVALID:
            return Object.assign({}, state, {
                isBusy: false,
                error: action.error,
                exception: action.exception,
            })
        case AUTH_LOGIN_ERROR:
        default:
            return state
    }
}
