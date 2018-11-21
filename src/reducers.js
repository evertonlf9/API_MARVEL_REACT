import { combineReducers } from 'redux';
import comicisReducer from './components/comics/comicisReducer';

const rootReducer = combineReducers({
    comicis: comicisReducer
});

export default rootReducer;