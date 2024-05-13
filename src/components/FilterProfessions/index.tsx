import React from 'react'
import { FlatList, View } from 'react-native'
import { ButtonFilterEnumProfessions } from '../../shared/Enums/enums'
import ButtonTab from '../ButtonTab'
import styles from './styles'
import { greyDefault, orangeDefault1, whiteDefault } from '../../shared/styleConsts'

type FilterProfessionsProps = {
    button: ButtonFilterEnumProfessions,
    onPress: any
}

export default function FilterProfessions(props: FilterProfessionsProps) {
    return (
        <View style={styles.container}>
            <ButtonTab backgroundColor={props.button == ButtonFilterEnumProfessions.nextToYou ? orangeDefault1 : whiteDefault} 
            color={props.button == ButtonFilterEnumProfessions.nextToYou ? whiteDefault : greyDefault} 
            borderColor={props.button == ButtonFilterEnumProfessions.nextToYou ? whiteDefault : greyDefault} 
            width={'30%'} onPress={() => { props.onPress(ButtonFilterEnumProfessions.nextToYou) }} text={'Next to you'} />

            <ButtonTab backgroundColor={props.button == ButtonFilterEnumProfessions.bestRated ? orangeDefault1 : whiteDefault} 
            color={props.button == ButtonFilterEnumProfessions.bestRated ? whiteDefault : greyDefault} 
            borderColor={props.button == ButtonFilterEnumProfessions.bestRated ? whiteDefault : greyDefault} 
            width={'30%'} onPress={() => { props.onPress(ButtonFilterEnumProfessions.bestRated) }} text={'Best rated'} />

            <ButtonTab backgroundColor={props.button == ButtonFilterEnumProfessions.recognized ? orangeDefault1 : whiteDefault} 
            color={props.button == ButtonFilterEnumProfessions.recognized ? whiteDefault : greyDefault} 
            borderColor={props.button == ButtonFilterEnumProfessions.recognized ? whiteDefault : greyDefault} 
            width={'30%'} onPress={() => { props.onPress(ButtonFilterEnumProfessions.recognized) }} text={'Recognized'} />
        </View>
    )
}