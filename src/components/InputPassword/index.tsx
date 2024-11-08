import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { blackDefault, greyDefault } from '../../shared/styleConsts'

type InputPasswordProps = {
  text: string,
  onChangeText: any,
  borderColor?: string,
  onFocus?: any
}

export default function InputPassword(props: InputPasswordProps) {

  const [hidePassword, setHidePassword] = useState<boolean>(true);

  return (
    <View style={[styles.input, {borderColor: !!props.borderColor ? props.borderColor : greyDefault}]}>
      <TextInput
        onFocus={props.onFocus}
        secureTextEntry={hidePassword}
        placeholder={'Senha'}
        value={props.text}
        onChangeText={props.onChangeText}
        style={styles.textInput}/>
        <TouchableOpacity
          style={styles.eye}
          onPress={() => setHidePassword(!hidePassword)}>
          <Icon name={hidePassword ? 'eye' : 'eye-off'} size={20} color={blackDefault}></Icon>
        </TouchableOpacity>
    </View>
  )
}