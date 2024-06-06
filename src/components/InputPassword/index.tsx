import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { blackDefault } from '../../shared/styleConsts'

type InputPasswordProps = {
  text: string,
  onChangeText: any
}

export default function InputPassword(props: InputPasswordProps) {

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.input}>
      <TextInput
        secureTextEntry={showPassword}
        placeholder={'Senha'}
        value={props.text}
        onChangeText={props.onChangeText}
        style={styles.textInput}/>
        <TouchableOpacity
          style={styles.eye}
          onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color={blackDefault}></Icon>
        </TouchableOpacity>
    </View>
  )
}