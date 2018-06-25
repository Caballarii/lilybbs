import * as types from '../constants/ActionTypes';
import {FetchUtil} from '../utils/FetchUtil';
import {parsePost} from '../utils/HtmlParser';

export let loadPostAction=(url)=>{
    //url='vd149/bbstcon?board=Pictures&file=M.1529647763.A';
    return async dispatch=>{
        dispatch({
            type:types.POST_LOADING
        });
        let result=await FetchUtil(url);

        let data=parsePost(result);
        let storage=global.storage;

        storage.save({
            key:'post',
            id:url.replace('_','-'),
            data:data
        })

        dispatch({
            type:types.POST_LOADED,
            data:data
        });
    }
}