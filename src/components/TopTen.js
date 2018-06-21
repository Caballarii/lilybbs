import React,{Component} from 'react';
import {View,Text,ScrollView,TouchableOpacity} from 'react-native';
import {List,ListItem,Header} from 'react-native-elements';

import {connect} from 'react-redux';
import {loadTopTenAction} from '../actions/TopTen';

class TopTen extends Component{

    componentDidMount(){
        this.props.dispatch(loadTopTenAction());
    }

    render(){
        console.log(this.props.data);
        const navigate=this.props.navigation.navigate;
        return (
            <View style={{flex:1}}>
                <Header
                    centerComponent={{ text: '全站十大', style: { color: '#fff',fontSize:24 } }}
                    outerContainerStyles={{borderBottomWidth:0}}
                />
                    <ScrollView>
                    <List containerStyle={{marginTop: 0,paddingTop:0}}>
                    {
                        this.props.data.map((info,i)=>{
                            return (
                            <ListItem
                                key={info.title}
                                title={
                                    <TouchableOpacity onPress={() => navigate('Post',{url:info.url})}>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                            <View style={{flex:1,height:50,justifyContent:"center"}}>
                                                <Text style={{fontWeight:"bold",fontSize:20}}>{info.title}</Text>
                                            </View>
                                            <View style={{justifyContent:"center"}}>  
                                                <Text style={{fontSize:20,textAlign:"right"}}>人气：{info.count}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:"row",justifyContent:"space-between"}}> 
                                            <Text numberOfLines={2} style={{fontSize:16,textAlign:"left"}}>{info.author}</Text>  
                                            <Text style={{fontSize:16}}>版面：{info.board}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                                titleNumberOfLines={2}
                                hideChevron={true}
                                />);
                        })
                    }
                    </List>
                    </ScrollView>
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