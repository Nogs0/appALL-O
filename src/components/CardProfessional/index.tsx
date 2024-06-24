import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { greyDefault, orangeDefault, yellowDefault } from '../../shared/styleConsts'
import styles from './styles'
import { ProvedorListOutput, useAPI } from '../../contexts/api'
import { showMessage } from 'react-native-flash-message'


export default function CardProfessional(props: any) {

    const { getImageProfessional } = useAPI();
    const [image, setImage] = useState<any>();

    useEffect(() => {
        if (props.imagem) {
            getImageProfessional(props.imagem)
                .then((result) => {
                    setImage(result)
                })
                .catch((e) => {
                    showMessage({
                        message: 'Falha ao carregar iamgem do profissional!',
                        type: 'danger'
                    })
                })
        }
    }, [])

    const [favorite, setFavorite] = useState<boolean>(props.favorito);
    const setFavoriteAndUpdate = (id: number, favorite: boolean) => {
        setFavorite(favorite);
        props.handleFavoritarProfissional(id);
    }

    const getFavorite = (favorite: boolean) => {
        return favorite ? <Icon name='heart' size={20} color={orangeDefault}></Icon> :
            <Icon name='heart-outline' size={20} color={greyDefault}></Icon>;
    }

    const getRate = (rate: number) => {
        return <Icon name='star' color={yellowDefault} size={15}>{` ${rate?.toFixed(1).replace('.', ',')}`}</Icon>
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.contentContainer} onPress={() => { props.navigation.navigate('ProfessionalProfile', { id: props.id, profissao: props.profissao }) }}>
                <View style={styles.imageContainer}>
                    {image ?
                        <Image style={styles.image} source={{ uri: image }}></Image>
                        :
                        <Image style={styles.image} source={require('../../assets/images/default-profile-pic.png')}></Image>
                    }
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