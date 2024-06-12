import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import stylesHeader from '../../components/Header/styles';
import { useAuth } from '../../contexts/auth';
import Home from './Home';
import ProfessionalList from './Home/ProfessionalList';
import ProfessionalProfile from './Home/ProfessionalList/ProfessionalProfile';
import ProfessionalReviews from './Home/ProfessionalList/ProfessionalProfile/ProfessionalReviews';

const Stack = createNativeStackNavigator();

export default function Main({ navigation }: any) {

  const { signOut, isProfessional } = useAuth();

  return (
    <Stack.Navigator initialRouteName={"Home"} screenOptions={{
      // header: () => {
      //   return (
      //     <SafeAreaView style={stylesHeader.container}>
      //       <TouchableOpacity
      //         style={stylesHeader.menuContainer}
      //         onPress={() => signOut()} >
      //         <Icon color='black' name='arrow-collapse-left' size={30}></Icon>
      //       </TouchableOpacity>
      //     </SafeAreaView>
      //   )
      // }
      headerShown: false
    }}>
      <Stack.Group>
        {isProfessional ?
          <>
            <Stack.Screen name='Home' component={ProfessionalProfile} options={{ headerShown: false }} />
            <Stack.Screen name='ProfessionalReviews' component={ProfessionalReviews} options={{ headerShown: false }} />
          </>
          :
          <>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='ProfessionalList' component={ProfessionalList} options={{ headerShown: false }} />
            <Stack.Screen name='ProfessionalProfile' component={ProfessionalProfile} options={{ headerShown: false }} />
            <Stack.Screen name='ProfessionalReviews' component={ProfessionalReviews} options={{ headerShown: false }} />
          </>
        }
      </Stack.Group>
    </Stack.Navigator>
  )
}