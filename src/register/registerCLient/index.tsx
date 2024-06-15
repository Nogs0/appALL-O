import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Register_InitialInformations from './screens/Client_InitialInformations'
import Register_CEP from './screens/Client_CEP'

export default function RegisterProfessional({goBack} : any) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Client_InitialInformations'>
      <Stack.Group>
        <Stack.Screen name="Client_InitialInformations" component={Register_InitialInformations} options={{ headerShown: false }} />
        <Stack.Screen name="Register_CEP" component={Register_CEP} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

