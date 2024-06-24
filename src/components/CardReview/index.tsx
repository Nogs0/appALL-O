import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { blueDefault } from '../../shared/styleConsts'
import Stars from '../Stars'
import style from './style'

interface CardReviewProps {
    id: number
    client: string,
    rate: number,
    rateNote: string,
    favorite: boolean,
    isProfessional: boolean,
    setFavoriteCallback(): void
}

export default function CardReview(props: CardReviewProps) {

    const getFavorite = (favorite: boolean) => {
        return favorite ? <Icon name='star' size={20} color={blueDefault}></Icon> :
            <Icon name='star-outline' size={20} color={blueDefault}></Icon>;
    }

    return (
        <View style={style.cardReview}>
            <View style={style.infoContainer}>
                <View style={style.cardHeader}>
                    <Text style={style.nameClient}>{props.client}</Text>
                </View>
                <Stars rate={props.rate} />
                <Text style={style.rateNote}>{props.rateNote}</Text>
            </View>
            <TouchableOpacity
                style={style.favoriteContainer}
                onPress={props.setFavoriteCallback}>
                {props.isProfessional ? getFavorite(props.favorite) : <></>}
            </TouchableOpacity>
        </View>
    )
}