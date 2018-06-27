import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';

class Browse extends Component{    

    toBoardList=()=>{
        const { navigate } = this.props.navigation;

        navigate('BoardList');
    }

    render(){
        return (
            <View style={{flex:1}}>
                <TouchableOpacity onPress={this.toBoardList}>                
                    <View style={{justifyContent:"center",alignItems:"center",marginTop:40,height:50,backgroundColor:"white"}}><Text style={{fontSize:20}}>版面列表</Text></View>
                </TouchableOpacity>
                <View style={{justifyContent:"center",alignItems:"center",marginTop:40,height:50,backgroundColor:"white"}}><Text style={{fontSize:20}}>各区热点</Text></View>

                <View style={{justifyContent:"center",alignItems:"center",marginTop:40,height:50,backgroundColor:"white"}}><Text style={{fontSize:20}}>文章查询</Text></View>

                <View style={{justifyContent:"center",alignItems:"center",marginTop:40,height:50,backgroundColor:"white"}}><Text style={{fontSize:20}}>我的收藏</Text></View>
            </View>
        );
    }
}

export default Browse;