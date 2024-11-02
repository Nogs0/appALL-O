import React from 'react'
import { FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { backgroundDialogDefault, blackDefault, blueDefault, greyDefault, orangeDefault, whiteDefault } from '../../shared/styleConsts'
import style from './style'
import StarsToRate from '../StarsToRate'
import { useAPI } from '../../contexts/api'
import ImagemAvaliacao from '../ImagemAvaliacao'
import { useAuth } from '../../contexts/auth'

interface CustomDialogAvaliacaoProps {
    ok(): void,
    title: string,
    text: string,
    estrelasAgilidade: number,
    setEstrelasAgilidade: (value: number) => void | null,
    estrelasQualidade: number,
    setEstrelasQualidade: (value: number) => void,
    estrelasPreco: number,
    setEstrelasPreco: (value: number) => void | null,
    descricao: string,
    setDescricao: (value: string) => void | null,
    anexarImagem(): void | null,
    imagens: any[],
    isView: boolean
}

export default function TelaAvaliacao(props: CustomDialogAvaliacaoProps) {

    const { isProfessional } = useAuth();

    const renderImage = (item: any) => {
        return (
            <ImagemAvaliacao
                item={item}
            />
        )
    }

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={true}>
            <View style={{ backgroundColor: whiteDefault, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <View style={style.contentContainer}>
                    <View style={style.titleContainer}>
                        <Text style={[style.title, {color: isProfessional ? blueDefault : orangeDefault}]}>AVALIAÇÃO DE SERVIÇO</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={style.message}>{props.text}</Text>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: blackDefault, fontSize: 14, fontFamily: 'Rubik-SemiBold' }}>QUALIDADE</Text>
                        <StarsToRate estrelas={props.estrelasQualidade} setEstrelas={props.setEstrelasQualidade} />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: blackDefault, fontSize: 14, fontFamily: 'Rubik-SemiBold' }}>AGILIDADE</Text>
                        <StarsToRate estrelas={props.estrelasAgilidade} setEstrelas={props.setEstrelasAgilidade} />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: blackDefault, fontSize: 14, fontFamily: 'Rubik-SemiBold' }}>PREÇO</Text>
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
                            textAlignVertical='top'
                            editable={!props.isView} />
                    </View>
                    <View style={{ width: '100%', height: '20%' }}>
                        <FlatList
                            horizontal
                            data={props.imagens}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => renderImage(item)}
                        >

                        </FlatList>
                    </View>
                    <View style={{ width: '100%', justifyContent: 'center', alignContent: 'center' }}>
                        <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={props.anexarImagem}>
                            {
                                !props.isView &&
                                <Text style={{ color: orangeDefault, fontSize: 14, fontFamily: 'Rubik-SemiBold' }}>
                                    Deseja anexar alguma imagem?
                                </Text>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttonsContainer}>
                        <TouchableOpacity onPress={props.ok} style={style.buttonOk}>
                            <Text style={[style.textButtonOk, {color: isProfessional ? blueDefault : orangeDefault}]}>{props.isView ? 'FECHAR' : 'FINALIZAR'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
