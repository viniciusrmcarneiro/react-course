import {
	DASHBOARD_LOAD_MENU,
} from 'app/actions';
const initialState = {
	menu: [],
};

export default function DashboardReducers(state = initialState, action) {
	switch (action.type) {
		case DASHBOARD_LOAD_MENU:
			return Object.assign({}, state, {
				menu: action.menu,
			});

		default:
			return state
	}
}
