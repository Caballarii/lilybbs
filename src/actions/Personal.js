import * as types from '../constants/ActionTypes';
import {loadDefaultUser,loadUser} from '../utils/Storage';
import {FetchGet} from '../utils/FetchUtil';

export let getDefaultUser=()=>{
    return async dispatch=>{
        dispatch({
            type:types.PERSONAL_DEFAULT_USER_LOADING
        });
        try{
            let defaultUser=await loadDefaultUser();
            dispatch({
                type:types.PERSONAL_DEFAULT_USER_LOADED,
                defaultUser:defaultUser
            });
        }catch(e){
        }
              
    }
}

export let getUserInfo=()=>{
    return async dispatch=>{
        dispatch({
            type:types.PERSONAL_USERINFO_LOADING
        });
        let defaultUser=await loadDefaultUser();
        let user=await loadUser(defaultUser);
        
        let result=await FetchGet(user.userKey+'/bbsinfo');
        console.log(result);
    }
}