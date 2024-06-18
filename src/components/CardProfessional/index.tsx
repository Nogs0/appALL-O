import React, { useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { greyDefault, orangeDefault, yellowDefault } from '../../shared/styleConsts'
import styles from './styles'

export type CardProps = {
    id: number,
    name: string,
    rate: number,
    obs: string,
    priceAvg: number,
    image: any,
    favorite: boolean,
    navigation: any,
    timeDistance: number,
    numberRate: number,
    profissao: string
}

export default function CardProfessional({ props, profession }: any) {
    const [favorite, setFavorite] = useState<boolean>(props.favorite);
    const setFavoriteAndUpdate = (id: number, favorite: boolean) => {
        setFavorite(favorite);
        //onde sera feito o update
        console.log(`${id} atualizou Favorito -> `, favorite);
    }
    
    const getFavorite = (favorite: boolean) => {
        return favorite ? <Icon name='heart' size={20} color={orangeDefault}></Icon> :
            <Icon name='heart-outline' size={20} color={greyDefault}></Icon>;
    }

    const getRate = (rate: number) => {
        return <Icon name='star' color={yellowDefault}>{` ${rate?.toFixed(1).replace('.', ',')}`}</Icon>
    }

    const getPrice = (price: number) => {
        return `R$${price?.toFixed(2).replace('.', ',')}`
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.contentContainer} onPress={() => props.navigation.navigate('ProfessionalProfile', { id: props.id, profession: profession })}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={props.image}></Image>
                </View>
                <View style={styles.informationContainer}>
                    <Text style={styles.nameProfessional}>{props.name}</Text>
                    {getRate(props.rate)}
                    <Text style={styles.info}>{`${props.timeDistance}min - ${getPrice(props.priceAvg)}`}</Text>
                    <Text style={styles.infoObs}>{props.obs}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.favoriteContainer}
                onPress={() => setFavoriteAndUpdate(props.id, !favorite)}>
                {getFavorite(favorite)}
            </TouchableOpacity>
        </SafeAreaView>
    )
}