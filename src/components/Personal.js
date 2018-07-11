import React,{Component} from 'react';
import {View,TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';

import CommonText from './common/CommonText';

import {connect} from 'react-redux';
import {getDefaultUser} from '../actions/Personal';

import {getAllCookie} from '../utils/Cookie';

class Personal extends Component{

    componentDidMount=async ()=>{
        this.props.dispatch(getDefaultUser());
    }

    toLogin=()=>{
        const { navigate } = this.props.navigation;
        navigate('Login');
    }

    render(){        
        return (
            <View>
                <View style={{height:50,backgroundColor:"white",paddingLeft:10,paddingRight:10,marginTop:40,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <CommonText style={{fontSize:20}}>默认账号：{this.props.defaultUser}</CommonText>
                    <TouchableOpacity onPress={this.toLogin}>
                        <CommonText style={{color:"red"}}>切换账号</CommonText>
                    </TouchableOpacity>
                </View>
                <CommonText></CommonText>             
            </View>
        );
    }
}

let select=(store)=>{
    return {
        loading:store.personalStore.loading,
        defaultUser:store.personalStore.defaultUser
    };
}

export default connect(select)(Personal);