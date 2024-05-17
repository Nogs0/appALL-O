import { StyleSheet, TouchableOpacityComponent } from "react-native";
import { blackDefault, orangeDefault1 } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderWidth: 1,
        borderRadius: 15,
        width: '18%',
        height: '70%',
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: 'center'
    },
    data: {
        textAlign: 'center',
        color: orangeDefault1,
        fontSize: 18,
        fontFamily: 'Rubik-Bold'
    },
    description: {
        textAlign: 'center',
        color: blackDefault,
        fontSize: 10,
        fontFamily: 'Rubik-Bold'
    }
})