import { StyleSheet } from "react-native";

const stylesGames = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginBottom: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  gameItem: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  teamText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  venueText: {
    fontSize: 16,
    color: 'gray',
  },
  dateText: {
    fontSize: 14,
    color: 'blue',
  },
  noGamesText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  dateTabsContainer: {
    paddingHorizontal: 16, 
    marginTop: 16,
    marginBottom:20,
    zIndex: 10,  // Asegura que las fechas estén encima
    position: 'relative', // Necesario para que zIndex funcione
  },

  dateTab: {
    paddingVertical: 1, 
    paddingHorizontal: 60, 
    borderRadius: 8, 
    marginRight: 8,
    backgroundColor: '#e0e0e0', 
    height: 40,
  },

  activeDateTab: {
    backgroundColor: '#007bff', 
  },

  dateTabText: {
    color: '#333', 
    fontWeight: '500',
  },

  activeDateTabText: {
    color: '#fff',
  },

  gameListContainer: {
    flex: 1, // Asegura que los juegos ocupen el espacio disponible
    marginTop: 20, // Espacio superior para separar la lista de juegos de las fechas
  }
});

export default stylesGames;