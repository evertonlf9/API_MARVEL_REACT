import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import characters from './characters';

const createRootReducer = history => combineReducers({
	router: connectRouter(history),
	characters
});

export default createRootReducer;
