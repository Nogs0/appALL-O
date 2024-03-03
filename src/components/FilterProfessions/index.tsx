import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import { ButtonFilterEnum } from '../../shared/Enums/enums'
import { greyDefault } from '../../shared/styleConsts'
import ButtonTab from '../ButtonTab'

type FilterProfessionsProps = {
    button: ButtonFilterEnum,
    onPress: any
}

export default function FilterProfessions(props: FilterProfessionsProps) {
    return (
        <View style={styles.container}>
            <ButtonTab width={'33.34%'} onPress={() => {props.onPress(ButtonFilterEnum.nextToYou)}} text={'Next to you'} borderBottomColor={props.button == 1 ? 'white' : greyDefault} />
            <ButtonTab width={'33.34%'} onPress={() => {props.onPress(ButtonFilterEnum.all)}} text={'All'} borderBottomColor={props.button == 2 ? 'white' : greyDefault} />
            <ButtonTab width={'33.34%'} onPress={() => {props.onPress(ButtonFilterEnum.lastSeen)}} text={'Last seen'} borderBottomColor={props.button == 3 ? 'white' : greyDefault} />
        </View>
    )
}