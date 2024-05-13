import { StyleSheet, TouchableOpacityComponent } from "react-native";
import { blackDefault, orangeDefault1 } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        borderWidth: 1,
        borderRadius: 15,
        width: '20%',
        height: '50%',
        marginHorizontal: 20,
        padding: 10,
        justifyContent: 'center'
    },
    data: {
        textAlign: 'center',
        color: orangeDefault1,
        fontSize: 30,
        fontFamily: 'Rubik-Bold'
    },
    description: {
        textAlign: 'center',
        color: blackDefault,
        fontSize: 10,
        fontFamily: 'Rubik-Bold'
    }
})