import React from 'react';
import { View, Text, FlatList } from 'react-native';
import stylesNotification from './styles/styleNotification';

const Notifications = () => {
  const notifications = [
    { id: '1', title: '¡Victoria de tu equipo!', text: 'Los Dodgers ganaron 5-2 contra los Yankees.' },
    { id: '2', title: 'Partido en vivo', text: 'Red Sox vs. Astros ha comenzado.' },
    { id: '3', title: 'Estadísticas actualizadas', text: 'Aaron Judge ahora tiene 35 HR en la temporada.' },
  ];

  const renderItem = ({ item }) => (
    <View style={stylesNotification.notificationContainer}>
      <Text style={stylesNotification.notificationTitle}>{item.title}</Text>
      <Text style={stylesNotification.notificationText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={stylesNotification.container}>
      <Text style={stylesNotification.title}>Notificaciones</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Notifications;
