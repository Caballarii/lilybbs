import React,{Component} from 'react';
import {View,ScrollView,TouchableOpacity} from 'react-native';

import {SearchBar} from 'react-native-elements';

import CommonText from './common/CommonText';

import boards from '../utils/Board';

const heightArr=boards.map(x=>x.data.length);

class BoardList extends Component{

    state={
        searchBoard:'',
        searchResult:[]
    }

    jumpToList=(index)=>{
        let height=(index)*30+heightArr.slice(0,index).reduce((pre,cur)=>{return pre+cur},0)*50;
        let SV=this.refs.scrollView;
        SV.scrollTo({y:height});
    }

    toBoard=(name)=>{
        const { navigate } = this.props.navigation;
        navigate('Board',{boardName:name});
    }

    toSearchBoard=(searchBoard)=>{
        let searchResult=[]
        if(searchBoard!=''){
            boards.forEach(element=>{
                element.data.forEach(d=>{
                    if(d.name.toLowerCase().indexOf(searchBoard.toLowerCase())!=-1){
                        searchResult.push(d);
                    }
                })
            });
            let SV=this.refs.scrollView;
            SV.scrollTo({y:0});
        }
        this.setState({
            searchBoard:searchBoard,
            searchResult:searchResult
        });
    }

    render(){
        return (
            <View style={{flexDirection:"column"}}>
                <SearchBar
                containerStyle={{}}
                onChangeText={this.toSearchBoard}
                onClear={this.toSearchBoard}
                allowFontScaling={false}
                placeholder='输入你想去的版面' />
                <ScrollView ref="scrollView">
                    {
                        this.state.searchBoard==''?
                        boards.map((info,index)=>{
                        return (
                            <View key={index}>
                                <View style={{height:30,paddingLeft:10,justifyContent:"center"}}>
                                    <CommonText style={{fontSize:18}}>{info.key}</CommonText>
                                </View>
                                {
                                    info.data.map((info1,index1)=>{
                                        return (
                                            <TouchableOpacity key={index1} onPress={this.toBoard.bind(this,info1.name)}>
                                                <View style={{height:50,paddingLeft:20,justifyContent:"center",backgroundColor:"white",borderBottomColor:"rgb(233,233,239)",borderBottomWidth:1}}>
                                                    <CommonText style={{fontSize:20}}>{info1.name+"("+info1.desc+")"}</CommonText>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </View>
                            );
                        }):
                        this.state.searchResult.map((info,index)=>{
                            return (
                                <TouchableOpacity key={index} onPress={this.toBoard.bind(this,info.name)}>
                                    <View style={{height:50,paddingLeft:20,justifyContent:"center",backgroundColor:"white",borderBottomColor:"rgb(233,233,239)",borderBottomWidth:1}}>
                                        <CommonText style={{fontSize:20}}>{info.name+"("+info.desc+")"}</CommonText>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }
                    <View style={{height:50,paddingLeft:20,justifyContent:"center"}}>
                        <CommonText style={{fontSize:20}}>{''}</CommonText>
                    </View>                   
                </ScrollView>
                <View style={{position:"absolute",right:0,top:50,display:(this.state.searchBoard==''?"flex":"none")}}>
                    {
                        boards.map((info,index)=>{
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

export default BoardList;