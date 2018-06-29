import * as types from '../constants/ActionTypes';
import {FetchUtil} from '../utils/FetchUtil';
import {parsePost} from '../utils/HtmlParser';

export let loadPostAction=(url)=>{
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

export let loadMorePostAction=(url,pageIndex)=>{
    return async dispatch=>{
        dispatch({
            type:types.POST_MORE_LOADING
        });
        let result=await FetchUtil(url);
        let data=parsePost(result); 
        
        dispatch({
            type:types.POST_MORE_LOADED,
            pageIndex:pageIndex,
            data:data.nodes.slice(1)
        });        
    }
}