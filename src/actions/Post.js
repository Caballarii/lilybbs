import * as types from '../constants/ActionTypes';
import {FetchUtil} from '../utils/FetchUtil';
import {parsePost} from '../utils/HtmlParser';

export let loadPostAction=(url)=>{
    //url='vd98636/bbscon?board=test&file=M.1505203250.A&num=1006';
    return async dispatch=>{
        dispatch({
            type:types.POST_LOADING
        });
        let result=await FetchUtil(url);
        dispatch({
            type:types.POST_LOADED,
            data:parsePost(result)
        });
    }
}