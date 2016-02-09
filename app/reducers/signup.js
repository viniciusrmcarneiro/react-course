import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_INVALID,
} from 'app/actions';
const initialState = {
};

export default function SignupReducers(state = initialState, action) {
    switch (action.type) {

        case SIGNUP_REQUEST:
            if (state.isBusy){
                return state;
            }
            return Object.assign({}, state, {
                isBusy: true,
                error: undefined,
                exception: undefined,
            });

        case SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                isBusy: false,
                error: undefined,
                exception: undefined,
                email: action.email,
            })

        case SIGNUP_INVALID:
            return Object.assign({}, state, {
                isBusy: false,
                error: action.error,
                exception: action.exception,
            })

        default:
            return state
    }
}
