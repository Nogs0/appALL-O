import React from 'react'
import { FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { backgroundDialogDefault, blackDefault, blueDefault, greyDefault, orangeDefault } from '../../shared/styleConsts'
import style from './style'
import StarsToRate from '../StarsToRate'

interface CustomDialogAvaliacaoProps {
    ok(): void,
    title: string,
    text: string,
    estrelasAgilidade: number,
    setEstrelasAgilidade(value: number): void,
    estrelasQualidade: number,
    setEstrelasQualidade(value: number): void,
    estrelasPreco: number,
    setEstrelasPreco(value: number): void,
    descricao: string,
    setDescricao(value: string): void,
    anexarImagem(): void,
    imagens: any[]
}

export default function TelaAvaliacao(props: CustomDialogAvaliacaoProps) {

    const renderImage = (item: any) => {
        return (
            <View>
                <Image style={{ width: 100, height: 100 }} source={{ uri: item.uri }}></Image>
            </View>
        )
    }


    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={true}>
            <View style={{backgroundColor: backgroundDialogDefault, alignItems: 'center', justifyContent: 'center' }}>
                <View style={style.contentContainer}>
                    <View style={style.titleContainer}>
                        <Text style={style.title}>AVALIAÇÃO DE SERVIÇO</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={style.message}>{props.text}</Text>
                    </View>
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: blackDefault, fontSize: 20, fontFamily: 'Rubik-SemiBold'}}>QUALIDADE</Text>
                        <StarsToRate estrelas={props.estrelasQualidade} setEstrelas={props.setEstrelasQualidade} />
                    </View>
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: blackDefault, fontSize: 20, fontFamily: 'Rubik-SemiBold'}}>AGILIDADE</Text>
                        <StarsToRate estrelas={props.estrelasAgilidade} setEstrelas={props.setEstrelasAgilidade} />
                    </View>
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: blackDefault, fontSize: 20, fontFamily: 'Rubik-SemiBold'}}>PREÇO</Text>
                        <StarsToRate estrelas={props.estrelasPreco} setEstrelas={props.setEstrelasPreco} />
                    </View>
                    <View style={style.descContainer}>
                        <TextInput placeholder={'Serviço muito bem feito, recomendo, ótimo profissional!'}
                            style={style.textArea}
                            value={props.descricao}
                            onChangeText={props.setDescricao}
                            multiline={true}
                            numberOfLines={6}
                            placeholderTextColor={greyDefault}
                            textAlignVertical='top' />
                    </View>
                    <View style={{ width: '100%', height: '20%' }}>
                        <FlatList
                            horizontal
                            data={props.imagens}
                            renderItem={({ item, index }) => renderImage(item)}
                        >

                        </FlatList>
                    </View>
                    <View style={{ width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                        <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={props.anexarImagem}>
                            <Text style={{ color: orangeDefault, fontSize: 14, fontFamily: 'Rubik-SemiBold' }}>
                                Deseja anexar alguma imagem?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttonsContainer}>
                        <TouchableOpacity onPress={props.ok} style={style.buttonOk}>
                            <Text style={style.textButtonOk}>FINALIZAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}