import { View, Text, TextInput, InputModeOptions } from 'react-native'
import React from 'react'

import styles from './styles'

type InputProps = {
    text: string,
    placeHolder: string
    onChangeText: () => any
}
export default function Input(props: InputProps) {
  return (
   <TextInput placeholder={props.placeHolder} value={props.text} onChangeText={props.onChangeText} style={styles.input}></TextInput>
  )
}