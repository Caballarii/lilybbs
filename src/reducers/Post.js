import * as types from '../constants/ActionTypes';

const initialState = {
    loading:false,
    data:null
}

let postReducer=(state=initialState,action)=>{
    switch (action.type){
        case types.POST_LOADING:
            return {
               ...state,
               loading:true,
               data:null
            };
        case types.POST_LOADED:
            return {
                ...state,
                loading:false,
                data:action.data
            }

        case types.POST_MORE_LOADING:
            return {
                ...state,
                loading:true
            }
        case types.POST_MORE_LOADED:
            let pageIndex=action.pageIndex;
            if(pageIndex*30>=state.data.nodes.length){
                state.data.nodes=[...state.data.nodes,...action.data];
            }
            return {
                ...state,
                loading:false,
                data:state.data
            }
        default:
            return state;
    }
}

export default postReducer;