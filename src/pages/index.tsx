import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ButtonTabBar from '../components/ButtonTabBar';
import { useAuth } from '../contexts/auth';
import { blueDefault, orangeDefault, whiteDefault } from '../shared/styleConsts';
import Chat from './Chat';
import Main from './Main/Main';
import Notifications from './Notifications';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();
export default function Pages() {
  const { isProfessional } = useAuth();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: whiteDefault
        }}>
        <Tab.Screen name="Main" component={Main} options={{
          tabBarIcon: ({ color, focused }) => <ButtonTabBar defaultColor={isProfessional ? blueDefault : orangeDefault} color={color} focused={focused} icon={"home"} />
        }} />
        <Tab.Screen name="Chat" component={Chat} options={{
          tabBarIcon: ({ color, focused }) => <ButtonTabBar defaultColor={isProfessional ? blueDefault : orangeDefault} color={color} focused={focused} icon={"chat"} />
        }} />
        <Tab.Screen name="Notifications" component={Notifications} options={{
          tabBarIcon: ({ color, focused }) => <ButtonTabBar defaultColor={isProfessional ? blueDefault : orangeDefault} color={color} focused={focused} icon={"bell"} />
        }} />
      </Tab.Navigator>
    </>
  );
}