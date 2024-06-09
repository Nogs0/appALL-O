import React from 'react'
import { TextInput, View } from 'react-native'

import styles from './styles'
import MaskInput from 'react-native-mask-input'

type InputProps = {
  text: string,
  placeholder: string
  onChangeText(value: string): void,
  editable?: boolean,
  onBlur?(): void,
  isMask?: boolean,
  mask?: any,
  onFocus?: any
}
export default function Input(props: InputProps) {
  return (
    <View style={styles.input} >
      {
        props.isMask ?
          <MaskInput
            style={styles.textInput}
            onFocus={props.onFocus}
            value={props.text}
            onChangeText={(masked) => {
              props.onChangeText(masked);
            }}
            mask={props.mask} />
          :
          <TextInput
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            onPointerLeave={props.onBlur}
            focusable={props.editable}
            editable={props.editable}
            placeholder={props.placeholder}
            value={props.text}
            onChangeText={props.onChangeText}
            style={styles.textInput} />
      }
    </View>
  )
}