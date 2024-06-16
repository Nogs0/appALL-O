import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Modal, SafeAreaView, Text, Touchable, TouchableOpacity, View, VirtualizedList } from 'react-native'
import style from './style'
import HeaderProfessional from '../../../../../../components/HeaderProfessional'
import FilterReviews from '../../../../../../components/FilterReviews';
import Stars from '../../../../../../components/Stars';
import { ButtonFilterEnumReviews } from '../../../../../../shared/Enums/enums';
import { blueDefault, whiteDefault } from '../../../../../../shared/styleConsts';
import CardReview from '../../../../../../components/CardReview';
import { useAPI } from '../../../../../../contexts/api';
import { showMessage } from 'react-native-flash-message';

export default function ProfessionalReviews(props: any) {

    const { updateFavoriteReview, getReviewsByProfessional } = useAPI();

    const [params, setParams] = useState<any>(props.route?.params);
    const [reviews, setReviews] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const [buttonSelected, setButtonSelected] = useState<ButtonFilterEnumReviews>(ButtonFilterEnumReviews.date);

    useEffect(() => {
        console.log(buttonSelected);
    }, [buttonSelected]);

    const renderItem = (review: any) => {
        return (<CardReview
            id={review.id}
            image={review.image}
            client={review.client}
            rate={review.rate}
            rateNote={review.rateNote}
            images={review.images}
            date={review.date}
            favorite={review.favorite}
            setFavoriteCallback={() => handleUpdateFavoriteReview(review.id)} />)
    }

    const handleUpdateFavoriteReview = (id: number) => {
        setLoading(true)
        updateFavoriteReview(id)
            .then((response) => {
                showMessage({
                    message: 'Atualização favorita atualizada com sucesso!',
                    type: 'success'
                })
                getReviews(id);
            })
            .catch((e) => {
                showMessage({
                    message: 'Erro ao atualizar avaliação favorita!',
                    type: 'danger'
                })
            })
            .finally(() => setLoading(false));
    }

    const getReviews = (id: number) => {
        setLoading(true);
        getReviewsByProfessional(id)
            .then((response) => {
                setReviews(response);
            })
            .catch((error) => {
                showMessage({
                    message: 'Erro ao carregar avaliações!',
                    type: 'danger'
                })
            }).finally(() => setLoading(false));
    }

    useEffect(() => {
        getReviews(params.id);
    }, [params])

    return (
        <SafeAreaView style={[style.container, { backgroundColor: params?.defaultColor }]}>
            {!loading && reviews ? (
                <>
                    <HeaderProfessional title={'Reviews'} navigation={props?.navigation}
                        defaultColor={params?.defaultColor} />
                    <View style={style.contentContainer}>
                        <Text style={[style.nameProfessional, { color: params?.defaultColor }]}>{reviews.professionalName}</Text>
                        <FilterReviews onPress={(pressionado: any) => setButtonSelected(pressionado)} button={buttonSelected} defaultColor={params?.defaultColor} />
                        <FlatList
                            style={style.listContainer}
                            data={reviews.revs}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => renderItem(item)}
                        />
                    </View>
                </>
            ) : (<ActivityIndicator size={70} color={whiteDefault} />)}
        </SafeAreaView>
    )
}