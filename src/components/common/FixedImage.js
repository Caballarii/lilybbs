import React ,{Component} from 'react';
import {Image} from 'react-native';

var Dimensions = require('Dimensions');
//获取屏幕的宽高
var {width} = Dimensions.get('window');

export default class FixedImage extends Component{

    state={
        loading:true,
        width:0,
        height:0,
        //uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509622308997&di=40126493bf2989e169cb9ea0bd7a7838&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D7024a61071f40ad101e9cfa03f457baa%2F63d9f2d3572c11dfd3b32e0b692762d0f703c2bc.jpg"
        uri:this.props.uri
    }

    componentDidMount(){
        const IMAGE_PREFETCH_URL = this.props.uri;
        //var prefetchTask = Image.prefetch(IMAGE_PREFETCH_URL);
        //prefetchTask.then(()=>{
        if(this.state.loading==true){
            this.setState({
                loading:false
            });
            Image.getSize(IMAGE_PREFETCH_URL,(w,h) =>{
                this.setState({
                    height:h*(width-20)/w,
                    width:width-20,
                    uri:IMAGE_PREFETCH_URL
                });
            });
        }
        //})
    }

    render(){
        return (
            <Image style={{height:this.state.height,width:this.state.width}} source={{uri:this.state.uri}} />
        );
    }
}
