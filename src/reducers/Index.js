import {combineReducers} from 'redux';
import topTenReducer from './TopTen';
import postReducer from './Post';

const rootReducer = combineReducers({
    postStore:postReducer,
    topTenStore:topTenReducer
});

export default rootReducer;