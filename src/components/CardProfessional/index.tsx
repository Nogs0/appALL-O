import React, { useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { greyDefault, orangeDefault, yellowDefault } from '../../shared/styleConsts'
import styles from './styles'
import { Endereco, ProfissaoOutput, ProvedorOutput } from '../../contexts/api'
import { TipoPessoaEnum } from '../../shared/Enums/enums'


export default function CardProfessional(props: any){
    const [favorite, setFavorite] = useState<boolean>(props.favorito);
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
            <TouchableOpacity style={styles.contentContainer} onPress={() => {props.navigation.navigate('ProfessionalProfile', { id: props.id, profissao: props.profissao })}}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../../assets/images/jardineiro.jpg')}></Image>
                </View>
                <View style={styles.informationContainer}>
                    <Text style={styles.nameProfessional}>{props.razaoSocial}</Text>
                    {getRate(props.mediaAvaliacao)}
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