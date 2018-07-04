import * as types from '../constants/ActionTypes';
import {FetchUtil} from '../utils/FetchUtil';
import {parseHotSpot} from '../utils/HtmlParser';

export let loadHotSpotAction=()=>{
    return async dispatch=>{
        dispatch({
            type:types.HOTSPOT_LOADING
        });
        let result=await FetchUtil('bbstopall');

        let data=parseHotSpot(result);
        
        dispatch({
            type:types.HOTSPOT_LOADED,
            data:data
        });
    }
}