import { StyleSheet } from "react-native";

const stylesTopBar = StyleSheet.create({
    topBar: {
      backgroundColor: '#003087',
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16, 
    },
    title: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    logo:{
      textAlign: 'center'
    },
    icons: {
      flexDirection: 'row',
    },
    icon: {
      color: 'white',
      marginLeft: 10,
      fontSize: 24,
    },
  });

  export default stylesTopBar;