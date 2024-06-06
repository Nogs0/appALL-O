import React from 'react'
import { TextInput } from 'react-native'

import styles from './styles'

type InputProps = {
  text: string,
  placeholder: string
  onChangeText: any,
  editable?: boolean
}
export default function Input(props: InputProps) {
  return (
    <TextInput
      focusable={props.editable}
      editable={props.editable}
      placeholder={props.placeholder}
      value={props.text}
      onChangeText={props.onChangeText}
      style={styles.input} />
  )
}