import { StyleSheet } from "react-native";

const stylesForm = StyleSheet.create({
    container: {
      // backgroundColor: "#4567",
      padding: 10,
      margin: 25,
      width: '80%'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#003087',
      marginTop: 40,
      padding: 15,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  export default stylesForm;