import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export const Header =
    <SafeAreaView style={styles.container}>
        <View style={styles.menuContainer} >
            <TouchableOpacity>
                <Icon color='black' name='menu' size={30}></Icon>
            </TouchableOpacity>
        </View >
        <View style={styles.perfilContainer}>
            <Image style={styles.imgPerfil} source={require('../../assets/images/foto-de-perfil-homem.png')}></Image>
        </View>
    </SafeAreaView>