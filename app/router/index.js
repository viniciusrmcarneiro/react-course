import React from 'react';

import {Router,} from 'react-router';

import { Provider, } from 'react-redux';

import createHistory from 'history/lib/createHashHistory';
import { syncHistory, routeReducer, } from 'react-router-redux';

import AppRoutes from 'app/router/routes';
import storeCreator from 'app/store';

const history = createHistory();
const reduxRouterMiddleware = syncHistory(history);

const store = storeCreator({
	customMiddleware: [reduxRouterMiddleware],
	customReducer: {
		routing: routeReducer,
	},
});

reduxRouterMiddleware.listenForReplays(store);

const AppRouter = (
	<Provider store={store}>
		<Router history={history}>
			{AppRoutes}
		</Router>
	</Provider>
);

export default AppRouter;
