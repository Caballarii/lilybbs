import * as types from '../constants/ActionTypes';

const initialState = {
    loading:false,
    defaultUser:''
}

let personalReducer=(state=initialState,action)=>{
    switch (action.type){
        case types.PERSONAL_DEFAULT_USER_LOADING:
            return {
                ...state,
                loading:true
            };
        case types.PERSONAL_DEFAULT_USER_LOADED:
            return {
                ...state,
                loading:false,
                defaultUser:action.defaultUser
            }
        default:
            return state;
    }
    
}

export default personalReducer;