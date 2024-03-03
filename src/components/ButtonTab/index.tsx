import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

export default function ButtonTab({ onPress, text, borderBottomColor, width }: any) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.containerOption, { borderBottomColor, width }]}>
            <Text style={styles.option}>{text}</Text>
        </TouchableOpacity>
    )
}