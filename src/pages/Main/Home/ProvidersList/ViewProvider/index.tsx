import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import StarsRating from '../../../../../components/StarsRating';
import HeaderViewProvider from '../../../../../components/HeaderViewProvider';

const DATA: any = {
    name: 'Kim',
    status: true,
    profession: 'Eletricista'
} 

export default function ViewProvider() {
    const [buttonSelected, setButtonSelected] = useState(1);

    useEffect(() => {
      console.log(buttonSelected);
      //Aqui ficará a requisição com o filtro já setado
    }, [buttonSelected]);

    return (
        <View style={styles.container}>
            <HeaderViewProvider onPress={setButtonSelected} button={buttonSelected}/>
            <View style={styles.headerContainer}>
                <Image style={styles.imageHeader} source={require('../../../../../assets/images/foto-prestador-homem.png')}></Image>
                <Text style={styles.nameText}>{`${DATA.status ? '🟢': '🔴'} ${DATA.name}`}</Text>
                <Text style={styles.professionText}>{DATA.profession}</Text>
            </View>
            <View style={styles.infoContainer}>
                <StarsRating />
            </View>
            <View style={styles.imagesContainer}>

            </View>
        </View>
    )
}