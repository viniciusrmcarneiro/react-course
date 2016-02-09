import {
    DASHBOARD_LOAD_MENU,
    AUTH_LOGOUT,
} from 'app/actions';
const initialState = {
    menu: [],
};

export default function DashboardReducers(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGOUT:
            return Object.assign({}, initialState);
        case DASHBOARD_LOAD_MENU:
            return Object.assign({}, state, {
                menu: action.menu,
            });

        default:
            return state
    }
}
