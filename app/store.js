import { createStore, applyMiddleware, combineReducers, } from 'redux';

import createLogger from 'redux-logger';
import { devTools, } from 'redux-devtools';

import thunk from 'redux-thunk';

import { reducers as AppReducers, } from 'app/reducers';

export const middleware = [thunk];

export default function configureStore({initialState, customMiddleware = [], customReducer = {} }) {
	const createStoreWithMiddleware = applyMiddleware(...customMiddleware ,...middleware)(createStore);
	const store = createStoreWithMiddleware(
		combineReducers({...AppReducers, ...customReducer}),
		initialState
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('app/reducers', () => {
			const nextAppReducers = require('app/reducers').reducers;
			store.replaceReducer(combineReducers({...nextAppReducers, ...customReducer}));
		});
	}

	return store;
}