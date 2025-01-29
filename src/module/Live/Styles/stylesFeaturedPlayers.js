import { StyleSheet } from 'react-native';

const stylesFeaturedPlayers = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    backgroundColor: '#f0f0f0',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    elevation: 1,
  },
  position: {
    fontSize: 20,
    fontWeight: 'medium',
    color: '#333',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  details: {
    flex: 1,
    gap: 4,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    color: '#333',
  },
  verified: {
    marginLeft: 5,
  },
  stats: {
    fontSize: 12,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  circleText: {
    fontSize: 10,
    color: '#fff',
  },
  bold: {
    color: '#000',
  },
});

export default stylesFeaturedPlayers;