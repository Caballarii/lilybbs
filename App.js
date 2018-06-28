import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Root from './src/Root';

export default class App extends React.Component {
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

import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

var storage = new Storage({
  size:1000,
  storageBackend: AsyncStorage,
  defaultExpires:1000*3600*24,
  enableCache:true
});

global.storage=storage;

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
