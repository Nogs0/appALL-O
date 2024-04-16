import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import styleConsts, { greyDefault, orangeDefault1, whiteDefault } from './shared/styleConsts';
import Main from './pages/Main/Main';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from './pages/Chat/Chat';
import Notifications from './pages/Notifications/Notifications';
import ButtonTabBar from './components/ButtonTabBar';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: whiteDefault
        }}>
        <Tab.Screen name="Main" component={Main} options={{
          tabBarIcon: ({ color, focused }) => <ButtonTabBar color={color} focused={focused} icon={"home"}/>
        }} />
        <Tab.Screen name="Chat" component={Chat} options={{
          tabBarIcon: ({ color, focused }) => <ButtonTabBar color={color} focused={focused} icon={"chat"}/>
        }} />
        <Tab.Screen name="Notifications" component={Notifications} options={{
          tabBarIcon: ({ color, focused }) => <ButtonTabBar color={color} focused={focused} icon={"bell"}/>
        }} />
      </Tab.Navigator>
      <StatusBar backgroundColor={whiteDefault} />
    </NavigationContainer>
  );
}