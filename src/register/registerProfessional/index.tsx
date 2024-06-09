import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Register_Contact from './screens/Register_Contact'
import Register_CreatingProfession from './screens/Register_CreatingProfession'
import Register_Description from './screens/Register_Description'
import Register_Images from './screens/Register_Images'
import Register_OkEndRegister from './screens/Register_OkEndRegister'
import Register_OkProfession from './screens/Register_OkProfession'
import Register_ServiceLocation from './screens/Register_ServiceLocation'
import Register_Services from './screens/Register_Services'
import Register_InitialInformations from './screens/Register_InitialInformations'

export default function RegisterProfessional({goBack} : any) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Register_InitialInformations'>
      <Stack.Group>
        <Stack.Screen name="Register_InitialInformations" component={Register_InitialInformations} options={{ headerShown: false }} />
        <Stack.Screen name="Register_Services" component={Register_Services} options={{ headerShown: false }} />
        <Stack.Screen name="Register_Description" component={Register_Description} options={{ headerShown: false }} />
        <Stack.Screen name="Register_ServiceLocation" component={Register_ServiceLocation} options={{ headerShown: false }} />
        <Stack.Screen name="Register_Contact" component={Register_Contact} options={{ headerShown: false }} />
        <Stack.Screen name="Register_Images" component={Register_Images} options={{ headerShown: false }} />
        <Stack.Screen name="Register_OkEndRegister" component={Register_OkEndRegister} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Register_CreatingProfession" component={Register_CreatingProfession} options={{ headerShown: false }} />
        <Stack.Screen name="Register_OkProfession" component={Register_OkProfession} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

