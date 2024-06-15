import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { blueDefault } from '../../shared/styleConsts';

interface CardNotificationProps {
    image: any,
    message: string,
    client: string,
    date: string,
    seen: boolean,
    setSeenCallback(): void
}

export default function CardNotification(props: CardNotificationProps) {

    const getSeen = (seen: boolean) => {
        return seen ? <Icon name='eye' size={20} color={blueDefault}></Icon> :
            <Icon name='eye-outline' size={20} color={blueDefault}></Icon>;
    }

    return (
        <View style={style.cardNotification}>
            <View style={style.imageContainer}>
                <Image style={style.image} source={props.image}></Image>
            </View>
            <View style={style.infoContainer}>
                <View style={style.cardHeader}>
                    <Text style={style.nameClient}>{props.client}</Text>
                    <Text style={style.date}>{props.date}</Text>
                </View>
                <Text style={style.message}>{props.message}</Text>
            </View>
            <TouchableOpacity style={style.seenContainer}
                onPress={props.setSeenCallback}>
                {getSeen(props.seen)}
            </TouchableOpacity>
        </View>
    )
}