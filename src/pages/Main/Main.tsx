import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { orangeDefault1 } from '../../shared/styleConsts';
import Home from './Home';
import ProfessionalList from './Home/ProfessionalList';
import ProfessionalProfile from './Home/ProfessionalList/ProfessionalProfile';
import ProfessionalReviews from './Home/ProfessionalList/ProfessionalProfile/ProfessionalReviews';
import { Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import stylesHeader from '../../components/Header/styles';
import ClientArea from './Client';

const Stack = createNativeStackNavigator();

export default function Main({navigation} : any) {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{
      header: () => {
        return (
          <SafeAreaView style={stylesHeader.container}>
            <TouchableOpacity 
            style={stylesHeader.menuContainer}
            onPress={() => console.log("Sair")} >
              <Icon color='black' name='arrow-collapse-left' size={30}></Icon>
            </TouchableOpacity>
            <TouchableOpacity 
            style={stylesHeader.perfilContainer}
            onPress={() => navigation.navigate('ClientArea', {id: 1})}>
              <Image style={stylesHeader.imgPerfil} source={require('../../assets/images/foto-de-perfil-homem.png')}></Image>
            </TouchableOpacity>
          </SafeAreaView>
        )
      }
    }}>
      <Stack.Group>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='ProfessionalList' component={ProfessionalList} options={{ headerShown: false }} />
        <Stack.Screen name='ProfessionalProfile' component={ProfessionalProfile} options={{ headerShown: false, statusBarColor: orangeDefault1 }} />
        <Stack.Screen name='ProfessionalReviews' component={ProfessionalReviews} options={{ headerShown: false, statusBarColor: orangeDefault1 }} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name='ClientArea' component={ClientArea} options={{headerShown: false, statusBarColor: orangeDefault1}}/>
      </Stack.Group>
    </Stack.Navigator>
  )
}