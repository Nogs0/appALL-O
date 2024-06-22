import React, { useState } from 'react'
import { FlatList, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { launchImageLibrary } from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import StarsToRate from '../../../../components/StarsToRate'
import { AvaliacaoInput, useAPI } from '../../../../contexts/api'
import { greyDefault, whiteDefault } from '../../../../shared/styleConsts'
import style from './style'

export default function AvaliacaoServico({ navigation, idServico }: any) {

    const { createAvaliacao } = useAPI();

    const [descricao, setDescricao] = useState<string>();
    const [imagensAvaliacao, setImagensAvalicao] = useState<any[]>([]);
    const [nota, setNota] = useState<number>(0);

    const addImagem = () => {
        if (imagensAvaliacao.length >= 4)
            showMessage({
                message: 'Você pode adicionar no máximo 4 fotos!',
                type: 'warning'
            })
        else {
            launchImageLibrary({ mediaType: 'photo' }, (response) => {
                setImagensAvalicao((prev) => {
                    if (response.assets && response.assets[0] && response.assets[0].uri && response.assets[0].fileName)
                        prev.push({ uri: response.assets[0].uri, filName: response.assets[0].fileName })
                    return [...prev]
                })
            })
        }
    }

    const removeImagem = (fileName: string) => {
        let index = imagensAvaliacao.findIndex(x => x.fileName == fileName)
        if (index != -1) {
            setImagensAvalicao((prev) => {
                prev.splice(index, 1)
                return [...prev]
            })
        }
    }

    const handleButtonEnd = () => [
        createAvaliacao({idServico, descricao, nota, imagens: imagensAvaliacao} as AvaliacaoInput)
        .then(() => {
            navigation.goBack();
            showMessage({
                message: 'Obrigado pelo seu feedback!',
                type: 'success'
            })
        })
        .catch((e) => {
            showMessage({
                message: 'Falha ao criar avaliação',
                type: 'danger'
            })
        })
    ]

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity onLongPress={() => removeImagem(item.fileName)}>
                <Image source={{ uri: item.uri }} style={{ width: 120, height: 120, marginHorizontal: 10 }}></Image>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.headerContainer}>
                <TouchableOpacity style={style.goBack} onPress={() => navigation.goBack()}>
                    <Icon size={35} name={'chevron-left'} color={whiteDefault}></Icon>
                </TouchableOpacity>
                <Text style={style.title}>Avaliação de Serviço</Text>
            </View>
            <View style={style.contentContainer}>
                <KeyboardAvoidingView style={{
                    width: '100%',
                    height: '82%',
                    position: 'absolute',
                    bottom: 70,
                }}>
                    <ScrollView>
                        <View style={style.imageContainer}>
                            <Image source={require('../../../../assets/images/eletricista.jpg')} style={{ width: 150, height: 150, borderRadius: 50 }}></Image>
                        </View>
                        <View style={style.starsContainer}>
                            <StarsToRate estrelas={nota} setEstrelas={setNota}/>
                        </View>
                        <View style={style.descContainer}>
                            <TextInput placeholder={'Serviço muito bem feito, recomendo, ótimo profissional!'}
                                style={style.textArea}
                                value={descricao}
                                onChangeText={setDescricao}
                                multiline={true}
                                numberOfLines={6}
                                placeholderTextColor={greyDefault}
                                textAlignVertical='top' />
                        </View>
                        <View style={{ height: 230, justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={style.imagesContainer}>
                                {
                                    imagensAvaliacao.length == 0 ?
                                        <Text style={{ color: greyDefault, fontFamily: 'Rubik-Light' }}>As imagens selecionadas serão mostradas aqui!</Text>
                                        :
                                        <FlatList
                                            horizontal
                                            data={imagensAvaliacao}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) => renderItem(item)} />
                                }
                            </View>
                            <Text style={{ marginVertical: '2%', color: greyDefault, fontSize: 14, fontFamily: 'Rubik-Light' }}>Para remover uma imagem pressione-a por 2 segundos</Text>
                            <TouchableOpacity style={style.buttonAddImage} onPress={() => addImagem()}>
                                <Icon name={'image-plus'} size={30} color={whiteDefault}></Icon>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <TouchableOpacity style={style.button} onPress={() => handleButtonEnd()}>
                    <Text style={{ color: whiteDefault, fontSize: 24, fontFamily: 'Rubik-SemiBold' }}>Finalizar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}