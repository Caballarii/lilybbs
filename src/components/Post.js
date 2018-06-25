import React,{Component} from 'react';
import {View,Text,FlatList,Image,TouchableOpacity} from 'react-native';
import {Icon,Divider} from 'react-native-elements';
import FixedImage from './common/FixedImage';

import {loadPostAction} from '../actions/Post';
import {connect} from 'react-redux';

import emoji from '../utils/Emoji';

class Post extends Component{
    componentDidMount(){
        this.props.dispatch(loadPostAction(this.props.navigation.state.params.url));
    }

    renderRow=(item)=>{
        const { navigate } = this.props.navigation;
        return (
            <View style={{marginTop:10,marginBottom:10}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:10}}>
                    <Text style={{fontWeight:"bold"}}>{item.item.author}</Text>
                    <Text style={{fontWeight:"bold"}}>{item.index}</Text>
                </View>
                <View style={{marginBottom:10}}>
                    <Text>{item.item.date}</Text>
                </View>
                <View>
                    {/* <Text>{item.item.text.map((info,index)=>{
                        if(info.text){
                            return <Text style={info.color?{color:info.color}:{}} key={index}>{info.text}</Text>
                        }
                        else if(info.image){
                            return <FixedImage
                                key={index+info.image}
                                uri={info.image}
                            />
                        }
                        else if(info.emoji){
                            return <Image key={index+'emoji'} style={{width:20,height:20}} source={emoji.get(info.emoji)}/>
                        }
                        else{
                            return (
                            <TouchableOpacity key={index} onPress={()=>{}}>
                                    <Text style={{color:"blue"}}>{info.url}</Text>
                            </TouchableOpacity>
                            );
                        }
                    })}</Text>   */}
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
                                        <TouchableOpacity key={index1} onPress={()=>{}}>
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
        //console.log(this.props.data);
        const { params } = this.props.navigation.state;

        return (
            
            <View style={{flex:1}}>
            {this.props.loading?
                <Icon type="loading"/>:
                this.props.data?
                <FlatList
                style={{backgroundColor:"white",paddingLeft:10,paddingRight:10}}
                data={this.props.data.nodes}
                keyExtractor={(item, index) => index+""}
                refreshing={this.props.loading}
                renderItem={this.renderRow}
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
                />:
                <View>
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