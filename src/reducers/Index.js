import {combineReducers} from 'redux';
import topTenReducer from './TopTen';
import postReducer from './Post';
import boardReducer from './Board';
import hotSpotReducer from './HotSpot';

const rootReducer = combineReducers({
    postStore:postReducer,
    topTenStore:topTenReducer,
    boardStore:boardReducer,
    hotSpotStore:hotSpotReducer
});

export default rootReducer;