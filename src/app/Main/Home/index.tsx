import React, { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, View } from 'react-native';
import MostAccessed from '../../../components/MostAccessed';
import Highlights from '../../../components/Highlights';
import OtherProfessions from '../../../components/OtherProfessions';
import { blackDefault, blueDefault, greyLoadingDefault2, orangeDefault, whiteDefault } from '../../../shared/styleConsts';
import SearchForAProfession from '../../../components/SearchForAProfessional';
import { ProfissaoOutput, ServicoParaAvaliarOutput, useAPI } from '../../../contexts/api';
import CardProfession from '../../../components/CardProfession';
import { showMessage } from 'react-native-flash-message';
import CustomDialog from '../../../components/CustomDialog';
import { useAuth } from '../../../contexts/auth';


export default function Home({ navigation }: any) {

  const { getProfessionsBySearch, getAllProfessionalsByID, getServicosParaAvaliarCliente } = useAPI();

  const { user } = useAuth();

  const [search, setSearch] = useState<string>('');
  const [profissoes, setProfissoes] = useState<ProfissaoOutput[]>([]);

  const [servicoAtual, setServicoAtual] = useState<number>(0);
  const [servicosParaAvaliar, setServicosParaAvaliar] = useState<ServicoParaAvaliarOutput[]>([])

  useEffect(() => {
    if (user)
      getServicosParaAvaliarCliente(user?.id)
        .then((result) => {
          setServicosParaAvaliar(result)
        })
        .catch((e) =>{
          showMessage({
            message: 'Falha ao carregar serviços para avaliar',
            type: 'danger'
          })
        })

  }, [])

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
        onPress={() => 
          navigation.navigate('ProfessionalList', { profissao: item.nome, id: item.id })
        }
        professionIcon={item.nomeIcone} />
    )
  }

  const renderItemServico = (item: ServicoParaAvaliarOutput) => {
    return (
      <CustomDialog
        cancel={() => handlePress(item.idServico, false)}
        ok={() => handlePress(item.idServico, true)}
        title='NOTIFICAÇÃO DE SERVIÇO'
        text={`Olá, ${user?.name}, você gostaria de avaliar o serviço realizado pelo(a) profissional ${item.nomeProvedor}?`}
      />
    )
  }

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems[0] !== undefined) {
      setServicoAtual(viewableItems[0]?.index)
      console.log(viewableItems[0]?.index)
    }
  }

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 20
      },
      onViewableItemsChanged
    }
  ]);

  const removeServico = (id: number) => {
    setServicosParaAvaliar((prev) => {
      let index = servicosParaAvaliar.findIndex(x => x.idServico == id)
      if (index != -1)
        prev.splice(index, 1)
      return [...prev]
    })
  }

  const handlePress = (idServico: number, confirmado: boolean) => {
    removeServico(idServico)

    if (confirmado) {
      navigation.navigate('AvaliacaoServico')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: whiteDefault, paddingTop: 10 }}>

      {servicosParaAvaliar.length > 0 ?
        <View style={{
          height: '100%',
          width: '100%',
          backgroundColor: greyLoadingDefault2,
          position: 'absolute',
          zIndex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FlatList
            horizontal
            style={{
              height: '100%',
            }}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            data={servicosParaAvaliar}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => renderItemServico(item)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          />
          <FlatList
            horizontal
            style={{ alignSelf: 'center', bottom: 240 }}
            data={servicosParaAvaliar}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: index === servicoAtual ? 12 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: index === servicoAtual ? blackDefault : orangeDefault,
                    marginHorizontal: 2
                  }} />
              )
            }}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            scrollEnabled={false}
          />
        </View>
        :
        <></>
      }

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