import React from 'react';
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native';
import stylesHome from '../Styles/stylesHome';

const limitText = (text, limit = 15) => {
  const words = text.split(' ');
  return words.length > limit ? `${words.slice(0, limit).join(' ')}...` : text;
};

const RecentlyNews = ({ news, navigation }) => {
  const renderItem = ({ item }) => (
    <View style={stylesHome.cardContainer}>
      <Text style={stylesHome.time}>{item.time}</Text>
      <TouchableOpacity
        style={stylesHome.card}
        onPress={() => navigation.navigate('NewsDetails', { newsItem: item })}
      >
        <Image source={{ uri: item.image }} style={stylesHome.image} />
        

        <View style={stylesHome.textContainer}>
          <Text style={stylesHome.title}>{item.title}</Text>
          <Text style={stylesHome.details}>{limitText(item.Details)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={stylesHome.list}
    />
  );
};

export default RecentlyNews;