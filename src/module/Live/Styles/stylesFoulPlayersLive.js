import { StyleSheet } from 'react-native';

const stylesFoulPlayersLive = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    marginInline: 16,
    marginTop: 10,
  },
  left: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    marginLeft: 40,
    alignItems: 'flex-start'
  },
  right: {
    alignItems: 'flex-end',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 50,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});

export default stylesFoulPlayersLive;
