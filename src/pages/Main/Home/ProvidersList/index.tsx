import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CardProvider, { CardProps } from '../../../../components/CardProvider';
import styles from './styles';
import Filter from '../../../../components/Filter';

const DATA: any[] = [
    {
        image: require('../../../../assets/images/foto-prestador-homem.png'),
        name: 'Jim',
        timeDistance: 10,
        status: false,
        availableHours: '10:00AM until 05:00PM',
        availableDays: 'Monday to Friday',
        phoneNumber: '(35) 99999-9999',
        profession: 'Eletricista'
    },
    {
        image: require('../../../../assets/images/foto-prestador-homem.png'),
        name: 'Kim', timeDistance: 10,
        status: true,
        availableHours: '10:00AM until 05:00PM',
        availableDays: 'Monday to Friday',
        phoneNumber: '(35) 99999-9999',
        profession: 'Eletricista'
    },
    {
        image: require('../../../../assets/images/foto-prestador-homem.png'),
        name: 'Mim',
        timeDistance: 10,
        status: false,
        availableHours: '10:00AM until 05:00PM',
        availableDays: 'Monday to Friday',
        phoneNumber: '(35) 99999-9999',
        profession: 'Eletricista'
    },
    {
        image: require('../../../../assets/images/foto-prestador-homem.png'),
        name: 'Jim',
        timeDistance: 10,
        status: false,
        availableHours: '10:00AM until 05:00PM',
        availableDays: 'Monday to Friday',
        phoneNumber: '(35) 99999-9999',
        profession: 'Eletricista'
    },
    {
        image: require('../../../../assets/images/foto-prestador-homem.png'),
        name: 'Kim', timeDistance: 10,
        status: true,
        availableHours: '10:00AM until 05:00PM',
        availableDays: 'Monday to Friday',
        phoneNumber: '(35) 99999-9999',
        profession: 'Eletricista'
    },
    {
        image: require('../../../../assets/images/foto-prestador-homem.png'),
        name: 'Mim',
        timeDistance: 10,
        status: false,
        availableHours: '10:00AM until 05:00PM',
        availableDays: 'Monday to Friday',
        phoneNumber: '(35) 99999-9999',
        profession: 'Eletricista'
    },
    {
        image: require('../../../../assets/images/foto-prestador-homem.png'),
        name: 'Jim',
        timeDistance: 10,
        status: false,
        availableHours: '10:00AM until 05:00PM',
        availableDays: 'Monday to Friday',
        phoneNumber: '(35) 99999-9999',
        profession: 'Eletricista'
    },
    {
        image: require('../../../../assets/images/foto-prestador-homem.png'),
        name: 'Kim', timeDistance: 10,
        status: true,
        availableHours: '10:00AM until 05:00PM',
        availableDays: 'Monday to Friday',
        phoneNumber: '(35) 99999-9999',
        profession: 'Eletricista'
    },
    {
        image: require('../../../../assets/images/foto-prestador-homem.png'),
        name: 'Mim',
        timeDistance: 10,
        status: false,
        availableHours: '10:00AM until 05:00PM',
        availableDays: 'Monday to Friday',
        phoneNumber: '(35) 99999-9999',
        profession: 'Eletricista'
    },
    {
        image: require('../../../../assets/images/foto-prestador-homem.png'),
        name: 'Jim',
        timeDistance: 10,
        status: false,
        availableHours: '10:00AM until 05:00PM',
        availableDays: 'Monday to Friday',
        phoneNumber: '(35) 99999-9999',
        profession: 'Eletricista'
    },
    {
        image: require('../../../../assets/images/foto-prestador-homem.png'),
        name: 'Kim', timeDistance: 10,
        status: true,
        availableHours: '10:00AM until 05:00PM',
        availableDays: 'Monday to Friday',
        phoneNumber: '(35) 99999-9999',
        profession: 'Eletricista'
    },
    {
        image: require('../../../../assets/images/foto-prestador-homem.png'),
        name: 'Mim',
        timeDistance: 10,
        status: false,
        availableHours: '10:00AM until 05:00PM',
        availableDays: 'Monday to Friday',
        phoneNumber: '(35) 99999-9999',
        profession: 'Eletricista'
    }
]

const renderItem = ({ item }: { item: CardProps }, navigation: any) => {
    return (
        <CardProvider
            phoneNumber={item.phoneNumber}
            availableDays={item.availableDays}
            availableHours={item.availableHours}
            status={item.status}
            timeDistance={item.timeDistance}
            image={item.image}
            name={item.name}
            profession={item.profession}
            navigation={navigation} />
    );
};

export default function ProvidersList({ route, navigation }: any) {
    const { profession } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <Filter navigation={() => navigation.pop()} profession={profession} />
            <View style={styles.listPage}>
                <FlatList style={styles.list}
                    data={DATA}
                    renderItem={({item}) => renderItem({item}, navigation)}
                    keyExtractor={(item, index) => index.toString()}/>
            </View>
        </SafeAreaView>
    );
}