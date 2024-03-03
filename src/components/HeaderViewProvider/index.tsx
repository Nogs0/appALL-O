import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { TabProviderEnum } from '../../shared/Enums/enums'
import { greyDefault } from '../../shared/styleConsts'
import ButtonTab from '../ButtonTab'

type HeaderViewProviderProps = {
    button: TabProviderEnum,
    onPress: any
}

export default function HeaderViewProvider(props: HeaderViewProviderProps) {
    return (
        <View style={styles.container}>
            <ButtonTab width={'50%'} onPress={() => {props.onPress(TabProviderEnum.apresentation)}} text={'Apresentation'} borderBottomColor={props.button == 1 ? 'white' : greyDefault} />
            <ButtonTab width={'50%'} onPress={() => {props.onPress(TabProviderEnum.comments)}} text={'Comments'} borderBottomColor={props.button == 2 ? 'white' : greyDefault} />
        </View>
    )
}