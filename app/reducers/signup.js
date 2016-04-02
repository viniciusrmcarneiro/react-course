import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_INVALID,
    SIGNUP_SUCCESS_CONFIRMED,
} from 'app/actions';
const initialState = {
};

export default function SignupReducers(state = initialState, action) {
    switch (action.type) {
        case SIGNUP_SUCCESS_CONFIRMED:
            return initialState;

        case SIGNUP_REQUEST:
            if (state.isBusy){
                return state;
            }
            return Object.assign({}, state, {
                isBusy: true,
                error: undefined,
                exception: undefined,
                success: undefined,
            });

        case SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                isBusy: false,
                error: undefined,
                exception: undefined,
                email: action.email,
                success: true,
            })

        case SIGNUP_INVALID:
            return Object.assign({}, state, {
                isBusy: false,
                error: action.error,
                exception: action.exception,
                success: undefined,
            })

        default:
            return state
    }
}
