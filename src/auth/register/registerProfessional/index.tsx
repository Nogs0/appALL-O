import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import RegisterProfessional_Contact from './screens/RegisterProfessional_Contact'
import RegisterProfessional_CreatingProfession from './screens/RegisterProfessional_CreatingProfession'
import RegisterProfessional_Description from './screens/RegisterProfessional_Description'
import RegisterProfessional_Images from './screens/RegisterProfessional_Images'
import RegisterProfessional_OkEndRegister from './screens/RegisterProfessional_OkEndRegister'
import RegisterProfessional_OkProfession from './screens/RegisterProfessional_OkProfession'
import RegisterProfessional_ServiceLocation from './screens/RegisterProfessional_ServiceLocation'
import RegisterProfessional_Services from './screens/RegisterProfessional_Services'
import RegisterProfessional_InitialInformations from './screens/RegisterProfessional_InitialInformations'
import { blueDefault } from '../../../shared/styleConsts'
import RegisterProfessional_AddProfilePic from './screens/RegisterProfessional_AddProfilePic'

export default function RegisterProfessional({goBack} : any) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='RegisterProfessional_InitialInformations'>
      <Stack.Group>
        <Stack.Screen name="RegisterProfessional_InitialInformations" component={RegisterProfessional_InitialInformations} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterProfessional_Services" component={RegisterProfessional_Services} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterProfessional_CreatingProfession" component={RegisterProfessional_CreatingProfession} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterProfessional_OkProfession" component={RegisterProfessional_OkProfession} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterProfessional_Description" component={RegisterProfessional_Description} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterProfessional_ServiceLocation" component={RegisterProfessional_ServiceLocation} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterProfessional_Contact" component={RegisterProfessional_Contact} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterProfessional_AddProfilePic" component={RegisterProfessional_AddProfilePic} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterProfessional_Images" component={RegisterProfessional_Images} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterProfessional_OkEndRegister" component={RegisterProfessional_OkEndRegister} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

