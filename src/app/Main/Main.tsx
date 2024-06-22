import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from '../../contexts/auth';
import Home from './Home';
import AvaliacaoServico from './Home/AvaliacaoServico';
import ProfessionalList from './Home/ProfessionalList';
import ProfessionalProfile from './Home/ProfessionalList/ProfessionalProfile';
import ProfessionalEdit from './Home/ProfessionalList/ProfessionalProfile/ProfessionalEdit';
import ProfessionalReviews from './Home/ProfessionalList/ProfessionalProfile/ProfessionalReviews';

const Stack = createNativeStackNavigator();

export default function Main({ navigation }: any) {

  const { isProfessional } = useAuth();

  return (
    <Stack.Navigator initialRouteName={"Home"} screenOptions={{
      headerShown: false
    }}>
      <Stack.Group>
        {isProfessional ?
          <>
            <Stack.Screen name='Home' component={ProfessionalProfile} options={{ headerShown: false }} />
            <Stack.Screen name='ProfessionalReviews' component={ProfessionalReviews} options={{ headerShown: false }} />
            <Stack.Screen name='ProfessionalEdit' component={ProfessionalEdit} options={{ headerShown: false }} />
          </>
          :
          <>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='ProfessionalList' component={ProfessionalList} options={{ headerShown: false }} />
            <Stack.Screen name='ProfessionalProfile' component={ProfessionalProfile} options={{ headerShown: false }} />
            <Stack.Screen name='ProfessionalReviews' component={ProfessionalReviews} options={{ headerShown: false }} />
            <Stack.Screen name='AvaliacaoServico' component={AvaliacaoServico} options={{ headerShown: false }} />
          </>
        }
      </Stack.Group>
    </Stack.Navigator>
  )
}