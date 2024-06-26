import React from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { backgroundDialogDefault, blueDefault, greyDefault, orangeDefault } from '../../shared/styleConsts'
import style from './style'
import StarsToRate from '../StarsToRate'

interface CustomDialogAvaliacaoProps {
    ok(): void,
    title: string,
    text: string,
    estrelas: number,
    setEstrelas(value: number): void,
    descricao: string,
    setDescricao(value: string): void,
}

export default function CustomDialogAvaliacao(props: CustomDialogAvaliacaoProps) {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={true}>
            <View style={{ flex: 1, backgroundColor: backgroundDialogDefault, alignItems: 'center', justifyContent: 'center' }}>
                <View style={style.contentContainer}>
                    <View style={style.titleContainer}>
                        <Text style={style.title}>AVALIAÇÃO DE SERVIÇO</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={style.message}>{props.text}</Text>
                    </View>
                    <StarsToRate estrelas={props.estrelas} setEstrelas={props.setEstrelas} />
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