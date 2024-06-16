import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import RegisterClient_AddProfilePic from './screens/RegisterClient_AddProfilePic'
import RegisterClient_CEP from './screens/RegisterClient_CEP'
import RegisterClient_OkEndRegister from './screens/RegisterClient_EndRegister'
import RegisterClient_InitialInformations from './screens/RegisterClient_InitialInformations'

export default function RegisterClient({goBack} : any) {
  const Stack = createNativeStackNavigator();
return (
  <Stack.Navigator initialRouteName='RegisterClient_InitialInformations'>
    <Stack.Group>
       <Stack.Screen name="RegisterClient_InitialInformations" component={RegisterClient_InitialInformations} options={{ headerShown: false }} />
       <Stack.Screen name="RegisterClient_CEP" component={RegisterClient_CEP} options={{ headerShown: false }} />
       <Stack.Screen name="RegisterClient_AddProfilePic" component={RegisterClient_AddProfilePic} options={{ headerShown: false }} />        
       <Stack.Screen name="RegisterClient_OkEndRegister" component={RegisterClient_OkEndRegister} options={{ headerShown: false }} />
    </Stack.Group>
  </Stack.Navigator>
)
}