import * as types from '../constants/ActionTypes';

const initialState = {
    loading:false,
    data:[]
}

let boardReducer=(state=initialState,action)=>{
    switch (action.type){
        case types.BOARD_LOADING:
            return {
               ...state,
               loading:true
            };
        case types.BOARD_LOADED:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default:
            return state;
    }
}

export default boardReducer;