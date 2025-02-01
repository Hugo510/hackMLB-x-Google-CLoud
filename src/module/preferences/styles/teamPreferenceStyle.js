import { StyleSheet } from "react-native";

const teamStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      teamItem: {
        flex: 1,
        padding: 10,
        margin: 5,
        backgroundColor: '#9e9d9d',
        borderRadius: 8,
        elevation: 2,
        alignItems: 'center',
      },
      selectedTeam: {
        backgroundColor: '#0000ff',
      },
      teamName: {
        fontSize: 14,
        color: '#ffff',
        textAlign: 'center',
      },
      saveButton: {
        backgroundColor:'#0000ff',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
      },
      saveButtonText: {
        fontSize: 16,
        color: '#fff',
      },
      selectAllButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
        textAlign: 'center',
        width: 150
      },
      selectAllButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
  });
  
export default teamStyles;