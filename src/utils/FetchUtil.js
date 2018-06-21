let domain = 'http://bbs.nju.edu.cn/';
import axios from 'axios';

export let FetchUtil = async(url, method = 'GET', param = '{}') => {
    let option = {};

    if (method === 'GET') {
        option = Object.assign({}, {
            method: "GET",
            mode: "cors",
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
                "content-type": "text/html; charset=gb2312"
            }
        })
    }

    else{
        option = {
            method: method,
            headers: {
                "Content-type": "application/json"
            },
            body: param
        };
    }

    try {
        let res = await axios.get(domain + url);
        let data=res.data;
        return data;
    } catch (error) {
        console.error(error);
    }
    return;
}