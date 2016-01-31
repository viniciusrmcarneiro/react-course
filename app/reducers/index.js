import { combineReducers, } from 'redux';

import auth from './auth'
import dashboard from './dashboard'
export const reducers = {
	login: auth,
	dashboard,
}

const rootReducer = combineReducers(reducers)

export default rootReducer;
