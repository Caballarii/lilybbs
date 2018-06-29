import React,{Component} from 'react';
import {View,Text,ScrollView,TouchableOpacity,FlatList} from 'react-native';

import {connect} from 'react-redux';
import {loadTopTenAction} from '../actions/TopTen';

class TopTen extends Component{

    componentDidMount(){
        this.props.dispatch(loadTopTenAction());
    }

    toPost=(item)=>{
        let url=item.item.url;
        item.item.isRead=true;
        const { navigate } = this.props.navigation;

        navigate('Post',{url:url});
    }

    renderRow=(item)=>{
        const { navigate } = this.props.navigation;
        return (
            <View style={{flexDirection:"row"}}>
                <View style={{width:5,paddingTop:5,paddingBottom:5}}>
                    <View style={{backgroundColor:(item.item.isRead?"transparent":"blue"),flex:1}}>
                    </View>    
                </View>
                <View style={{paddingLeft:10,paddingRight:10,paddingBottom:10,flex:1}}>
                    <TouchableOpacity onPress={this.toPost.bind(this,item)}>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <View style={{flex:1,height:50,justifyContent:"center"}}>
                                <Text style={{fontWeight:"bold",fontSize:16}}>{item.item.title}</Text>
                            </View>
                            <View style={{width:70,justifyContent:"center"}}>  
                                <Text style={{fontSize:14,textAlign:"right"}}>人气：{item.item.count}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}> 
                            <Text numberOfLines={2} style={{fontSize:14,textAlign:"left"}}>{item.item.author}</Text>  
                            <Text style={{fontSize:14}}>版面：{item.item.board}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>           
        );
    }

    render(){
        const {navigate}=this.props.navigation;
        return (
            <View style={{flex:1}}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={(item, index) => index+""}
                    refreshing={this.props.loading}
                    onRefresh={(info)=>{
                        this.props.dispatch(loadTopTenAction());
                    }}
                    renderItem={this.renderRow}
                    ItemSeparatorComponent={()=><View style={{height:1,backgroundColor:'#e5e5e5'}}/>}
                />
            </View>
        );
    }
}

let select=(store)=>{
    return {
        loading:store.topTenStore.loading,
        data:store.topTenStore.data
    }
}

export default connect(select)(TopTen);