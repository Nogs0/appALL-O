import { View, Text } from 'react-native'
import React from 'react'
import ButtonTab from '../ButtonTab'
import { ButtonFilterEnumReviews } from '../../shared/Enums/enums'
import style from './style'
import { greyDefault, orangeDefault1, whiteDefault } from '../../shared/styleConsts'

export default function FilterReviews(props: any) {
    return (
        <View style={style.container}>
            <ButtonTab backgroundColor={props.button == ButtonFilterEnumReviews.date ? orangeDefault1 : whiteDefault}
                color={props.button == ButtonFilterEnumReviews.date ? whiteDefault : greyDefault}
                borderColor={props.button == ButtonFilterEnumReviews.date ? whiteDefault : greyDefault}
                width={'30%'} onPress={() => { props.onPress(ButtonFilterEnumReviews.date) }} text={'Date'} />

            <ButtonTab backgroundColor={props.button == ButtonFilterEnumReviews.bestRated ? orangeDefault1 : whiteDefault}
                color={props.button == ButtonFilterEnumReviews.bestRated ? whiteDefault : greyDefault}
                borderColor={props.button == ButtonFilterEnumReviews.bestRated ? whiteDefault : greyDefault}
                width={'30%'} onPress={() => { props.onPress(ButtonFilterEnumReviews.bestRated) }} text={'Best rated'} />

            <ButtonTab backgroundColor={props.button == ButtonFilterEnumReviews.worseRated ? orangeDefault1 : whiteDefault}
                color={props.button == ButtonFilterEnumReviews.worseRated ? whiteDefault : greyDefault}
                borderColor={props.button == ButtonFilterEnumReviews.worseRated ? whiteDefault : greyDefault}
                width={'30%'} onPress={() => { props.onPress(ButtonFilterEnumReviews.worseRated) }} text={'Worse rated'} />
        </View>
    )
}