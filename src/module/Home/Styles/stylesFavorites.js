import { StyleSheet } from 'react-native';

const stylesFavorites = StyleSheet.create({
    loading: {
      marginTop: 20,
    },
    gameCard: {
      padding: 10,
      marginVertical: 10,
      borderRadius: 10,
      // borderColor: '#',
      // borderWidth: 1,
      backgroundColor: '#f6f6f6',
    },
    teams: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginBottom: 10,
      // backgroundColor: 'blue',

    },
    team: {
      alignItems: 'center',
    },
    teamImage: {
      width: 50,
      height: 50,
      marginBottom: 8,
    },
    teamName: {
      fontSize: 14,
      textAlign: 'center',
    },
    vs: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#333',
    },
    score: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 2,
    },
    status: {
      fontSize: 12,
      color: 'red',
      textAlign: 'center',
      padding:2,
      width: 100,
      backgroundColor: '#D50032',
      color:'#fff',
      alignSelf:'center',
      borderRadius:10,
      marginBottom:10,
    },
    time: {
      fontSize: 12,
      color: 'green',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    noFavorites: {
      fontSize: 16,
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: 10,
    },
  });

  export default stylesFavorites;