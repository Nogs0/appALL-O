import { View, Text } from 'react-native'
import React from 'react'
import style from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { orangeDefault1, whiteDefault } from '../../shared/styleConsts'
export type ButtonTabBarProps = {
    focused: boolean,
    color: string,
    icon: string
}

export default function ButtonTabBar(props: ButtonTabBarProps) {
  return (
    <View style={[style.container, {backgroundColor: props.focused ? orangeDefault1 : whiteDefault}]}>
        <Icon size={30} color={props.color} name={props.icon}></Icon>
    </View>
  )
}