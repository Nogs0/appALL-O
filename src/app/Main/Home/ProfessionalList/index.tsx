import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import CardProfessional, { CardProps } from '../../../../components/CardProfessional';
import FilterProfessions from '../../../../components/FilterProfessions';
import { ButtonFilterEnumProfessions } from '../../../../shared/Enums/enums';
import styles from './styles';
import HeaderProfessionalList from '../../../../components/HeaderProfessionalList/indext';
import { useNavigation } from '@react-navigation/native';

export default function ProfessionalList(props: any) {
  const [params, setParams] = useState<any>(props.route.params)
  const navigation = useNavigation();
  const DATA: CardProps[] = [

  ]

  const [buttonSelected, setButtonSelected] = useState<ButtonFilterEnumProfessions>(ButtonFilterEnumProfessions.nextToYou);

  useEffect(() => {
    console.log(buttonSelected);
  }, [buttonSelected]);

  const renderItem = (item: CardProps) => {
    return (
      <CardProfessional props={item} profissao={params.profession}></CardProfessional>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfessionalList profession={params.profession} navigation={navigation} />
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