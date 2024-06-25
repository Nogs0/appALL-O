import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from './style'
import { useAPI } from '../../contexts/api';
import { showMessage } from 'react-native-flash-message';

interface CardHighlightProps {
    navigation: any,
    razaoSocial: string,
    nomeProfissao: string,
    id: number,
    imageId: string
}

export default function CardHighlight({ navigation, razaoSocial, nomeProfissao, id, imageId }: CardHighlightProps) {

    const { getImageProfessional } = useAPI();
    const [image, setImage] = useState<any>();

    useEffect(() => {
        getImageProfessional(imageId)
            .then((result) => {
                setImage(result)
            })
            .catch((e) => {
                showMessage({
                    message: 'Falha ao carregar imagem',
                    type: 'danger'
                })
            })
    }, [])

    return (
        <TouchableOpacity style={style.containerImage} onPress={() => {
            navigation.navigate('ProfessionalProfile', { id: id, profissao: nomeProfissao })
        }}>
            {image ? <Image style={style.imageProfessional} source={{uri: image}}></Image> : <></>}
            <Text style={style.nameProfissao}>{nomeProfissao}</Text>
            <Text style={style.nameProfessional}>{razaoSocial}</Text>
        </TouchableOpacity>
    )
}