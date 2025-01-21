import { StyleSheet } from 'react-native';

const stylesHome = StyleSheet.create({

    cardContainer:{
      marginBottom: 24, 
      position: 'relative',
    },

    container: { 
      flex: 1,
      backgroundColor: '#fff'},
  
    header: { 
      fontSize: 24,
      fontWeight: 'bold',
      margin: 16 },
  
    list: {
      padding: 10 },
  
    card: { flexDirection: 'row',
       marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden', 
        elevation: 3, 
        position: 'relative',},
  
    image: { 
      width: 100, 
      height: 100 },
  
    textContainer: { 
      flex: 1, 
      padding: 8 },
  
    title: { 
      fontSize: 16, 
      fontWeight: 'bold', 
      marginBottom: 4 },
  
    excerpt: { 
      fontSize: 14, 
      color: '#666' },
  
    loading: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' },

    time: {
        position: 'absolute',
        top: -12,
        left: 16,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        fontSize: 12,
      },
  });

export default stylesHome;