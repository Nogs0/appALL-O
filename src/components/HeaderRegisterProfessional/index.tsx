import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import style from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { whiteDefault } from '../../shared/styleConsts'
import { useAuth } from '../../contexts/auth'

export default function HeaderRegisterProfessional({ navigation, initialScreen, endingRegister, goBack }: any) {
  const { endRegister } = useAuth();

  const handleRegisterOut = () => {
    if (initialScreen) {
      endRegister();
      goBack;
    }
    else navigation.goBack();
  }

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.label}>ALL-O</Text>

      {endingRegister ?
        <></>
        :
        <TouchableOpacity style={style.goBack}
          onPress={() => handleRegisterOut()}>
          <Icon name={'chevron-left'} size={35} color={whiteDefault} />
        </TouchableOpacity>}
    </SafeAreaView>
  )
}