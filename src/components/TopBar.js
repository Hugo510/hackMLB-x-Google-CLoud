import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import logo from '../../assets/Sport/mlb_logo.svg'

const TopBar = ({ title, showIcons }) => (
  <View style={styles.topBar}>
    <Text style={styles.title}>{title}</Text>
    <Image tyle={styles.logo} source={logo}></Image>
    {showIcons && (
      <View style={styles.icons}>
       
        <Text style={styles.icon}>Noti</Text>
        <Text style={styles.icon}>Config</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#003087',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, 
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo:{
    textAlign: 'center'
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    color: 'white',
    marginLeft: 10,
    fontSize: 24,
  },
});

export default TopBar;
