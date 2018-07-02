import * as types from '../constants/ActionTypes';

const initialState = {
    loading:false,
    data:[],
    boardName:''
}

let boardReducer=(state=initialState,action)=>{
    switch (action.type){
        case types.BOARD_LOADING:
            if(state.boardName!=action.boardName){
                state.data=[];
            }
            return {
               ...state,
               loading:true,
               boardName:action.boardName
            };
        case types.BOARD_LOADED:
            if(state.data.length==0){
                state.data=action.data;
            }
            else{
                let nodes=action.data;
                let firstIndex=state.data[0].no;
                nodes.forEach(element=>{
                    if(element.no>firstIndex){
                        state.data.push(element);
                    }
                });
            }
            return {
                ...state,
                loading:false,
                data:state.data
            };
        case types.BOARD_MORE_LOADING:
            return {
                ...state,
                loading:true
            };
        case types.BOARD_MORE_LOADED:
            let nodes=action.data;

            let lastIndex=state.data[state.data.length-1].no;
            nodes.forEach(element=>{
                if(element.no<lastIndex){
                    state.data.push(element);
                }
            });
            return {
                ...state,
                loading:false,
                data:state.data
            }
        default:
            return state;
    }
}

export default boardReducer;