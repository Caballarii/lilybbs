import * as types from '../constants/ActionTypes';
import {FetchGet} from '../utils/FetchUtil';
import {parseTopTen} from '../utils/HtmlParser';

export let loadTopTenAction=()=>{
    return async dispatch=>{
        dispatch({
            type:types.TOPTEN_LOADING
        });
        let result=await FetchGet('bbstop10');

        let data=parseTopTen(result);
        let storage=global.storage;
        data=await Promise.all(data.map(async info=>{
            let isRead=false;
            try{
                await storage.load({
                    key:'post',
                    id:info.url.replace('_','-')
                });
                isRead=true;
            }catch(e){
                isRead=false;
            }
            info.isRead=isRead;
            return info;
        }));
        dispatch({
            type:types.TOPTEN_LOADED,
            data:data
        });
    }
}