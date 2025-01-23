import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import stylesHome from './Styles/stylesHome'; //Import the styles
import RecentlyNews from './components/recentlyNews';
import FavoriteGames from './components/favorites';
import WhitoutSession from '../../components/noProfile';

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
          time: 'Ahora',
        },
        {
          id: '2',
          title: 'Nuevas reglas en Baseball',
          Details: 'La liga anuncia cambios en las reglas para la próxima temporada. lorem  ',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxECzxZ40gJD6hUhin1I-kwS3ON2ylcsvItg&s',
          time: 'Ahora',
        },
        {
          id: '3',
          title: 'El Baseball la mejor Liga',
          Details: 'La liga MLB es lo mejor de la vida',
          image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Angels_Stadium.JPG',
          time: 'Ahora',
        },
        {
          id: '4',
          title: 'El Baseball la mejor Liga',
          Details: 'La liga MLB es lo mejor de la vida',
          image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Angels_Stadium.JPG',
          time: 'Hace 1 minuto',
        },
        {
          id: '5',
          title: 'El Baseball la mejor Liga',
          Details: 'La liga MLB es lo mejor de la vida',
          image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Angels_Stadium.JPG',
          time: 'Hace 1 minuto',
        },
      ]);
      setLoading(false);
    }, 0);
  }, []);

  const user={
    session:'false'
  }

  const renderHeader = () => (
    <>
      <Text style={stylesHome.header}>Your Favorites</Text>
      <FavoriteGames navigation={navigation}/>
      <Text style={stylesHome.header}>Recently</Text>
    </>
  );


return (

  <View style={stylesHome.allPage}>
    
  {user.session === 'true' ? (
    <>
   
  <FlatList
      ListHeaderComponent={renderHeader} 
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RecentlyNews news={[item]} navigation={navigation} />
      )}
      contentContainerStyle={stylesHome.list}
    />
    </>
    ) : (
      <WhitoutSession navigation={navigation}/>
  )}
    </View>
);
};
  

export default Home; 