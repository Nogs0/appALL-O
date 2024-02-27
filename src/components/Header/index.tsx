import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export const Header =
    <SafeAreaView style={styles.container}>
        <View style={styles.menuContainer} >
            <TouchableOpacity>
                <Icon name='menu' size={40}></Icon>
            </TouchableOpacity>
        </View >
        <View style={styles.perfilContainer}>
            <Text style={styles.name}>Jorginho</Text>
            <Image style={styles.imgPerfil} source={require('../../assets/images/foto-de-perfil-homem.png')}></Image>
        </View>
    </SafeAreaView>