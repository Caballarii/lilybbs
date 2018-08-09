import React,{Component} from 'react';
import {View,FlatList,Image,TouchableOpacity,ScrollView,Dimensions} from 'react-native';
import {Divider} from 'react-native-elements';
import FixedImage from './common/FixedImage';
import CommonText from './common/CommonText';

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
        return (
            <View style={{marginTop:10,marginBottom:10}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:10}}>
                    <CommonText style={{fontWeight:"bold"}} numberOfLines={2}>{item.item.author}</CommonText>
                    <CommonText style={{fontWeight:"bold"}}>{item.index+pageIndex*30+(pageIndex!=0)}</CommonText>
                </View>
                <View style={{marginBottom:16}}>
                    <CommonText>{item.item.date}</CommonText>
                </View>
                <View>
                    {item.item.text.map((info,index)=>{
                        if(info.text){
                            return (<CommonText key={index}>
                                {info.text.map((info1,index1)=>{
                                    if(info1.text){
                                        return <CommonText style={info1.color?{color:info1.color}:{}} key={index1}>{info1.text}</CommonText>;
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
                                            <CommonText style={{color:"blue"}}>{info1.url}</CommonText>
                                        </TouchableOpacity>
                                        );
                                    }
                                })}
                                
                            </CommonText>);
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
                                                    <CommonText style={{fontSize:18,lineHeight:24,color:"white"}}>
                                                    {this.props.data.board}
                                                    </CommonText>
                                                </View>
                                                <View style={{marginTop:20,marginBottom:20}}>
                                                    <CommonText style={{fontSize:20,fontWeight:"bold"}}>{this.props.data.title}</CommonText>
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
                    <CommonText>
                        帖子不见了
                    </CommonText>
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