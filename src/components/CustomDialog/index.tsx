import { View, Text, TouchableOpacity, Modal, VirtualizedList } from 'react-native'
import React from 'react'
import { greyLoadingDefault, whiteDefault, blueDefault, blackDefault, orangeDefault, backgroundDialogDefault } from '../../shared/styleConsts'
import style from './style'

interface CustomDialogProps {
    cancel(): void,
    ok(): void,
    title: string,
    text: string,
    isProfessional?: boolean,
    visible: boolean
}

export default function CustomDialog(props: CustomDialogProps) {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.visible}>
            <View style={{flex: 1, backgroundColor: backgroundDialogDefault, alignItems: 'center', justifyContent: 'center'}}>
                <View style={style.contentContainer}>
                    <View style={style.titleContainer}>
                        <Text style={[style.title, { color: props.isProfessional ? blueDefault : orangeDefault }]}>{props.title}</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={style.message}>{props.text}</Text>
                    </View>
                    <View style={style.buttonsContainer}>
                        <TouchableOpacity onPress={props.cancel} style={style.buttonCancel}>
                            <Text style={[style.textButtonCancel, { color: props.isProfessional ? blueDefault : orangeDefault }]}>NÃO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.ok} style={style.buttonOk}>
                            <Text style={[style.textButtonOk, { color: props.isProfessional ? orangeDefault : blueDefault }]}>SIM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}