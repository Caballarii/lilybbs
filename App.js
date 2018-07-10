import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Root from './src/Root';

import {initStorage} from './src/utils/Storage';

export default class App extends React.Component {

  componentDidMount(){
    initStorage();
  }
  
  render() {
    return (
      <Root />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import {FetchUtil} from './src/utils/FetchUtil';
// import Cheerio from "cheerio-without-node-native";
// FetchUtil('bbsboa?sec=11').then(data=>{
//   let $=Cheerio.load(data);
//   let result="";
//   $("tr").each(function(i, e) {
//     if(i==0)return;
//     let item=$(this);
//     let name=item.children("td").eq(2).children("a").html();

//     let descUni=item.children("td").eq(5).children("a").html();
//     let desc=unescape(descUni.replace(/&#x/g,'%u').replace(/;/g,'')).substring(3);

//     result+=("insertBoard('"+name+"','"+desc+"');\n");
//   });
//   console.log(result);
// })
