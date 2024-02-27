import React from 'react'
import { Image, Text, TouchableOpacity, View, ViewBase } from 'react-native'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'

export type CardProfessionProps = {
    profession: string,
    image: any,
    navigation: () => any
}

export default function CardProfession(props: CardProfessionProps) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.touchableContainer} 
            onPress={props.navigation}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={props.image}></Image>
                </View>
                <View style={styles.profissionContainer}>
                    <Text style={styles.profission}>{props.profession}</Text>
                </View>
            </TouchableOpacity >
        </SafeAreaView>
    )
}