import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import { ButtonFilterEnum } from '../../shared/Enums/enums'
import { greyDefault } from '../../shared/styleConsts'

type FilterProfessionsProps = {
    button: ButtonFilterEnum,
    onPress: any
}

export default function FilterProfessions(props: FilterProfessionsProps) {
    return (
        <View style={styles.container}>
            <ButtonFilter onPress={() => {props.onPress(ButtonFilterEnum.nextToYou)}} text={'Next to you'} borderBottomColor={props.button == 1 ? 'white' : greyDefault} />
            <ButtonFilter onPress={() => {props.onPress(ButtonFilterEnum.all)}} text={'All'} borderBottomColor={props.button == 2 ? 'white' : greyDefault} />
            <ButtonFilter onPress={() => {props.onPress(ButtonFilterEnum.lastSeen)}} text={'Last seen'} borderBottomColor={props.button == 3 ? 'white' : greyDefault} />
        </View>
    )
}

function ButtonFilter({ onPress, text, borderBottomColor }: any): any {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.containerOption, { borderBottomColor }]}>
            <Text style={styles.option}>{text}</Text>
        </TouchableOpacity>
    )
}