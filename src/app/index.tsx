import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ButtonTabBar from '../components/ButtonTabBar';
import { useAuth } from '../contexts/auth';
import { blueDefault, orangeDefault, whiteDefault } from '../shared/styleConsts';
import Main from './Main/Main';
import SecondTab from './SecondTab';
import Mapa from './Mapa';

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
        {!isProfessional ?
          <Tab.Screen name="Map" component={Mapa} options={{
            tabBarIcon: ({ color, focused }) => <ButtonTabBar defaultColor={orangeDefault} color={color} focused={focused} icon={"map"} />
          }} />
          : <></>
        }
        <Tab.Screen name="SecondTab" component={SecondTab} options={{
          tabBarIcon: ({ color, focused }) => <ButtonTabBar defaultColor={isProfessional ? blueDefault : orangeDefault} color={color} focused={focused} icon={isProfessional ? "bell" : "account"} />
        }} />
      </Tab.Navigator>
    </>
  );
}