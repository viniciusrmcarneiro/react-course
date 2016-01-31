import * as actionTypes from './index.js';

export function loadMenu({menu}){
	return {
		type: actionTypes.DASHBOARD_LOAD_MENU,
		menu,
	}
}
