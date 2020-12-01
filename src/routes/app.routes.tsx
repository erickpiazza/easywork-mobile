import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import ProvidersList from '../pages/ProvidersList/index';
import {useAuth} from '../../src/hooks/auth';

const App = createBottomTabNavigator();
const RoutersHome = createStackNavigator();

function ScreensHome() {
  const {user} = useAuth();
  return (
    <RoutersHome.Navigator>
      <RoutersHome.Screen
        options={{title: `Bem vindo ${user.name} `}}
        name="Search"
        component={ProvidersList}
      />
    </RoutersHome.Navigator>
  );
}

const AppRoutes: React.FC = () => (
  <App.Navigator
    tabBarOptions={{
      activeTintColor: '#0099FF',
      showLabel: false,
      tabStyle: {borderColor: 'rgba(0, 153, 255, 0.308)', borderTopWidth: 1},
    }}>
    <App.Screen
      name="dasd "
      component={ScreensHome}
      options={{
        tabBarIcon: ({color}) => <Icon name="home" color={color} size={34} />,
      }}
    />
  </App.Navigator>
);

export default AppRoutes;
