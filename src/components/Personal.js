import React,{Component} from 'react';
import {View,TextInput,Alert} from 'react-native';

import {Button} from 'react-native-elements';
import CookieManager from 'react-native-cookies';

import {FetchGet,FetchPost} from '../utils/FetchUtil';

class Personal extends Component{

    state={
        id:'',
        pw:''
    }

    handleChange=(name,value)=>{
        this.state[name]=value;
        this.setState({
        });
    }

    toLogin=async ()=>{
        let userKey="vd" + parseInt(Math.random() * 100000);
        let action=userKey + "/bbslogin?type=2";        
        let result=await FetchPost(action,this.state);
        if(result.indexOf('密码错误!')!=-1){
            Alert.alert('用户名或密码错误');
        }else if(result.indexOf('IP密码')!=-1){
            Alert.alert('操作过于频繁，请稍后再试');
        }else{
            Alert.alert('登录成功');
            let cookieStr=result.match(/Net\.BBS\.setCookie\(\'([^\)]+)\'\)/)[1];            
        }
    }

    toUserInfo=async ()=>{
        let aaa=await FetchGet("vd86558"+'/bbsinfo');
        console.log(aaa);
    }

    render(){
        return (
            <View>
                                
            </View>
        );
    }
}

export default Personal;