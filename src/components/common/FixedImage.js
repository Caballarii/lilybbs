import React ,{Component} from 'react';
import {Image} from 'react-native';

var Dimensions = require('Dimensions');
//获取屏幕的宽高
var {width} = Dimensions.get('window');

export default class FixedImage extends Component{

    state={
        height:0,
        width:0
    }

    componentDidMount(){
        this._isMounted = true;
        const IMAGE_PREFETCH_URL = this.props.uri;
        Image.getSize(IMAGE_PREFETCH_URL,(w,h) =>{
            if(this._isMounted){
                this.setState({
                    height:h*(width-20)/w,
                    width:width-20
                });
            }
        });
    }

    componentWillUnmount(){
        this._isMounted=false;
    }

    render(){
        return (
            <Image style={{height:this.state.height,width:this.state.width}} source={{uri:this.props.uri}} />
        );
    }
}
