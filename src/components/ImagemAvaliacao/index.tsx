import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAPI } from '../../contexts/api'
import { showMessage } from 'react-native-flash-message'
import { blueDefault } from '../../shared/styleConsts'
import style from './style'

interface ImagemAvaliacaoProps {
    loadingUpdate?: boolean,
    item: any,
    removeImage?: (image: string) => void
}

export default function ImagemAvaliacao(props: ImagemAvaliacaoProps) {

    const { getImageAvaliacao } = useAPI();
    const [image, setImage] = useState<any>();

    useEffect(() => {
        getImageAvaliacao(props.item)
        .then((result) => {
            setImage(result)
        })
        .catch((e) => {
            showMessage({
                message: 'Falha ao caregar imagem: ' + props.item,
                type: 'danger'
            })
        })
    }, [])

    return (
        image ?
            <TouchableOpacity
                disabled={props.loadingUpdate || !props.removeImage} style={style.imageContainerFlatList}
                onLongPress={() => { props.removeImage ? props.removeImage(props.item) : console.log('Apertou')}}>
                <Image style={style.imageFlatList} source={{ uri: image }}></Image>
            </TouchableOpacity>
            :
            <ActivityIndicator style={{flexGrow: 1, width: 130, height: 130}} size={20} color={blueDefault} />
    )
}