import React,{Component} from 'react';
import {View,TextInput,Alert} from 'react-native';

import {Button} from 'react-native-elements';
import {FetchGet,FetchPost} from '../utils/FetchUtil';

import {storeUser,loadUserList,storeDefaultUser,loadDefaultUser} from '../utils/Storage';

class Login extends Component{

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
            
            storeUser(this.state.id,this.state.pw,cookieStr,userKey);
            storeDefaultUser(this.state.id);
        }
    }

    toUserInfo=async ()=>{
        let users=await loadUserList();
        console.log(users);
        let defaultUser=await loadDefaultUser();
        console.log(defaultUser);
    }

    render(){
        return (
            <View >
                <TextInput
                    allowFontScaling={false}
                    style={{marginTop:20,paddingLeft:10,height:40,fontSize:20,backgroundColor:"white"}}
                    placeholder='用户名'
                    onChangeText={this.handleChange.bind(this,'id')}
                />
                <TextInput
                    allowFontScaling={false}
                    style={{marginTop:20,paddingLeft:10,height:40,fontSize:20,backgroundColor:"white"}}
                    placeholder='密码'
                    secureTextEntry={true}
                    onChangeText={this.handleChange.bind(this,'pw')}
                />
                <Button onPress={this.toLogin} title="登录" style={{marginTop:20}}></Button>
                <Button onPress={this.toUserInfo} title="个人信息" style={{marginTop:20}}></Button>
            </View>
        );
    }
}

export default Login;