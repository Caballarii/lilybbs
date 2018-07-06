import * as types from '../constants/ActionTypes';
import {FetchGet} from '../utils/FetchUtil';
import {parseHotSpot} from '../utils/HtmlParser';

export let loadHotSpotAction=()=>{
    return async dispatch=>{
        dispatch({
            type:types.HOTSPOT_LOADING
        });
        let result=await FetchGet('bbstopall');

        let data=parseHotSpot(result);
        let storage=global.storage;
        data=await Promise.all(data.map(async info=>{
            info.data=await Promise.all(info.data.map(async info1=>{
                let isRead=false;
                try{
                    await storage.load({
                        key:'post',
                        id:info1.url.replace('_','-')
                    });
                    isRead=true;
                }catch(e){
                    isRead=false;
                }
                info1.isRead=isRead;
                return info1;
            }));
            return info;
        }));
        dispatch({
            type:types.HOTSPOT_LOADED,
            data:data
        });
    }
}