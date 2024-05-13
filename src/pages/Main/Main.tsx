import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Header } from '../../components/Header';
import Home from './Home';
import ProfessionalList from './Home/ProfessionalList';
import ProfessionalProfile from '../../components/ProfessionalProfile';
import { orangeDefault1 } from '../../shared/styleConsts';
import ProfessionalReviews from '../../components/ProfessionalReviews';

const Stack = createNativeStackNavigator();
export default function Main() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ header: () => Header }}>
      <Stack.Group>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='ProfessionalList' component={ProfessionalList} options={{ headerShown: false }} />
        <Stack.Screen name='ProfessionalProfile' component={ProfessionalProfile} options={{ headerShown: false, statusBarColor: orangeDefault1 }} />
        <Stack.Screen name='ProfessionalReviews' component={ProfessionalReviews} options={{ headerShown: false, statusBarColor: orangeDefault1 }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}