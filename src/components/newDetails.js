// Component for see all the news
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import DetailsStyle from './Styles/styleNewsDetails'; // Import the styles

const NewsDetails = ({ route }) => {
  const { newsItem } = route.params;

  return (
    <ScrollView style={DetailsStyle.container}>
      <Image source={{ uri: newsItem.image }} style={DetailsStyle.image} />
      <Text style={DetailsStyle.title}>{newsItem.title}</Text>
      <Text style={DetailsStyle.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat, neque non sodales laoreet, elit augue tincidunt mi, a cursus augue lorem nec lacus. Donec sit amet vehicula ex.
      </Text>
    </ScrollView>
  );
};


export default NewsDetails;
