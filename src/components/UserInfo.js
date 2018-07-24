import React,{Component} from 'react';
import {View,Text} from 'react-native';

import {connect} from 'react-redux';

import {getUserInfo} from '../actions/Personal';

class UserInfo extends Component{

    componentDidMount(){
        this.props.dispatch(getUserInfo());
    }

    render(){
        console.log(this.props.data);
        return (
            <View>
                <Text>
                    userInfo
                </Text>
            </View>
        );
    }
}

let select=(store)=>{
    return {
        loading:store.personalStore.loading,
        data:store.personalStore.data
    };
}

export default connect(select)(UserInfo);