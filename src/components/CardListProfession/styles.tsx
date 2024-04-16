import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        height: 100,
        marginTop: 15,
        marginLeft: 15,
        alignItems: 'center',
    },
    touchableContainer: {
        flex: 1,
        flexDirection: 'row',
        elevation: 5,
        width: 200,
        borderRadius: 10
    },
    profissionContainer: {
        flex: 0.3,
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'flex-end',
        height: 100
    },
    profission: {
        paddingLeft: 10,
        fontSize: 32,
        color: 'white',
        fontFamily: 'Rubik-Regular',
        textShadowColor: 'black',
        textShadowOffset: {
            width: -3,
            height: 3
        },
        textShadowRadius: 8,
    },
    imageContainer: {
        flex: 1,
        height: 100,
        alignItems: 'center',
        zIndex: 0
    },
    image: {
        borderRadius: 5,
        height: 100,
        width: 200
    }
})