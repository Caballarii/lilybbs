import * as types from '../constants/ActionTypes';

const initialState = {
    loading:false,
    data:[]
}

let topTenReducer=(state=initialState,action)=>{
    switch (action.type){
        case types.TOPTEN_LOADING:
            return {
               ...state,
               loading:true
            };
        case types.TOPTEN_LOADED:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default:
            return state;
    }
}

export default topTenReducer;