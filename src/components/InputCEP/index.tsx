import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { blueDefault, orangeDefault, whiteDefault } from '../../shared/styleConsts'
import MaskInput from 'react-native-mask-input'

type InputCEPProps = {
  cep: string,
  onChangeText: any,
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
    </View>
  )
}
