import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Modal, SafeAreaView, Text, Touchable, TouchableOpacity, View, VirtualizedList } from 'react-native'
import style from './style'
import HeaderProfessional from '../../../../../../components/HeaderProfessional'
import FilterReviews from '../../../../../../components/FilterReviews';
import Stars from '../../../../../../components/Stars';
import { ButtonFilterEnumReviews } from '../../../../../../shared/Enums/enums';
import { whiteDefault } from '../../../../../../shared/styleConsts';

export default function ProfessionalReviews(props: any) {

    const [params, setParams] = useState<any>(props.route?.params);
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
                    image: require('../../../../../../assets/images/encanador.jpg'),
                    images: [
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg')
                    ]
                },
                {
                    client: 'Andrew Customer',
                    rate: 5,
                    rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                    date: '09/05/2024',
                    image: require('../../../../../../assets/images/encanador.jpg'),
                    images: [
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg')
                    ]
                },
                {
                    client: 'Andrew Customer',
                    rate: 5,
                    rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                    date: '09/05/2024',
                    image: require('../../../../../../assets/images/encanador.jpg'),
                    images: [
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg')
                    ]
                },
                {
                    client: 'Andrew Customer',
                    rate: 5,
                    rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                    date: '09/05/2024',
                    image: require('../../../../../../assets/images/encanador.jpg'),
                    images: [
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg')
                    ]
                },
                {
                    client: 'Andrew Customer',
                    rate: 5,
                    rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                    date: '09/05/2024',
                    image: require('../../../../../../assets/images/encanador.jpg'),
                    images: [
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg'),
                        require('../../../../../../assets/images/eletricista.jpg')
                    ]
                },
                {
                    client: 'Andrew Customer',
                    rate: 5,
                    rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                    date: '09/05/2024',
                    image: require('../../../../../../assets/images/encanador.jpg'),
                    images: [
                        require('../../../../../../assets/images/encanador.jpg'),
                        require('../../../../../../assets/images/encanador.jpg'),
                        require('../../../../../../assets/images/encanador.jpg'),
                        require('../../../../../../assets/images/encanador.jpg')
                    ]
                },
                {
                    client: 'Andrew Customer',
                    rate: 5,
                    rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                    date: '09/05/2024',
                    image: require('../../../../../../assets/images/encanador.jpg'),
                    images: [
                        require('../../../../../../assets/images/encanador.jpg'),
                        require('../../../../../../assets/images/encanador.jpg'),
                        require('../../../../../../assets/images/encanador.jpg'),
                        require('../../../../../../assets/images/encanador.jpg')
                    ]
                },
            ]
        }
        )
    }

    const [buttonSelected, setButtonSelected] = useState<ButtonFilterEnumReviews>(ButtonFilterEnumReviews.date);

    useEffect(() => {
        console.log(buttonSelected);
    }, [buttonSelected]);

    const renderImage = (image: any) => {
        return (
            <TouchableOpacity onPress={() => console.log('pressionou a imagem')}>
                <Image style={style.imageReview} source={image}></Image>
            </TouchableOpacity>
        )
    }

    const renderItem = (review: any) => {
        return (
            <View style={style.cardReview}>
                <View style={style.imageContainer}>
                    <Image style={style.image} source={review.image}></Image>
                </View>
                <View style={style.infoContainer}>
                    <View style={style.cardHeader}>
                        <Text style={style.nameClient}>{review.client}</Text>
                        <Text style={style.date}>{review.date}</Text>
                    </View>
                    <Stars rate={review.rate} />
                    <Text style={style.rateNote}>{review.rateNote}</Text>
                    <FlatList
                        data={review.images}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        renderItem={({ item }) => renderImage(item)}
                    />
                </View>
            </View>
        )
    }

    useEffect(() => {
        console.log(params)
        getReviews(params.id);
    }, [params])

    return (
        <SafeAreaView style={[style.container, {backgroundColor: params?.defaultColor}]}>
            {reviews ? (
                <>
                    <HeaderProfessional title={'Reviews'} navigation={props?.navigation} 
                    defaultColor={params?.defaultColor}/>
                    <View style={style.contentContainer}>
                        <Text style={[style.nameProfessional, {color: params?.defaultColor}]}>{reviews.professionalName}</Text>
                        <FilterReviews onPress={(pressionado: any) => setButtonSelected(pressionado)} button={buttonSelected} defaultColor={params?.defaultColor}/>
                        <FlatList
                            style={style.listContainer}
                            data={reviews.revs}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => renderItem(item)}
                        />
                    </View>
                </>
            ) : (<ActivityIndicator size={"large"} color={whiteDefault}></ActivityIndicator>)}
        </SafeAreaView>
    )
}