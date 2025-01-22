import { StyleSheet } from "react-native";


const stylesProfile = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 0,
        backgroundColor: '#f8f9fa',
    },
    banner: {
        width: '100%',
        height: 200, 
        justifyContent: 'flex-end',
        alignItems: 'center',
        grayscale: 8000,
      },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#ffff',
        top: -60,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        top: -70,
    },
    email: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
        top: -70,
    },
    location: {
        fontSize: 16,
        color: '#777',
        marginBottom: 20,
        top: -70,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: 'black',
        paddingVertical: 12,
        borderRadius: 1,
        alignItems: 'center',
    },
    actionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        marginTop: 10,
        backgroundColor: '#DC3545',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 2,
        // bottom: -100,
    },
    logoutText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
  });

  export default stylesProfile;