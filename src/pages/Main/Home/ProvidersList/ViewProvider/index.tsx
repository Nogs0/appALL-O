import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './styles';
import StarsRating from '../../../../../components/StarsRating';

export default function ViewProvider({ route }: any) {
    const props = route.params; 
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.imageHeader} source={props.image}></Image>
                <Text>{props.name}</Text>
                <Text>{props.profession}</Text>
            </View>
            <View style={styles.infoContainer}>
                <StarsRating />
            </View>
            <View style={styles.imagesContainer}>

            </View>
        </View>
    )
}