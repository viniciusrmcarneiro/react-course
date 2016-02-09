import { combineReducers, } from 'redux';

import auth from './auth'
import dashboard from './dashboard'
import signup from './signup'

export const reducers = {
    login: auth,
    signup,
    dashboard,
}

const rootReducer = combineReducers(reducers)

export default rootReducer;
