import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignIn from '../login';
import RegisterProfessional from '../register';
import Register_Contact from '../register/screens/Register_Contact';
import Register_CreatingProfession from '../register/screens/Register_CreatingProfession';
import Register_Description from '../register/screens/Register_Description';
import Register_Images from '../register/screens/Register_Images';
import Register_InitialInformations from '../register/screens/Register_InitialInformations';
import Register_OkEndRegister from '../register/screens/Register_OkEndRegister';
import Register_OkProfession from '../register/screens/Register_OkProfession';
import Register_ServiceLocation1 from '../register/screens/Register_ServiceLocation1';
import Register_ServiceLocation2 from '../register/screens/Register_ServiceLocation2';
import Register_Services from '../register/screens/Register_Services';

const Stack = createNativeStackNavigator();

export default function AuthRotes() {
  return (

    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="RegisterProfessional" component={RegisterProfessional} options={{ headerShown: false }} />
        <Stack.Screen name="Register_InitialInformations" component={Register_InitialInformations} options={{ headerShown: false }}/>
        <Stack.Screen name="Register_Services" component={Register_Services} options={{ headerShown: false }}/>
        <Stack.Screen name="Register_Description" component={Register_Description} options={{ headerShown: false }}/>
        <Stack.Screen name="Register_ServiceLocation1" component={Register_ServiceLocation1} options={{ headerShown: false }}/>
        <Stack.Screen name="Register_ServiceLocation2" component={Register_ServiceLocation2} options={{ headerShown: false }}/>
        <Stack.Screen name="Register_Contact" component={Register_Contact} options={{ headerShown: false }}/>
        <Stack.Screen name="Register_Images" component={Register_Images} options={{ headerShown: false }}/>
        <Stack.Screen name="Register_OkEndRegister" component={Register_OkEndRegister} options={{ headerShown: false }}/>
        <Stack.Screen name="Register_CreatingProfession" component={Register_CreatingProfession} options={{ headerShown: false }}/>
        <Stack.Screen name="Register_OkProfession" component={Register_OkProfession} options={{ headerShown: false }}/>
      </Stack.Group>
    </Stack.Navigator>
  )
}