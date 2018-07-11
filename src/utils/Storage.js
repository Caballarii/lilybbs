import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

const POST_CACHE_COUNT=100;

export let initStorage=()=>{
    let storage = new Storage({
        size:1000,
        storageBackend: AsyncStorage,
        defaultExpires:null,
        enableCache:true
    });
      
    global.storage=storage;
}

export let storePost=(url,data)=>{
    let storage=global.storage;

    let id=url.replace('_','-');
    storage.remove({
        key:'post',
        id:id
    });

    storage.save({
        key:'post',
        id:id,
        data:data
    });

    storage.getIdsForKey('post').then(ids => {
        if(ids.length>POST_CACHE_COUNT){
            let removeId=ids[0];
            storage.remove({
                key:'post',
                id:removeId
            })
        }
    });
}

export let storeUser=(id,pw,cookieStr,userKey)=>{
    storage.save({
        key:'user',
        id:id,
        data:{
            pw:pw,
            cookieStr:cookieStr,
            userKey:userKey
        }
    })
}

export let loadUserList=async ()=>{
    let users=await storage.getIdsForKey('user');
    return users;
}

export let storeDefaultUser=(id)=>{
    storage.save({
        key:'defaultUser',
        data:id
    });
}

export let loadDefaultUser=async ()=>{
    let defaultUser=await storage.load({key:'defaultUser'});
    return defaultUser;
}