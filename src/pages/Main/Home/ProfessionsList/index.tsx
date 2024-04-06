import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import FilterProfessions from '../../../../components/FilterProfessions';
import ListOccupationArea from '../../../../components/ListOccupationArea';
import styles from './styles';

const DATA: string[] = [
  'Automotive Services',
  'Residencial Services',
  'Construction Services',
  'Design Services',
  'Gambiarra Services'
]

const renderItem = ({item}: {item: string}, navigation: any) => {
};

export default function ProfessionsList({ navigation }: any) {
  const [buttonSelected, setButtonSelected] = useState(1);

  useEffect(() => {
    console.log(buttonSelected);
    //Aqui ficará a requisição com o filtro já setado
  }, [buttonSelected]);

  return (
    <SafeAreaView style={styles.container}>
     
    </SafeAreaView>
  );
}