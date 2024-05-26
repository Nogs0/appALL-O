import { View, Text } from 'react-native'
import React from 'react'
import style from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { orangeDefault, whiteDefault } from '../../shared/styleConsts'
export type ButtonTabBarProps = {
    focused: boolean,
    color: string,
    icon: string,
    defaultColor: string
}

export default function ButtonTabBar(props: ButtonTabBarProps) {
  return (
    <View style={[style.container, {backgroundColor: props.focused ? props.defaultColor : whiteDefault}]}>
        <Icon size={30} color={props.color} name={props.icon}></Icon>
    </View>
  )
}