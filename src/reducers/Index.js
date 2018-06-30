import {combineReducers} from 'redux';
import topTenReducer from './TopTen';
import postReducer from './Post';
import boardReducer from './Board';

const rootReducer = combineReducers({
    postStore:postReducer,
    topTenStore:topTenReducer,
    boardStore:boardReducer
});

export default rootReducer;