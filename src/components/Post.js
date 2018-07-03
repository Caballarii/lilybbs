import React,{Component} from 'react';
import {View,Text,FlatList,Image,TouchableOpacity,ScrollView,Dimensions} from 'react-native';
import {Divider} from 'react-native-elements';
import FixedImage from './common/FixedImage';

import {loadPostAction,loadMorePostAction} from '../actions/Post';
import {connect} from 'react-redux';

import emoji from '../utils/Emoji';

let tabWidth = Dimensions.get('window').width;

class Post extends Component{

    componentDidMount(){        
        this.props.dispatch(loadPostAction(this.props.navigation.state.params.url));
    }

    toLoadMorePage=(pageIndex)=>{
        this.props.dispatch(loadMorePostAction(this.props.navigation.state.params.url+"&start="+pageIndex*30,pageIndex))
    }

    onScrollEndDrag=(event)=>{
        let pageIndex=event.nativeEvent.targetContentOffset.x/tabWidth;
        if(pageIndex*30+1>=this.props.data.nodes.length){
            this.toLoadMorePage(pageIndex);
        }
    }

    renderRow=(pageIndex,item)=>{
        const { navigate } = this.props.navigation;
        return (
            <View style={{marginTop:10,marginBottom:10}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:10}}>
                    <Text style={{fontWeight:"bold"}}>{item.item.author}</Text>
                    <Text style={{fontWeight:"bold"}}>{item.index+pageIndex*30+(pageIndex!=0)}</Text>
                </View>
                <View style={{marginBottom:16}}>
                    <Text>{item.item.date}</Text>
                </View>
                <View>
                    {item.item.text.map((info,index)=>{
                        if(info.text){
                            return (<Text key={index}>
                                {info.text.map((info1,index1)=>{
                                    if(info1.text){
                                        return <Text style={info1.color?{color:info1.color}:{}} key={index1}>{info1.text}</Text>;
                                    }
                                    else if(info1.emoji){
                                        return <Image key={index1+'emoji'} style={{width:20,height:20}} source={emoji.get(info1.emoji)}/>
                                    }
                                    else{
                                        return (
                                        <TouchableOpacity key={index1} onPress={()=>{
                                            const { navigate } = this.props.navigation;
                                            navigate('OuterWeb',{uri:info1.url});
                                        }}>
                                            <Text style={{color:"blue"}}>{info1.url}</Text>
                                        </TouchableOpacity>
                                        );
                                    }
                                })}
                            </Text>);
                        }
                        else{
                            return <FixedImage
                                key={index+info.image}
                                uri={info.image}
                            />;
                        }
                    })}
                </View>
            </View>           
        ); 
    }

    render(){
        const { params } = this.props.navigation.state;
        return (
            
            <View style={{flex:1}}>
            {
                this.props.data?
                
                <ScrollView 
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.onScrollEndDrag}
                    style={{flex:1}} horizontal={true} showsHorizontalScrollIndicator={true} pagingEnabled={true}>
                    <View style={{flexDirection: 'row',alignSelf:"stretch"}}>
                        {Array.apply(null, Array(this.props.data.pageNum)).map((info,index)=>{                            
                            return (
                                <View key={index} style={{flexDirection: 'row',width:tabWidth}}>
                                    <FlatList
                                        style={{backgroundColor:"white",paddingLeft:10,paddingRight:10}}
                                        data={this.props.data.nodes.slice(index*30+(index!=0),(index+1)*31)}
                                        keyExtractor={(item, index) => index+""}
                                        refreshing={this.props.loading}
                                        renderItem={this.renderRow.bind(this,index)}
                                        ListHeaderComponent={()=><View>
                                                <View style={{height:24,paddingLeft:10,paddingRight:10,backgroundColor:"blue",alignSelf:"flex-start"}}>
                                                    <Text style={{fontSize:18,lineHeight:24,color:"white"}}>
                                                    {this.props.data.board}
                                                    </Text>
                                                </View>
                                                <View style={{marginTop:20,marginBottom:20}}>
                                                    <Text style={{fontSize:20,fontWeight:"bold"}}>{this.props.data.title}</Text>
                                                </View>
                                                <View style={{height:2,backgroundColor:'#e5e5e5'}}/>
                                            </View>}
                                        ItemSeparatorComponent={()=><Divider style={{ backgroundColor: '#e5e5e5' }} />}
                                        />
                                </View>
                            );
                        })
                            
                        }
                    </View>
                </ScrollView>
                :this.props.loading?null:<View>
                    <Text>
                        帖子不见了
                    </Text>
                </View>
            }
            </View>
        );
    }
}

let select=(store)=>{
    return {
        loading:store.postStore.loading,
        data:store.postStore.data
    };
}

export default connect(select)(Post);