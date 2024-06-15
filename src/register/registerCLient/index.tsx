import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Register_InitialInformations from './screens/Client_InitialInformations'
import Register_CEP from './screens/Client_CEP'
import Register_AddProfilePic from './screens/Client_AddProfilePic'

export default function RegisterClient({goBack} : any) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Register_AddProfilePic'>
      <Stack.Group>
        <Stack.Screen name="Register_AddProfilePic" component={Register_AddProfilePic} options={{ headerShown: false }} />
        
      </Stack.Group>
    </Stack.Navigator>
  )
}
//<Stack.Screen name="Register_CEP" component={Register_CEP} options={{ headerShown: false }} />

// return (
//   <Stack.Navigator initialRouteName='Register_InitialInformations'>
//     <Stack.Group>
//        <Stack.Screen name="Register_InitialInformations" component={Register_InitialInformations} options={{ headerShown: false }} />
//        <Stack.Screen name="Register_CEP" component={Register_CEP} options={{ headerShown: false }} />
//        <Stack.Screen name="Register_AddProfilePic" component={Register_AddProfilePic} options={{ headerShown: false }} />        
//     </Stack.Group>
//   </Stack.Navigator>
// )