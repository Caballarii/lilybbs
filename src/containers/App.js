import React,{Component} from 'react';
import {View,Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from 'react-navigation';

import TopTen from '../components/TopTen';
import Browse from '../components/Browse';
import Personal from '../components/Personal';
import Settings from '../components/Settings';

const App = createBottomTabNavigator(
    {
      TopTen: {
        screen: TopTen,
        path: '/topten',
        navigationOptions: {
          tabBarLabel: '全站十大',
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              size={30}
              type="MaterialIcons"
              color={tintColor}
            />
          ),
        }
      },
      Browse: {
        screen: Browse,
        path: '/browse',
        navigationOptions: {
          tabBarLabel: '浏览版面',
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='newspaper'
              size={30}
              type="material-community"
              color={tintColor}
            />
          ),
        }
      },
      Personal: {
        screen: Personal,
        path: '/personal',
        navigationOptions: {
          tabBarLabel: '个人中心',
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='gps-fixed'
              size={30}
              type="MaterialIcons"
              color={tintColor}
            />
          ),
        }
      },
      Settings: {
        screen: Settings,
        path: '/settings',
        navigationOptions: {
          tabBarLabel: '设置',
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='perm-identity'
              size={30}
              type="MaterialIcons"
              color={tintColor}
            />
          ),
        }
      }
    },{
      initialRouteName: 'TopTen',
      animationEnabled: false,
      swipeEnabled: false,
      tabBarOptions: {
        activeTintColor: '#e91e63',
      },
    }
  )


export default App;