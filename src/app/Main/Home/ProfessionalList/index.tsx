import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import CardProfessional from '../../../../components/CardProfessional';
import FilterProfessions from '../../../../components/FilterProfessions';
import { ButtonFilterEnumProfessions } from '../../../../shared/Enums/enums';
import styles from './styles';
import HeaderProfessionalList from '../../../../components/HeaderProfessionalList/indext';
import { useNavigation } from '@react-navigation/native';
import { ProvedorListOutput, ProvedorOutput, useAPI } from '../../../../contexts/api';
import { showMessage } from 'react-native-flash-message';
import { orangeDefault } from '../../../../shared/styleConsts';

export default function ProfessionalList(props: any) {
  const { getAllProfessionalsByID, updateFavoriteProvider } = useAPI();
  const [params, setParams] = useState<any>(props.route.params)
  const navigation = useNavigation();
  const [profissionais, setProfissionais] = useState<ProvedorListOutput[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [buttonSelected, setButtonSelected] = useState<ButtonFilterEnumProfessions>(ButtonFilterEnumProfessions.nextToYou);

  useEffect(() => {
    console.log("FILTRO DEPOIS AAAAAAAAAAA")
  }, [buttonSelected]);

  useEffect(() => {
    if (params) {
      setLoading(true);
      getAllProfessionalsByID(params.id)
        .then((result) => {
          setProfissionais(result)
        }
        ).catch((e) => {
          showMessage({
            message: "Falha ao carregar profissionais.",
            type: "danger"
          });
        }).finally(() => {
          setLoading(false)
        })

    }
  }, [params])

  const handleFavoritarProfissional = (id: number) => {
    updateFavoriteProvider(id)
      .then((result) => {})
      .catch((e) => {
        showMessage({
          message: 'Falha ao favoritar profissional',
          type: 'danger'
        })
      })
  }

  const renderItem = (item: ProvedorListOutput) => {
    return (
      <CardProfessional
        profissao={params.profissao}
        navigation={navigation}
        razaoSocial={item.razaoSocial}
        favorito={item.favorito}
        imagem={item.imagemPerfil}
        mediaAvaliacao={item.mediaAvaliacao}
        id={item.idProvedor}
        obs={item.observacao}
        handleFavoritarProfissional={handleFavoritarProfissional}
      ></CardProfessional>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfessionalList profession={params.profissao.replace(/^\w/, (c: string) => c.toUpperCase())} navigation={navigation} />
      <FilterProfessions onPress={(pressionado: any) => setButtonSelected(pressionado)} button={buttonSelected} />
      {loading ? <ActivityIndicator size={70} color={orangeDefault} /> :
        <FlatList
          style={styles.listContainer}
          data={profissionais}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderItem(item)}
        />
      }
    </SafeAreaView>
  );
}