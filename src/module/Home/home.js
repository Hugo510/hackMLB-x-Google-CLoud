import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import stylesHome from './Styles/stylesHome';
import GameSummary from './components/recentlyNews'; //Componente API REAL
import FavoriteGames from './components/favorites'; //Componente Simulado
import WhitoutSession from '../../components/noProfile'; 
import { useAuth } from "../../Context/AuthContext";
import FavoriteLiveGames from './components/LiveGames';//Componente API REAL
import GameSimSummary from './components/summarySimul';//Componente Simulado

const Home = ({ navigation }) => {
  const isLoggedIn = token != true;
  const [news, setNews] = useState([]);
  const { token } = useAuth();
  

  useEffect(() => {
    const simulateNews = () => {
      const simulatedNews = [
        {
          id: '1',
          description: 'Resumen del juego: Equipo A vs Equipo B',
          videoUri: 'https://youtu.be/XvWL-V8H4t8?si=vH8mUR12Qk3n3IL1',
          audioUris: [
            {
              languageCode: 'es',
              uri: 'https://youtu.be/XvWL-V8H4t8?si=vH8mUR12Qk3n3IL1',
            },
            {
              languageCode: 'en',
              uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            },
            {
              languageCode: 'jp',
              uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            }
          ]
        }
      ];
      setNews(simulatedNews);
    };

    simulateNews();
  }, []);

  return (
    <View style={stylesHome.allPage}>
      {isLoggedIn ? (
        <>
          <FlatList
            ListHeaderComponent={() => (
              <>
                <Text style={stylesHome.header}>Live Games</Text>
                <FavoriteGames navigation={navigation} />
                <Text style={stylesHome.header}>Recently</Text>
              </>
            )}
            data={news}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <GameSummary summary={item} navigation={navigation} />
            )}
            contentContainerStyle={stylesHome.list}
          />
        </>
      ) : (
        <WhitoutSession navigation={navigation} />
      )}
    </View>
  );
};

export default Home;
