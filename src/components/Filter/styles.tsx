import { StyleSheet } from "react-native";
import { orangeDefault2 } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: '6%',
        width: '100%',
        backgroundColor: orangeDefault2,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    profession: {
        fontSize: 28,
        fontFamily: 'Rubik-Bold',
        width: '80%',
        textAlign: 'center'
    },
    arrowBack: {
        width: '10%',
        alignItems: 'flex-start'
    },
    filter: {
        alignItems: 'flex-end',
        width: '10%',
    }
})