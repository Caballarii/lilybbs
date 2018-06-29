import React,{Component} from 'react';
import {View,Text,ScrollView,TouchableOpacity} from 'react-native';

import {SearchBar} from 'react-native-elements';

import boards from '../utils/Board';

const heightArr=boards.map(x=>x.data.length);

class BoardList extends Component{

    jumpToList=(index)=>{
        let height=(index)*30+heightArr.slice(0,index).reduce((pre,cur)=>{return pre+cur},0)*50;
        let SV=this.refs.scrollView;
        SV.scrollTo({y:height});
    }

    componentWillMount(){
        console.log(new Date());
    }

    componentDidMount(){
        console.log(new Date());
    }

    render(){
        return (
            <View>
                <SearchBar
                    onChangeText={this.toSearchBoard}
                    onClear={this.toSearchBoard}
                    placeholder='输入你想去的版面' />

                <View style={{flexDirection:"row"}}>
                    <ScrollView ref="scrollView">
                        {boards.map((info,index)=>{
                            return (
                                <View key={index}>
                                    <View style={{height:30,paddingLeft:10,justifyContent:"center"}}>
                                        <Text style={{fontSize:18}}>{info.key}</Text>
                                    </View>
                                    {
                                        info.data.map((info1,index1)=>{
                                            return (<View key={index1} style={{height:50,paddingLeft:20,justifyContent:"center",backgroundColor:"white",borderBottomColor:"rgb(233,233,239)",borderBottomWidth:1}}>
                                                <Text style={{fontSize:20}}>{info1.name+"("+info1.desc+")"}</Text>
                                            </View>);
                                        })
                                    }
                                </View>
                            );
                        })}
                    </ScrollView>
                    <View style={{position:"absolute",right:0,top:10}}>
                        {
                            boards.map((info,index)=>{
                                return (
                                <TouchableOpacity key={index} onPress={this.jumpToList.bind(this,index)}>
                                    <View style={{paddingLeft:5,paddingRight:5,height:18}}>
                                        <Text style={{fontSize:16}}>{info.key}</Text>
                                    </View>
                                </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </View>
            </View>
        );
    }
}

export default BoardList;