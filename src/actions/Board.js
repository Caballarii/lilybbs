import * as types from '../constants/ActionTypes';
import {FetchGet} from '../utils/FetchUtil';
import {parseBoard} from '../utils/HtmlParser';

export let loadBoardAction=(url,boardName)=>{
    return async dispatch=>{
        dispatch({
            type:types.BOARD_LOADING,
            boardName:boardName
        });
        let result=await FetchGet(url);

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
            data:data,
            boardName:boardName
        });
    }
}

export let loadBoardMoreAction=(url,startIndex)=>{
    return async dispatch=>{
        dispatch({
            type:types.BOARD_MORE_LOADING
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
            type:types.BOARD_MORE_LOADED,
            data:data,
            startIndex:startIndex
        });
    }
}