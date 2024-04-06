import { StyleSheet } from "react-native";
import { blackDefault, greyDefault, orangeDefault1 } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 0.15,
    },
    label: {
        left: 10,
        color: blackDefault,
        justifyContent: 'flex-start',
        fontSize: 25,
        fontFamily: 'Rubik-Light'
    },
    containerSearch:{
        margin: '2%',
        height: '45%',
        backgroundColor: greyDefault,
        borderRadius: 30,
      flexDirection: 'row' ,
    },
    iconSearch: {
      position: 'absolute',
      paddingTop: 13,
      paddingLeft: 15
    },
    search: {
        marginLeft: 35,
    }
})