import { StyleSheet } from "react-native";

const stylesNoProfile = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 0,
        backgroundColor: '#fff',
    },
    Image:{
        width: '100%',
        height: 350,
    },
    Text:{
        fontSize: 21,
        color:'black',
        padding:20,
        fontWeight: "bold",
        marginTop: 30,
    },
    LoginButton:{
        marginTop:20,
        padding: 15,
        backgroundColor:'#003087',
        borderRadius: 5,
    },
    LoginText:{
        color: 'white',
        fontSize:16
    }
}

)

export default stylesNoProfile;