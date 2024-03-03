import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfessionsList from './ProfessionsList';
import ProvidersList from './ProvidersList';
import ViewProvider from './ProvidersList/ViewProvider';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../../components/Header';

const Stack = createNativeStackNavigator();

export default function Home() {

  return (
    <Stack.Navigator initialRouteName='ProfessionsList' screenOptions={{header: () => Header}}>
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