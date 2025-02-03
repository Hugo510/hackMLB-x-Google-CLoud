import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import stylesHome from './Styles/stylesHome';
import RecentlyNews from './components/recentlyNews';
import FavoriteGames from './components/favorites'; //Componente Simulado
import WhitoutSession from '../../components/noProfile'; 
import { useAuth } from "../../Context/AuthContext";
import FavoriteLiveGames from './components/LiveGames';//Componente API REAL

const Home = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const { token } = useAuth();
  
  const isLoggedIn = token != true;

  return (
    <View style={stylesHome.allPage}>
      {isLoggedIn ? (
        <>
          <FlatList
            ListHeaderComponent={() => (
              <>
                <Text style={stylesHome.header}>Live Games</Text>
                <FavoriteLiveGames navigation={navigation} />
                <Text style={stylesHome.header}>Recently</Text>
              </>
            )}
            data={news}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RecentlyNews news={[item]} navigation={navigation} />
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
