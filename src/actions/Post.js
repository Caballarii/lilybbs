import * as types from '../constants/ActionTypes';
import {FetchUtil} from '../utils/FetchUtil';
import {parsePost} from '../utils/HtmlParser';

export let loadPostAction=(url)=>{
    //url='vd149/bbstcon?board=Pictures&file=M.1529647763.A';
    url='bbstcon?board=Pictures&file=M.1529912301.A';
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