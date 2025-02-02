import { StyleSheet } from "react-native";

const stylesFavorites = StyleSheet.create({
    allPage:{
        backgroundColor: '#ffff',
        height: '100%'
    },
    container: {
        flex: 1,
        padding: 20,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1E1E1E', 
        textAlign: 'center',
        marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginTop: 15,
        marginBottom: 10,
      },
      itemContainer: {
        backgroundColor: '#003087',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
      },
      itemText: {
        fontSize: 16,
        color: '#FFF',
      },
      buttonSelecteam: {
        backgroundColor: '#007BFF', 
        paddingVertical: 8,          
        paddingHorizontal: 12,      
        borderRadius: 20,           
        justifyContent: 'center',   
        alignItems: 'center',       
        marginBottom: 10,          
        width: 'auto',              
        minWidth: 200,              
      },
      buttonTextSelecteam: {
        color: 'white',             
        fontSize: 14,               
        fontWeight: 'bold',         
        textAlign: 'center',      
      }
})


export default stylesFavorites;