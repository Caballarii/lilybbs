import React,{Component} from 'react';
import {View,Text,FlatList,TouchableOpacity,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

import {loadBoardAction,loadBoardMoreAction} from '../actions/Board';

class Board extends Component{

    componentDidMount(){
        let boardName=this.props.navigation.state.params.boardName;
        this.props.dispatch(loadBoardAction("bbstdoc?board="+boardName,boardName));
    }

    toPost=(item)=>{
        let url=item.item.url;
        item.item.isRead=true;
        const { navigate } = this.props.navigation;

        navigate('Post',{url:url});
    }

    toLoadMore=()=>{
        if(this.props.loading){
            return ;
        }
        let boardName=this.props.navigation.state.params.boardName;
        let lastIndex=this.props.data[this.props.data.length-1].no;
        this.props.dispatch(loadBoardMoreAction("bbstdoc?board="+boardName+"&start="+(lastIndex-22),lastIndex-22));
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
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}> 
                            <Text numberOfLines={2} style={{fontSize:14,textAlign:"left"}}>{item.item.author}</Text>  
                            <Text style={{fontSize:14}}>{item.item.time}</Text>  
                            <Text style={{fontSize:14,textAlign:"right"}}>人气：{item.item.popular}</Text>
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
                        this.props.dispatch(loadBoardAction("bbstdoc?board="+this.props.navigation.state.params.boardName,this.props.navigation.state.params.boardName));
                    }}
                    onEndReachedThreshold={0.1}
                    onEndReached={(info)=>{
                        this.toLoadMore();
                    }}
                    ListFooterComponent={()=>{
                        return <View style={{height:30}}><ActivityIndicator/></View>
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
        loading:store.boardStore.loading,
        data:store.boardStore.data
    };
}

export default connect(select)(Board);