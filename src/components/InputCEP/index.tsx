import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { blueDefault, orangeDefault, whiteDefault } from '../../shared/styleConsts'
import MaskInput from 'react-native-mask-input'

type InputCEPProps = {
  cep: string,
  onChangeText: any,
  searchCEP(): void,
  onFocus?: any
  isClient?: boolean
}
export default function InputCEP(props: InputCEPProps) {
  return (
    <View style={styles.input}>
      <MaskInput
        keyboardType={'number-pad'}
        style={styles.textInput}
        onFocus={props.onFocus}
        value={props.cep}
        onChangeText={(masked) => {
          props.onChangeText(masked);
        }}
        maskAutoComplete={true}
        mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} />
      <TouchableOpacity style={styles.buttonSearchContainer} onPress={props.searchCEP}>
        <Icon name={'search'} size={30} color={whiteDefault}
          style={props.isClient ? [styles.buttonSearch, { backgroundColor: orangeDefault }] : [styles.buttonSearch, { backgroundColor: blueDefault }]}></Icon>
      </TouchableOpacity>
    </View>
  )
}
