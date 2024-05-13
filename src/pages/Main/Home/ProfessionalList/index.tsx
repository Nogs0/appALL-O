import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import CardProfessional, { CardProps } from '../../../../components/CardProfessional';
import FilterProfessions from '../../../../components/FilterProfessions';
import { ButtonFilterEnumProfessions } from '../../../../shared/Enums/enums';
import styles from './styles';
import HeaderProfessionalList from '../../../../components/HeaderProfessionalList/indext';

export default function ProfessionalList({ navigation, profession }: any) {
  const DATA: CardProps[] = [
    {
      id: 1,
      name: 'Marcio DME',
      rate: 4.5,
      obs: 'Melhor avaliado',
      priceAvg: 70,
      image: require('../../../../assets/images/eletricista.jpg'),
      favorite: true,
      timeDistance: 30,
      navigation: navigation,
      numberRate: 30
    },
    {
      id: 1,
      name: 'Davi CEMIG',
      rate: 4,
      obs: '4 serviços essa semana',
      priceAvg: 30,
      image: require('../../../../assets/images/encanador.jpg'),
      favorite: false,
      timeDistance: 20,
      navigation: navigation,
      numberRate: 30
    },
    {
      id: 1,
      name: 'Marcio DME',
      rate: 4.5,
      obs: 'Melhor avaliado',
      priceAvg: 70,
      image: require('../../../../assets/images/eletricista.jpg'),
      favorite: true,
      timeDistance: 30,
      navigation: navigation,
      numberRate: 30
    },
    {
      id: 1,
      name: 'Davi CEMIG',
      rate: 4,
      obs: '4 serviços essa semana',
      priceAvg: 30,
      image: require('../../../../assets/images/encanador.jpg'),
      favorite: false,
      timeDistance: 20,
      navigation: navigation,
      numberRate: 30
    },
    {
      id: 1,
      name: 'Marcio DME',
      rate: 4.5,
      obs: 'Melhor avaliado',
      priceAvg: 70,
      image: require('../../../../assets/images/eletricista.jpg'),
      favorite: true,
      timeDistance: 30,
      navigation: navigation,
      numberRate: 30
    },
    {
      id: 1,
      name: 'Davi CEMIG',
      rate: 4,
      obs: '4 serviços essa semana',
      priceAvg: 30,
      image: require('../../../../assets/images/encanador.jpg'),
      favorite: false,
      timeDistance: 20,
      navigation: navigation,
      numberRate: 30
    },
    {
      id: 1,
      name: 'Marcio DME',
      rate: 4.5,
      obs: 'Melhor avaliado',
      priceAvg: 70,
      image: require('../../../../assets/images/eletricista.jpg'),
      favorite: true,
      timeDistance: 30,
      navigation: navigation,
      numberRate: 30
    },
    {
      id: 1,
      name: 'Davi CEMIG',
      rate: 4,
      obs: '4 serviços essa semana',
      priceAvg: 30,
      image: require('../../../../assets/images/encanador.jpg'),
      favorite: false,
      timeDistance: 20,
      navigation: navigation,
      numberRate: 30
    },
    {
      id: 1,
      name: 'Marcio DME',
      rate: 4.5,
      obs: 'Melhor avaliado',
      priceAvg: 70,
      image: require('../../../../assets/images/eletricista.jpg'),
      favorite: true,
      timeDistance: 30,
      navigation: navigation,
      numberRate: 30
    },
    {
      id: 1,
      name: 'Davi CEMIG',
      rate: 4,
      obs: '4 serviços essa semana',
      priceAvg: 30,
      image: require('../../../../assets/images/encanador.jpg'),
      favorite: false,
      timeDistance: 20,
      navigation: navigation,
      numberRate: 30
    }
  ]

  const [buttonSelected, setButtonSelected] = useState<ButtonFilterEnumProfessions>(ButtonFilterEnumProfessions.nextToYou);

  useEffect(() => {
    console.log(buttonSelected);
  }, [buttonSelected]);

  const renderItem = (item: CardProps) => {
    return (
      <CardProfessional props={item}></CardProfessional>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfessionalList profession={profession} navigation={navigation} />
      <FilterProfessions onPress={(pressionado: any) => setButtonSelected(pressionado)} button={buttonSelected}/>
      <FlatList
        style={styles.listContainer}
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItem(item)}
      />
    </SafeAreaView>
  );
}