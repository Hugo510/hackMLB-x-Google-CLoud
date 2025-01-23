import { StyleSheet } from 'react-native';

const stylesLiveHeader = StyleSheet.create({
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
      width: 83,
      height: 83,
      marginBottom: 8,
    },
    teamName: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    vsContainer: {
      alignItems: 'center',
    },
    vs: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 20,
    },
    marcador: {
      fontSize: 14,
      textAlign: 'center',
      fontWeight: 'light',
      marginTop: 10, 
    },
    marcadorActualHomeTeam: {
      fontSize: 14,
      textAlign: 'center',
      fontWeight: 'light',
      marginTop: 10,
    },
    marcadorActualAwayTeam: {
      fontSize: 14,
      textAlign: 'center',
      fontWeight: 'light',
      marginTop: 10,
      color: '#34A853',
    },
    score: {
      fontSize: 32,
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
      color: '#127236',
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

  export default stylesLiveHeader;