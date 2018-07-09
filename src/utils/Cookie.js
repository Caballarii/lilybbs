import CookieManager from 'react-native-cookies';

export let storeCookie=async (cookieStr,userKey)=>{
    await CookieManager.set({
        name: '_U_NUM',
        value: (parseInt(cookieStr, 10) + 2)+"",
        domain: 'bbs.nju.edu.cn',
        origin: 'bbs.nju.edu.cn',
        path: '/'+userKey,
        version: '1',
        expiration:'2019-05-30T12:30:00.00-05:00'
    });
    await CookieManager.set({
        name: '_U_UID',
        value: cookieStr.substring(((parseInt(cookieStr, 10) + 2).toString(10)).length + 1, cookieStr.indexOf("+")),
        domain: 'bbs.nju.edu.cn',
        origin: 'bbs.nju.edu.cn',
        path: '/'+userKey,
        version: '1',
        expiration:'2019-05-30T12:30:00.00-05:00'
    });
    await CookieManager.set({
        name: '_U_KEY',
        value: (parseInt(cookieStr.substring(cookieStr.indexOf("+") + 1), 10) - 2)+"",
        domain: 'bbs.nju.edu.cn',
        origin: 'bbs.nju.edu.cn',
        path: '/'+userKey,
        version: '1',
        expiration:'2019-05-30T12:30:00.00-05:00'
    });
}

export let clearCookie=async ()=>{
    await CookieManager.clearAll();
}

export let getAllCookie=async ()=>{
    let result=await CookieManager.getAll();
    return result;
}

