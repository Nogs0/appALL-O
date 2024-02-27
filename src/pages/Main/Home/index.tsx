import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from 'react-native/Libraries/NewAppScreen';
import ProfessionsList from './ProfessionsList';
import ProvidersList from './ProvidersList';
import ViewProvider from './ProvidersList/ViewProvider';

const Stack = createNativeStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator initialRouteName='Main' screenOptions={{headerShown: false}}>
        <Stack.Group>
            <Stack.Screen name='ProfessionsList' component={ProfessionsList} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name='ProvidersList' component={ProvidersList} />
                <Stack.Screen name='ViewProvider' component={ViewProvider} />
            </Stack.Group>
        </Stack.Group>
    </Stack.Navigator>
  )
}