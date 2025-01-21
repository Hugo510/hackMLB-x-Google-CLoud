import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSHomeheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import stylesHome from './Styles/stylesHome'; //Import the styles
// import renderItem from './components/recentlyNews';

const Home = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  //  Simulation of the News added Recentrly
    setTimeout(() => {
      setNews([
        {
          id: '1',
          title: 'El mejor partido del año',
          Details: 'Resumen del partido más emocionante de la temporada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, neque non sodales laoreet, elit augue tincidunt mi, a cursus augue lorem nec lacus. Donec sit amet vehicula ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
          image: 'https://www.collinsdictionary.com/images/thumb/baseball_557405302_250.jpg?version=6.0.57',
          time: '2025-01-20',
        },
        {
          id: '2',
          title: 'Nuevas reglas en Baseball',
          Details: 'La liga anuncia cambios en las reglas para la próxima temporada. lorem  ',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxECzxZ40gJD6hUhin1I-kwS3ON2ylcsvItg&s',
          time: '2025-01-20',
        },
        {
          id: '3',
          title: 'El Baseball la mejor Liga',
          Details: 'La liga MLB es lo mejor de la vida',
          image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Angels_Stadium.JPG',
          time: '2025-01-20',
        },
      ]);
      setLoading(false);
    }, 0);
  }, []);


  const limitText = (text, limit = 15) => {
    const words = text.split(' ');
    return words.length > limit ? `${words.slice(0, limit).join(' ')}...` : text;
  }; 

  const renderItem = ({ item }) => (
    <View style={stylesHome.cardContainer}>
    <TouchableOpacity
      style={stylesHome.card}
      onPress={() => navigation.navigate('NewsDetails', { newsItem: item })}
    >
      
      <Image source={{ uri: item.image }} style={stylesHome.image} />
      <View style={stylesHome.textContainer}>
        <Text style={stylesHome.title}>{item.title}</Text>
        <Text style={stylesHome.Details}>{limitText(item.Details)}</Text>
       
      </View>
    </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={stylesHome.loading} size="large" color="#007AFF" />;
  }



return (
  <View style={stylesHome.container}>
    <Text style={stylesHome.header}>Your Favorites</Text>

    <Text style={stylesHome.header}>Recently</Text>
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={stylesHome.list}
    />
  </View>
);
};
  

export default Home; 