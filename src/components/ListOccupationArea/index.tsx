import { View, Text, FlatList } from 'react-native'
import React from 'react'
import styles from './styles'
import CardProfession, { CardProfessionProps } from '../CardProfession';

const DATA: any[] = [
    {
        profession: 'Eletricista',
        image: require('../../assets/images/eletricista.jpg'),
    },
    {
        profession: 'Mecânico',
        image: require('../../assets/images/mecanico.jpg'),
    },
    {
        profession: 'Jardineiro',
        image: require('../../assets/images/jardineiro.jpg'),
    },
    {
        profession: 'Diarista',
        image: require('../../assets/images/diarista.jpg'),
    },
    {
        profession: 'Encanador',
        image: require('../../assets/images/encanador.jpg'),
    },
    {
        profession: 'Pintor',
        image: require('../../assets/images/pintor.jpg')
    }
]

const renderItem = ({ item }: { item: CardProfessionProps }, navigation: any) => {
    return (
        <CardProfession navigation={() => navigation.navigate('ProvidersList', { profession: item.profession })} profession={item.profession} image={item.image} ></CardProfession>
    );
};

type ListOccupationAreaProps = {
    navigation: () => any,
    occupationArea: string
};

export default function ListOccupationArea(props: ListOccupationAreaProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.titleServices}>{props.occupationArea}</Text>
            <View style={styles.listPage}>
                <FlatList style={styles.list}
                    data={DATA}
                    renderItem={({ item }) => { return renderItem({ item }, props.navigation) }}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                />
            </View>
        </View>
    )
}