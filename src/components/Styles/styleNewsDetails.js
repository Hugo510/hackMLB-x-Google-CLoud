import { StyleSheet } from 'react-native';

const DetailsStyle = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: '#fff', 
      padding: 16 },
  
    image: { 
      width: '100%', 
      height: 200, 
      borderRadius: 8, 
      marginBottom: 16 },
  
    title: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      marginBottom: 16 },
  
    content: { 
      fontSize: 16, 
      color: '#444', 
      lineHeight: 24 },
  });
  
  export default DetailsStyle;