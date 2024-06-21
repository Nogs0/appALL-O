import React, { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, View } from 'react-native';
import MostAccessed from '../../../components/MostAccessed';
import Highlights from '../../../components/Highlights';
import OtherProfessions from '../../../components/OtherProfessions';
import { whiteDefault } from '../../../shared/styleConsts';
import SearchForAProfession from '../../../components/SearchForAProfessional';
import { ProfissaoOutput, useAPI } from '../../../contexts/api';
import CardProfession from '../../../components/CardProfession';
import { showMessage } from 'react-native-flash-message';


export default function Home({ navigation }: any) {

  const { getProfessionsBySearch, getAllProfessionalsByID } = useAPI();

  const [search, setSearch] = useState<string>('');
  const [profissoes, setProfissoes] = useState<ProfissaoOutput[]>([]);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.length > 0) {
      getProfessionsBySearch(value)
        .then((result) => {
          setProfissoes((prev) => {
            return [...result]
          });
        })
        .catch((e) => {
          showMessage({
            message: 'Falha ao buscar profissões',
            type: 'danger'
          })
        })
    }
  }

  const renderItem = (item: ProfissaoOutput) => {
    return (
      <CardProfession
        profession={item.nome.replace(/^\w/, (c) => c.toUpperCase())}
        professionId={item.id}
        onPress={() => {
          navigation.navigate('ProfessionalList', { profissao: item.nome, id: item.id})}}
        professionIcon={item.nomeIcone} />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: whiteDefault, paddingTop: 10 }}>
      <SearchForAProfession search={search} onChangeSearch={handleSearch} />
      {search.length > 0 ?
        <View style={{ alignItems: 'center', width: '100%' }}>
          <FlatList
            style={{ width: '90%' }}
            numColumns={3}
            data={profissoes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
        :
        <>
          <ScrollView style={{ flex: 0.8 }}>
            <MostAccessed />
            <Highlights />
            <OtherProfessions navigation={navigation.navigation} />
          </ScrollView>
        </>
      }
    </SafeAreaView>
  )
}