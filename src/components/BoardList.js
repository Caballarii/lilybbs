import React,{Component} from 'react';
import {View,Text,SectionList} from 'react-native';

import {ListItem,SearchBar} from 'react-native-elements';

import boards from '../utils/Board';

class BoardList extends Component{

    toSearchBoard=(text)=>{
        console.log(text);
    }

    render(){
        return (
            <View>
                <SearchBar
                    onChangeText={this.toSearchBoard}
                    onClear={this.toSearchBoard}
                    placeholder='输入你想去的版面' />
                <SectionList
                    renderItem={({item}) => <ListItem containerStyle={{backgroundColor:"white"}} title={item.name+"("+item.desc+")"}/>}
                    renderSectionHeader={({section}) => <View style={{height:30,justifyContent:"center",paddingLeft:20}}><Text style={{fontSize:18}}>{section.key}</Text></View>}
                    sections={boards}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        );
    }
}

export default BoardList;