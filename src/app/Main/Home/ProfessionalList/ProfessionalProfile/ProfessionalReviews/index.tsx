import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import CardReview from '../../../../../../components/CardReview';
import FilterReviews from '../../../../../../components/FilterReviews';
import HeaderProfessional from '../../../../../../components/HeaderProfessional';
import { AvaliacaoOutput, ServicoOutput, useAPI } from '../../../../../../contexts/api';
import { ButtonFilterEnumReviews } from '../../../../../../shared/Enums/enums';
import { whiteDefault } from '../../../../../../shared/styleConsts';
import style from './style';
import { useAuth } from '../../../../../../contexts/auth';

export default function ProfessionalReviews(props: any) {

    const { isProfessional } = useAuth();
    const { updateFavoriteReview, getReviewsByProfessional } = useAPI();

    const [params, setParams] = useState<any>(props.route?.params);
    const [reviews, setReviews] = useState<ServicoOutput[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [avaliacaoFavorita, setAvaliacaoFavorita] = useState<number>()

    const [buttonSelected, setButtonSelected] = useState<ButtonFilterEnumReviews>(ButtonFilterEnumReviews.date);

    useEffect(() => {
        console.log(buttonSelected);
    }, [buttonSelected]);

    const renderItem = (review: ServicoOutput) => {
        return (<CardReview
            id={review.id}
            client={review.cliente.nome}
            rate={review.avaliacao?.nota}
            rateNote={review.avaliacao?.descricao}
            favorite={review.avaliacao?.id == avaliacaoFavorita}
            isProfessional={isProfessional}
            setFavoriteCallback={() => handleUpdateFavoriteReview(review.avaliacao?.id)} />)
    }

    const handleUpdateFavoriteReview = (id: number) => {
        setLoading(true)
        setAvaliacaoFavorita(id);
        updateFavoriteReview(id)
            .then((response) => {
                showMessage({
                    message: 'Atualização favorita atualizada com sucesso!',
                    type: 'success'
                })
                getReviews(params.id);
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
        if (params.id){
            setAvaliacaoFavorita(params.avaliacaoFavorita);
            getReviews(params.id);
        }
    }, [params])

    return (
        <SafeAreaView style={[style.container, { backgroundColor: params?.defaultColor }]}>
            {!loading && reviews ? (
                <>
                    <HeaderProfessional title={'Reviews'} navigation={props?.navigation}
                        defaultColor={params?.defaultColor} />
                    <View style={style.contentContainer}>
                        <Text style={[style.nameProfessional, { color: params?.defaultColor }]}>{params.nomeProfissional}</Text>
                        <FlatList
                            style={style.listContainer}
                            data={reviews}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => renderItem(item)}
                        />
                    </View>
                </>
            ) : (<ActivityIndicator size={70} color={whiteDefault} />)}
        </SafeAreaView>
    )
}