import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { whiteDefault } from '../../shared/styleConsts'

type InputCEPProps = {
  cep: string,
  onChangeText: any,
  searchCEP: () => void
}
export default function InputCEP(props: InputCEPProps) {


  return (
    <View style={styles.input}>
      <TextInput
        placeholder={'CEP'}
        value={props.cep}
        onChangeText={props.onChangeText}
        style={styles.textInput} />

      <TouchableOpacity style={styles.buttonSearchContainer} onPress={() => props.searchCEP()}>
        <Icon name={'search'} size={30} color={whiteDefault} style={styles.buttonSearch}></Icon>
      </TouchableOpacity>
    </View>
  )
}