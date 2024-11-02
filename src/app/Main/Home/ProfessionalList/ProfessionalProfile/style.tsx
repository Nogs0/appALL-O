import { StyleSheet } from "react-native";
import { greenDefault, greenWpp, greyDefault, orangeDefault, whiteDefault } from "../../../../../shared/styleConsts";
import { Dimensions } from 'react-native'
const WindowWidth = Dimensions.get('window').width
export default StyleSheet.create({
   
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    contentContainer: {
        flex: 0.9,
        backgroundColor: whiteDefault,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    nameProfessional: {
        textAlign: 'center',
        fontSize: 26,
        fontFamily: 'Rubik-SemiBold'
    },
    firstSection: {
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        marginHorizontal: 20
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        right: '15%'
    },
    secondSection: {
        height: '15%',
        marginHorizontal: 20,
        justifyContent: 'space-between',
    },
    thirdSection: {
        height: '20%',
    },
    fourthSection: {
        height: '15%',
    },
    fifthSection: {
        borderColor: greyDefault,
        borderTopWidth: 2,
    },
    doesntSendMessage: {
        color: greyDefault,
        textAlign: 'left',
        fontSize: 16
    },
    WhatsappContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: "5%",
        backgroundColor: greenWpp,
        alignItems: 'center',
        borderRadius: 50,
        height: 40,
        width: 180,
        bottom: 20,
        right: 0,
        elevation: 5
    },
})