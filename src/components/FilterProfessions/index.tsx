import React from 'react'
import { FlatList, View } from 'react-native'
import { ButtonFilterEnumProfessions } from '../../shared/Enums/enums'
import ButtonTab from '../ButtonTab'
import styles from './styles'
import { greyDefault, orangeDefault, whiteDefault } from '../../shared/styleConsts'

type FilterProfessionsProps = {
    button: ButtonFilterEnumProfessions,
    onPress: any
}

export default function FilterProfessions(props: FilterProfessionsProps) {
    return (
        <View style={styles.container}>
            <ButtonTab backgroundColor={props.button == ButtonFilterEnumProfessions.nextToYou ? orangeDefault : whiteDefault} 
            color={props.button == ButtonFilterEnumProfessions.nextToYou ? whiteDefault : greyDefault} 
            borderColor={props.button == ButtonFilterEnumProfessions.nextToYou ? whiteDefault : greyDefault} 
            width={'30%'} onPress={() => { props.onPress(ButtonFilterEnumProfessions.nextToYou) }} text={'Próximos'} />

            <ButtonTab backgroundColor={props.button == ButtonFilterEnumProfessions.bestRated ? orangeDefault : whiteDefault} 
            color={props.button == ButtonFilterEnumProfessions.bestRated ? whiteDefault : greyDefault} 
            borderColor={props.button == ButtonFilterEnumProfessions.bestRated ? whiteDefault : greyDefault} 
            width={'30%'} onPress={() => { props.onPress(ButtonFilterEnumProfessions.bestRated) }} text={'Avaliação'} />

            <ButtonTab backgroundColor={props.button == ButtonFilterEnumProfessions.recognized ? orangeDefault : whiteDefault} 
            color={props.button == ButtonFilterEnumProfessions.recognized ? whiteDefault : greyDefault} 
            borderColor={props.button == ButtonFilterEnumProfessions.recognized ? whiteDefault : greyDefault} 
            width={'30%'} onPress={() => { props.onPress(ButtonFilterEnumProfessions.recognized) }} text={'Conhecidos'} />
        </View>
    )
}