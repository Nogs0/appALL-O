import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/core'

export type CardProps = {
    name: string,
    image: any,
    timeDistance: number,
    status: boolean,
    availableHours: string,
    availableDays: string,
    phoneNumber: string,
    navigation: any,
    profession: string
}

const getStatus = (status: boolean) => {
    return status ? '🟢 Available now' : '🔴 Unavalaible' 
}

export default function CardProvider(props: CardProps) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.contentContainer} onPress={() => props.navigation.navigate('ViewProvider', props)}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={props.image}></Image>
                    <Text style={styles.nameProvider}>{props.name}</Text>
                    <Text style={styles.timeDistance}>{`- ${props.timeDistance}min of you`}</Text>
                </View>
                <View style={styles.informationContainer}>
                    <Text style={styles.status}>{getStatus(props.status)}</Text>
                    <Text style={styles.information}>{props.availableHours}</Text>
                    <Text style={styles.information}>{props.availableDays}</Text>
                    <Text style={styles.information}>{props.phoneNumber}</Text>
                    <Text style={styles.tapTo}>{'Tap to learn more'}</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}