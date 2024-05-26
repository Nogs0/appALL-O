import React from 'react'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderClient from '../../../components/HeaderProfessional copy/indext'
import style from './style'

export default function ClientArea({ navigation }: any) {
    return (
        <SafeAreaView style={style.container}>
            <HeaderClient title={'Jorginho'} navigation={navigation} />
            <View style={style.contentContainer}>
                <View style={style.firstSection}>
                    <Image style={style.image} source={require('../../../assets/images/foto-de-perfil-homem.png')}></Image>
                </View>
                <View style={style.secondSection}>
                    <TextInput
                        style={style.input}
                        placeholder='Email'
                        value='joaoguinogueira04@gmail.com' />
                </View>
                <View style={style.thirdSection}>
                    <TouchableOpacity
                        style={style.trocarSenha}
                        onPress={() => console.log("Trocar senha")}>
                        <Text style={style.textTrocarSenha}>Trocar Senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}