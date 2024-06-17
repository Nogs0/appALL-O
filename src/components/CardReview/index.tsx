import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { blueDefault } from '../../shared/styleConsts'
import Stars from '../Stars'
import style from './style'

interface CardReviewProps {
    id: number
    image: any,
    client: string,
    date: string,
    rate: number,
    rateNote: string,
    images: any[],
    favorite: boolean,
    isProfessional: boolean,
    setFavoriteCallback(): void
}

export default function CardReview(props: CardReviewProps) {

    const renderImage = (image: any) => {
        return (
            <TouchableOpacity onPress={() => console.log('pressionou a imagem')}>
                <Image style={style.imageReview} source={image}></Image>
            </TouchableOpacity>
        )
    }

    const getFavorite = (favorite: boolean) => {
        return favorite ? <Icon name='star' size={20} color={blueDefault}></Icon> :
            <Icon name='star-outline' size={20} color={blueDefault}></Icon>;
    }

    return (
        <View style={style.cardReview}>
            <View style={style.imageContainer}>
                <Image style={style.image} source={props.image}></Image>
            </View>
            <View style={style.infoContainer}>
                <View style={style.cardHeader}>
                    <Text style={style.nameClient}>{props.client}</Text>
                    <Text style={style.date}>{props.date}</Text>
                </View>
                <Stars rate={props.rate} />
                <Text style={style.rateNote}>{props.rateNote}</Text>
                <FlatList
                    data={props.images}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    renderItem={({ item }) => renderImage(item)}
                />
            </View>
            <TouchableOpacity
                style={style.favoriteContainer}
                onPress={props.setFavoriteCallback}>
                {props.isProfessional ? getFavorite(props.favorite) : <></>}
            </TouchableOpacity>
        </View>
    )
}