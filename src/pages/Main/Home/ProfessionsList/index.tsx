import React, { useEffect, useState } from 'react';
import { Button, FlatList, SafeAreaView, Text, View } from 'react-native';
import CardProfession, { CardProfessionProps } from '../../../../components/CardProfession';
import styles from './styles';
import FilterProfessions from '../../../../components/FilterProfessions';

const DATA: any[] = [
  {
    profession: 'Eletricista',
    image: require('../../../../assets/images/eletricista.jpg'),
  },
  {
    profession: 'Mecânico',
    image: require('../../../../assets/images/mecanico.jpg'),
  },
  {
    profession: 'Jardineiro',
    image: require('../../../../assets/images/jardineiro.jpg'),
  },
  {
    profession: 'Diarista',
    image: require('../../../../assets/images/diarista.jpg'),
  },
  {
    profession: 'Encanador',
    image: require('../../../../assets/images/encanador.jpg'),
  },
  {
    profession: 'Pintor',
    image: require('../../../../assets/images/pintor.jpg')
  }
]

const renderItem = ({ item }: { item: CardProfessionProps }, navigation: any) => {
  return (
    <CardProfession navigation={() => navigation.navigate('ProvidersList', { profession: item.profession })} profession={item.profession} image={item.image} ></CardProfession>
  );
};

export default function ProfessionsList({ navigation }: any) {
  const [buttonSelected, setButtonSelected] = useState(1);

  useEffect(() => {
    console.log(buttonSelected);
    //Aqui ficará a requisição com o filtro já setado
  }, [buttonSelected]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title={'teste'} onPress={() => navigation.navigate('ProvidersList', {profession: 'teste'})}></Button> */}
      <FilterProfessions onPress={setButtonSelected} button={buttonSelected} />
      <Text style={styles.titleServices}>Serviços Domésticos</Text>
      <View style={styles.listPage}>
        <FlatList style={styles.list}
          data={DATA}
          renderItem={({ item }) => { return renderItem({ item }, navigation) }}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
      <Text style={styles.titleServices}>Serviços Domésticos</Text>
      <View style={styles.listPage}>
        <FlatList style={styles.list}
          data={DATA}
          renderItem={({ item }) => { return renderItem({ item }, navigation) }}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
      <Text style={styles.titleServices}>Serviços Domésticos</Text>
      <View style={styles.listPage}>
        <FlatList style={styles.list}
          data={DATA}
          renderItem={({ item }) => { return renderItem({ item }, navigation) }}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
      <Text style={styles.titleServices}>Serviços Domésticos</Text>
      <View style={styles.listPage}>
        <FlatList style={styles.list}
          data={DATA}
          renderItem={({ item }) => { return renderItem({ item }, navigation) }}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
      <Text style={styles.titleServices}>Serviços Domésticos</Text>
      <View style={styles.listPage}>
        <FlatList style={styles.list}
          data={DATA}
          renderItem={({ item }) => { return renderItem({ item }, navigation) }}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
    </SafeAreaView>
  );
}