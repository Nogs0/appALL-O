import React from 'react';
import { Text, View } from 'react-native';
import style from './style';

interface CardNotificationProps {
    message: string,
    client: string,
    date: string,
}

export default function CardNotification(props: CardNotificationProps) {

    return (
        <View style={style.cardNotification}>
            <View style={style.infoContainer}>
                <View style={style.cardHeader}>
                    <Text style={style.nameClient}>{props.client}</Text>
                    <Text style={style.date}>{props.date}</Text>
                </View>
                <Text style={style.message}>{props.message}</Text>
            </View>
        </View>
    )
}