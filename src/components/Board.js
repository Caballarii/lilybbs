import React,{Component} from 'react';
import {View,Text} from 'react-native';

class Board extends Component{
    render(){
        return (
            <View>
                <Text>
                    board
                </Text>
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