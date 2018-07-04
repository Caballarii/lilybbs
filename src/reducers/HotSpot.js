import * as types from '../constants/ActionTypes';

const initialState = {
    loading:false,
    data:[]
}

let hotSpotReducer=(state=initialState,action)=>{
    switch (action.type){
        case types.HOTSPOT_LOADING:
            return {
               ...state,
               loading:true
            };
        case types.HOTSPOT_LOADED:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default:
            return state;
    }
}

export default hotSpotReducer;