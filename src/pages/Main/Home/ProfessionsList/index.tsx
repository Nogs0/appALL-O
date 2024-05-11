import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import styles from './styles';
import HeaderProfessionsList from '../../../../components/HeaderProfessionsList/indext';
import FilterProfessions from '../../../../components/FilterProfessions';
import { ButtonFilterEnum } from '../../../../shared/Enums/enums';

export default function ProfessionsList({ navigation, profession }: any) {
  const [buttonSelected, setButtonSelected] = useState<ButtonFilterEnum>(ButtonFilterEnum.nextToYou);

  useEffect(() => {
    console.log(buttonSelected);
  }, [buttonSelected]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderProfessionsList profession={profession} navigation={navigation} />
      <FilterProfessions onPress={(pressionado: any) => setButtonSelected(pressionado)} button={buttonSelected}/>
    </SafeAreaView>
  );
}