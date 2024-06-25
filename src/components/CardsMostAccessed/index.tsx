import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardProfession from '../CardProfession'
import style from './style'
import { useAPI, ProfissaoOutput } from '../../contexts/api';
import { orangeDefault } from '../../shared/styleConsts';

export default function CardsMostAccessed(props: any) {

    const { getProfissoesMaisUtilizadas } = useAPI();
    const [profissoes, setProfissoes] = useState<ProfissaoOutput[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getProfissoesMaisUtilizadas()
            .then((result) => {
                if (result.length < 6)
                    setProfissoes([
                        {
                            id: 34,
                            nome: "Nutricionista",
                            nomeIcone: "food-apple-outline"
                        },
                        {
                            id: 35,
                            nome: "Padeiro",
                            nomeIcone: "bread-slice"
                        },
                        {
                            id: 37,
                            nome: "Personal Trainer",
                            nomeIcone: "jump-rope"
                        },
                        {
                            id: 41,
                            nome: "Secretária",
                            nomeIcone: "account-tie"
                        },
                        {
                            id: 42,
                            nome: "Social Media",
                            nomeIcone: "instagram"
                        },
                        {
                            id: 43,
                            nome: "Soldador",
                            nomeIcone: "fire"
                        }
                    ])
                else
                    setProfissoes(result)

                console.log(result)
            })
            .catch((e) => {
                setProfissoes([
                    {
                        id: 34,
                        nome: "Nutricionista",
                        nomeIcone: "food-apple-outline"
                    },
                    {
                        id: 35,
                        nome: "Padeiro",
                        nomeIcone: "bread-slice"
                    },
                    {
                        id: 37,
                        nome: "Personal Trainer",
                        nomeIcone: "jump-rope"
                    },
                    {
                        id: 41,
                        nome: "Secretária",
                        nomeIcone: "account-tie"
                    },
                    {
                        id: 42,
                        nome: "Social Media",
                        nomeIcone: "instagram"
                    },
                    {
                        id: 43,
                        nome: "Soldador",
                        nomeIcone: "fire"
                    }
                ])
            }).finally(() => setLoading(false))
    }, [])

    const goToListProfession = (item: ProfissaoOutput) => {
        props.navigation.navigate("ProfessionalList", { profissao: item.nome, id: item.id })
    }

    return (
        !loading ?
            <SafeAreaView style={style.container}>
                <View style={style.row}>
                    <CardProfession
                        profession={profissoes[0].nome}
                        onPress={() => goToListProfession(profissoes[0])}
                        professionIcon={profissoes[0].nomeIcone}
                        professionId={profissoes[0].id} />
                    <CardProfession
                        profession={profissoes[1].nome}
                        onPress={() => goToListProfession(profissoes[1])}
                        professionIcon={profissoes[1].nomeIcone}
                        professionId={profissoes[1].id} />
                    <CardProfession profession={profissoes[2].nome}
                        onPress={() => goToListProfession(profissoes[2])}
                        professionIcon={profissoes[2].nomeIcone}
                        professionId={profissoes[2].id} />
                </View>
                <View style={style.row}>
                    <CardProfession
                        profession={profissoes[3].nome}
                        onPress={() => goToListProfession(profissoes[3])}
                        professionIcon={profissoes[3].nomeIcone}
                        professionId={profissoes[3].id} />
                    <CardProfession
                        profession={profissoes[4].nome}
                        onPress={() => goToListProfession(profissoes[4])}
                        professionIcon={profissoes[4].nomeIcone}
                        professionId={profissoes[4].id} />
                    <CardProfession
                        profession={profissoes[5].nome}
                        onPress={() => goToListProfession(profissoes[5])}
                        professionIcon={profissoes[5].nomeIcone}
                        professionId={profissoes[5].id} />
                </View>
            </SafeAreaView>
            :
            <ActivityIndicator size={40} color={orangeDefault} />
    )
}