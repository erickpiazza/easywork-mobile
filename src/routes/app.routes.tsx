import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import ProvidersList from '../pages/ProvidersList/index';
import ProvidersListMap from '../pages/ProvidersListMap/index';
import ProviderProfile from '../pages/ProviderProfile/index';
import {useAuth} from '../../src/hooks/auth';
import {Text, TouchableOpacity} from 'react-native';

const App = createBottomTabNavigator();
const RoutersHome = createStackNavigator();

function ScreensProviderList() {
  const {user, signOut} = useAuth();
  return (
    <RoutersHome.Navigator>
      <RoutersHome.Screen
        options={{
          title: `Bem vindo ${user.name} `,
          headerRight: () => (
            <TouchableOpacity
              onPress={signOut}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 8,
              }}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{marginHorizontal: 8, fontSize: 16, color: '#0099FF'}}>
                sair
              </Text>

              <Icon size={18} color="#0099FF" name="log-out" />
            </TouchableOpacity>
          ),
        }}
        name="Search"
        component={ProvidersList}
      />
      <RoutersHome.Screen
        options={{title: ''}}
        name="ProviderProfile"
        component={ProviderProfile}
      />
    </RoutersHome.Navigator>
  );
}

function ScreensProviderListMap() {
  const {user, signOut} = useAuth();
  return (
    <RoutersHome.Navigator>
      <RoutersHome.Screen
        options={{
          title: `Bem vindo ${user.name}`,
          headerRight: () => (
            <TouchableOpacity
              onPress={signOut}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 8,
              }}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{marginHorizontal: 8, fontSize: 16, color: '#0099FF'}}>
                sair
              </Text>

              <Icon size={18} color="#0099FF" name="log-out" />
            </TouchableOpacity>
          ),
        }}
        name="Search"
        component={ProvidersListMap}
      />
      <RoutersHome.Screen
        options={{title: ''}}
        name="ProviderProfile"
        component={ProviderProfile}
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
      name="listProvider"
      component={ScreensProviderList}
      options={{
        tabBarIcon: ({color}) => <Icon name="list" color={color} size={34} />,
      }}
    />
    <App.Screen
      name="listProviderMap"
      component={ScreensProviderListMap}
      options={{
        tabBarIcon: ({color}) => <Icon name="map" color={color} size={34} />,
      }}
    />
  </App.Navigator>
);

export default AppRoutes;
