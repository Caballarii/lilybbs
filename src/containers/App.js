import React,{Component} from 'react';
import {View,Text,WebView} from 'react-native';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator,createStackNavigator} from 'react-navigation';

import TopTen from '../components/TopTen';
import Browse from '../components/Browse';
import Personal from '../components/Personal';
import Settings from '../components/Settings';
import Post from '../components/Post';

const Home = createBottomTabNavigator(
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
  );

Home.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  // You can do whatever you like here to pick the title based on the route name
  let headerTitle = '';
  switch(routeName){
    case 'TopTen': headerTitle='全站十大';break;
    case 'Browse': headerTitle='浏览版面';break;
    case 'Personal': headerTitle='个人中心';break;
    case 'Settings': headerTitle='设置';break;
  }
  
  return {
    headerTitle,
    headerStyle: {
      backgroundColor: 'rgb(41,139,217)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
};

Post.navigationOptions=({navigation})=>{
  return {
    headerTitle:'浏览帖子'
  };
}

class OuterWeb extends Component{
  render(){
    return (
      <WebView
        source={{uri: this.props.navigation.state.params.uri}}
      />
    );
  } 
}

const App=createStackNavigator({
    Home,
    Post,
    OuterWeb
});




export default App;