import React,{Component} from 'react';
import {
  Text
} from 'react-native';

export default class CommonText extends Component{

    render(){
        return (
            <Text allowFontScaling={false} numberOfLines={this.props.numberOfLines} style={{fontSize:16,...this.props.style}}>{this.props.children}</Text>
        )
    }
}