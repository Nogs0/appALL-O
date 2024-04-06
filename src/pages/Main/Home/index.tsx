import React from 'react';
import { SafeAreaView } from 'react-native';
import MostAccessed from '../../../components/MostAccessed';
import SearchForAProfessional from '../../../components/SearchForAProfessional';
import Highlights from '../../../components/Highlights';
import OtherProfessions from '../../../components/OtherProfessions';
import { whiteDefault } from '../../../shared/styleConsts';

export default function Home() {

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: whiteDefault}}>
      <SearchForAProfessional></SearchForAProfessional>
      <MostAccessed></MostAccessed>
      <Highlights></Highlights>
      <OtherProfessions></OtherProfessions>
    </SafeAreaView>
  )
}