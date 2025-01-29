import { StyleSheet } from 'react-native';

export const stylesInfoGameLive = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 26,
    paddingTop: 20,
  },
  content: {
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  event: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'semibold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
