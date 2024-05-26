import React, { useState } from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderRegisterProfessional from '../../../components/HeaderRegisterProfessional'
import Input from '../../../components/Input'
import { useRegister } from '../../../contexts/register'
import { blackDefault, greyDefault, whiteDefault } from '../../../shared/styleConsts'
import style from './style'
export default function Register_Services({ navigation }: any) {

  const { professional } = useRegister();
  const [servico, setServico] = useState<string>('');
  const [listServicos, setListServicos] = useState<number[]>([1, 2, 3]);

  const servicosBase = [
    {
      id: 1,
      name: 'Jardineiro'
    },
    {
      id: 2,
      name: 'Eletricista'
    },
    {
      id: 3,
      name: 'Encanador'
    },
    {
      id: 4,
      name: 'Mecânico'
    }
  ]
  const handleButtonNext = () => {
    navigation.navigate('Register_Services');
  }

  const addItem = () => {
    console.log('Implementar SelectPicker')
  }

  const renderItem = (id: number) => {

    let serv = servicosBase.find(x => x.id == id);
    return (
      <View style={
        {
          padding: 10,
          borderColor: greyDefault,
          borderBottomWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <Text style={{ color: blackDefault }}>{serv?.name}</Text>
        <TouchableOpacity
          onPress={() => {
            let index = listServicos.findIndex(x => x == id);
            if (index != -1)
              setListServicos((prev) => {
                prev.splice(index, 1);
                return [...prev];
              });
          }}>
          <Icon name={'trash-can'} size={20} color={blackDefault}></Icon>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={style.container}>
      <HeaderRegisterProfessional navigation={navigation} />
      <View style={style.contentContainer}>
        <Text style={[style.text, { fontFamily: 'Rubik-SemiBold' }]}>Quais serviços você faz?</Text>

        <View style={style.addProfessionContainer}>
          <Input placeHolder={'Serviço'} text={servico} onChangeText={setServico} />
          <TouchableOpacity style={style.buttonAddContainer} onPress={() => addItem()}>
            <Icon name={'plus'} size={30} color={whiteDefault} style={style.buttonAdd}></Icon>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ width: '100%' }}
          data={listServicos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderItem(item)} />

        <TouchableOpacity style={style.buttonNext}
          onPress={() => handleButtonNext()}>
          <Text style={style.textButtonNext}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}