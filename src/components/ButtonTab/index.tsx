import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

export default function ButtonTab({ onPress, text, backgroundColor, width, color, borderColor }: any) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.containerOption, { backgroundColor, width, borderColor }]} >
            <Text style={[styles.option, {color}]}>{text}</Text>
        </TouchableOpacity>
    )
}