import * as types from '../constants/ActionTypes';
import {FetchUtil} from '../utils/FetchUtil';
import {parseTopTen} from '../utils/HtmlParser';

export let loadTopTenAction=()=>{
    return async dispatch=>{
        dispatch({
            type:types.TOPTEN_LOADING
        });
        let result=await FetchUtil('bbstop10');
        dispatch({
            type:types.TOPTEN_LOADED,
            data:parseTopTen(result)
        });
    }
}

export let cleanTopicAction=()=>{
    return async dispatch=>{
        dispatch({
            type:types.POST_LOADING
        });
    }
}