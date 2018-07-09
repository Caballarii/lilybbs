let domain = 'http://bbs.nju.edu.cn/';
import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials=true;

export let FetchGet = async(url) => {
    try {
        let res = await axios.get(domain + url,{
            withCredentials:true
        });
        let data=res.data;
        return data;
    } catch (error) {
        console.error(error);
    }
    return;
}

export let FetchPost = async(url,formData)=>{
    try {
        let res = await axios.post(domain+url,qs.stringify(formData));
        let data=res.data;
        return data;
    } catch (error) {
        console.error(error);
    }
    return;
}