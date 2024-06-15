import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { blueDefault, orangeDefault, whiteDefault } from '../../shared/styleConsts'


type InputCEPProps = {
  type: string,
  cep: string,
  onChangeText: any,
  searchCEP: () => void,
  onFocus: any
}
export default function InputCEP(props: InputCEPProps) {
  const iconStyle = props.type === 'client' ? styles.buttonSearchClient : styles.buttonSearch;

  return (
    <View style={styles.input}>
      <TextInput
        onFocus={props.onFocus}
        placeholder={'CEP'}
        value={props.cep}
        onChangeText={props.onChangeText}
        style={styles.textInput} />

      <TouchableOpacity style={styles.buttonSearchContainer} onPress={() => props.searchCEP()}>
        <Icon name={'search'} size={30} color={whiteDefault} style={iconStyle}></Icon>
      </TouchableOpacity>
    </View>
  )
}
