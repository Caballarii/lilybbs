import * as types from '../constants/ActionTypes';
import {loadDefaultUser} from '../utils/Storage';

export let getDefaultUser=()=>{
    return async dispatch=>{
        dispatch({
            type:types.PERSONAL_DEFAULT_USER_LOADING
        });
        let defaultUser=await loadDefaultUser();
        dispatch({
            type:types.PERSONAL_DEFAULT_USER_LOADED,
            defaultUser:defaultUser
        });       
    }
}