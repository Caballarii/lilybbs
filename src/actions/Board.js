import * as types from '../constants/ActionTypes';
import {FetchUtil} from '../utils/FetchUtil';
import {parseBoard} from '../utils/HtmlParser';

export let loadBoardAction=(url)=>{
    return async dispatch=>{
        dispatch({
            type:types.BOARD_LOADING
        });
        let result=await FetchUtil(url);

        let data=parseBoard(result);
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
            type:types.BOARD_LOADED,
            data:data
        });
    }
}