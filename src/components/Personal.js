import React,{Component} from 'react';
import {View,TextInput,Alert} from 'react-native';

import {Button} from 'react-native-elements';

import {FetchPost} from '../utils/FetchUtil';

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
        let action="vd" + parseInt(Math.random() * 100000) + "/bbslogin?type=2";        
        let result=await FetchPost(action,this.state);
        if(result.indexOf('密码错误!')!=-1){
            Alert.alert('用户名或密码错误');
        }else if(result.indexOf('IP密码')!=-1){
            Alert.alert('操作过于频繁，请稍后再试');
        }else{
            Alert.alert('登录成功');

        }
    }

    render(){
        return (
            <View>
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
                </View>                
            </View>
        );
    }
}

export default Personal;