import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, Text, View, VirtualizedList } from 'react-native'
import style from './style'
import HeaderProfessional from '../HeaderProfessional/indext'
import FilterReviews from '../FilterReviews';
import Stars from '../Stars';
import { ButtonFilterEnumReviews } from '../../shared/Enums/enums';

export default function ProfessionalReviews(props: any) {

    const [params, setParams] = useState<any>(props);
    const [reviews, setReviews] = useState<any>();

    const getReviews = (id: number) => {
        setReviews({
            professionalName: 'Marcio DME',
            revs: [
                {
                    client: 'Guilherme Customer',
                    rate: 3,
                    rateNote: 'aaaaaaaaaaaaaaaa',
                    date: '04/05/2024',
                    image: require('../../assets/images/encanador.jpg')
                },
                {
                    client: 'Andrew Customer',
                    rate: 5,
                    rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                    date: '09/05/2024',
                    image: require('../../assets/images/encanador.jpg')
                },
            ]
        }
        )
    }

    const [buttonSelected, setButtonSelected] = useState<ButtonFilterEnumReviews>(ButtonFilterEnumReviews.date);

    useEffect(() => {
        console.log(buttonSelected);
    }, [buttonSelected]);

    const renderItem = (item: any) => {
        return (
            <View style={style.cardReview}>
                <View style={style.imageContainer}>
                    <Image style={style.image} source={item.image}></Image>
                </View>
                <View style={style.infoContainer}>
                    <View style={style.cardHeader}>
                        <Text style={style.nameClient}>{item.client}</Text>
                        <Text style={style.date}>{item.date}</Text>
                    </View>
                    <Stars rate={item.rate} />
                    <Text style={style.rateNote}>{item.rateNote}</Text>
                </View>
            </View>
        )
    }

    useEffect(() => {
        getReviews(params.route.params.id);
    }, [params])

    return (
        <SafeAreaView style={style.container}>
            {reviews ? (
                <>
                    <HeaderProfessional title={'Reviews'} navigation={params?.navigation} />
                    <View style={style.contentContainer}>
                        <Text style={style.nameProfessional}>{reviews.professionalName}</Text>
                        <FilterReviews  onPress={(pressionado: any) => setButtonSelected(pressionado)} button={buttonSelected}/>
                        <FlatList
                            data={reviews.revs}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => renderItem(item)}
                        />
                    </View>
                </>
            ) : (<></>)}
        </SafeAreaView>
    )
}