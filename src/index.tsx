import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import ButtonTabBar from './components/ButtonTabBar';
import Main from './pages/Main/Main';
import { whiteDefault } from './shared/styleConsts';
import Notifications from './pages/Notifications';
import Chat from './pages/Chat';

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