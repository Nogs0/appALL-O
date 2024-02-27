import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Header } from '../../components/Header';
import Home from './Home';
import Map from './Map';
import TabBar from '../../components/TabBar';

const Tab = createBottomTabNavigator();
export default function Main() {
    return (
        <Tab.Navigator  screenOptions={{
            header: () => Header
        }} tabBar={ props => <TabBar {...props}/>}>
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Map' component={Map}/>
        </Tab.Navigator>
    )
}