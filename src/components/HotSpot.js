import React,{Component} from 'react';
import {View,ScrollView,TouchableOpacity} from 'react-native';
import CommonText from './common/CommonText';

import {Divider} from 'react-native-elements';

import {connect} from 'react-redux';
import {loadHotSpotAction} from '../actions/HotSpot';

class HotSpot extends Component{

    componentDidMount(){
        this.props.dispatch(loadHotSpotAction());
    }

    jumpToList=(index)=>{
        let heightArr=this.props.data.map(x=>x.data.length);
        let height=(index)*30+heightArr.slice(0,index).reduce((pre,cur)=>{return pre+cur},0)*85;
        let SV=this.refs.scrollView;
        SV.scrollTo({y:height});
    }

    toPost=(item)=>{
        let url=item.url;
        item.isRead=true;
        const { navigate } = this.props.navigation;

        navigate('Post',{url:url});
    }

    render(){
        return (
            <View style={{flexDirection:"column"}}>
               <ScrollView ref="scrollView">
                    {
                        this.props.data.map((info,index)=>{
                        return (
                            <View key={index}>
                                <View style={{height:30,paddingLeft:10,justifyContent:"center"}}>
                                    <CommonText style={{fontSize:18}}>{info.key}</CommonText>
                                </View>
                                {
                                    info.data.map((info1,index1)=>{
                                        return (
                                            <View key={index1} style={{height:85,backgroundColor:"white"}}>
                                                <View style={{flexDirection:"row",flex:1}}>
                                                    <View style={{width:5,paddingTop:5,paddingBottom:5}}>
                                                        <View style={{backgroundColor:(info.isRead?"transparent":"blue"),flex:1}}>
                                                        </View>    
                                                    </View>
                                                    <View style={{paddingLeft:10,paddingRight:10,paddingTop:15,paddingBottom:10,flex:1}}>
                                                        <TouchableOpacity onPress={this.toPost.bind(this,info1)}>
                                                            <View> 
                                                                <CommonText style={{fontWeight:"bold",fontSize:18,height:40}}>{info1.title}</CommonText>  
                                                                <CommonText style={{fontSize:16}}>版面：{info1.board}</CommonText>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                    
                                                </View>
                                                <Divider style={{ backgroundColor: '#e5e5e5' }} />
                                            </View>
                                        );
                                    })
                                }
                            </View>
                            
                            );
                        })
                    }
                    <View style={{height:50,paddingLeft:20,justifyContent:"center"}}>
                        <CommonText style={{fontSize:20}}>{''}</CommonText>
                    </View>                   
                </ScrollView>
                <View style={{position:"absolute",right:0,top:50}}>
                    {
                        this.props.data.map((info,index)=>{
                            return (
                            <TouchableOpacity key={index} onPress={this.jumpToList.bind(this,index)}>
                                <View style={{paddingLeft:5,paddingRight:5,height:18}}>
                                    <CommonText style={{fontSize:16,textAlign:"center"}}>{info.key}</CommonText>
                                </View>
                            </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </View>
        );
    }
}

let select=(store)=>{
    return {
        loading:store.hotSpotStore.loading,
        data:store.hotSpotStore.data
    };
}

export default connect(select)(HotSpot);