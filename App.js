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
