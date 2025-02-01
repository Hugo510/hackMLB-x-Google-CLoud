import { StyleSheet } from "react-native";

const stylesNotification = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 20,
  },
  notificationContainer: {
    backgroundColor: '#CCC',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  notificationText: {
    fontSize: 14,
    color: '#CCC',
    marginTop: 5,
  },
});

export default stylesNotification;