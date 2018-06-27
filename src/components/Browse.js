import React,{Component} from 'react';
import {View,Text,Dimensions,ScrollView} from 'react-native';
let tabWidth = Dimensions.get('window').width;

class Browse extends Component{    

    onScrollBeginDrag=(event)=>{
        console.log(event.nativeEvent);
    }

    onScrollEndDrag=(event)=>{
        console.log(event.nativeEvent);
    }

    render(){
        return (
            <View style={{flex:1}}>                
                <ScrollView
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.onScrollEndDrag}
                    style={{flex:1}} horizontal={true} showsHorizontalScrollIndicator={true} pagingEnabled={true}>
                    <View style={{flexDirection: 'row',alignSelf:"stretch"}}>
                        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',width:tabWidth,backgroundColor:"red"}}>
                            <Text>分页1</Text>
                        </View>
                        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',width:tabWidth,backgroundColor:"blue"}}>
                            <Text>分页2</Text>
                        </View>
                        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',width:tabWidth}}>
                            <Text>分页3</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Browse;