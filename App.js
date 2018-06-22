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
