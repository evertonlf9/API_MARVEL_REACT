import { combineReducers } from 'redux';
import comicsReducer from './components/comics/comicsReducer';
import characterReducer from './components/characters/characterReducer';

const rootReducer = combineReducers({
    comics: comicsReducer,
    character: characterReducer
});

export default rootReducer;