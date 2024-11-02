import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { blueDefault } from '../../shared/styleConsts'
import Stars from '../Stars'
import style from './style'

interface CardReviewProps {
    id: number
    client: string,
    qualidade: number,
    agilidade: number,
    preco: number,
    rateNote: string,
    favorite: boolean,
    isProfessional: boolean,
    setFavoriteCallback(): void,
    onClick(): void
}

export default function CardReview(props: CardReviewProps) {

    const getFavorite = (favorite: boolean) => {
        return favorite ? <Icon name='star' size={20} color={blueDefault}></Icon> :
            <Icon name='star-outline' size={20} color={blueDefault}></Icon>;
    }

    return (
        <TouchableOpacity style={style.cardReview} onPress={() => props.onClick()}>
            <View style={style.infoContainer}>
                <View style={style.cardHeader}>
                    <Text style={style.nameClient}>{props.client}</Text>
                </View>
                <Stars rate={(props.agilidade + props.qualidade + props.preco)/3} />
                <Text style={style.rateNote}>{props.rateNote}</Text>
            </View>
            <TouchableOpacity
                style={style.favoriteContainer}
                onPress={props.setFavoriteCallback}>
                {props.isProfessional ? getFavorite(props.favorite) : <></>}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}