import * as types from '../constants/ActionTypes';

const initialState = {
    loading:false,
    data:[]
}

let postReducer=(state=initialState,action)=>{
    switch (action.type){
        case types.POST_LOADING:
            return {
               ...state,
               loading:true
            };
        case types.POST_LOADED:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default:
            return state;
    }
}

export default postReducer;