import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import stylesTopBar from './srtyles/stylesTopBar';
import logo from '../../../assets/Sport/mlb_logo.svg'

const TopBar = ({ title, showIcons, onIconPress, navigation }) => (
  <View style={stylesTopBar.topBar}>
    <Text style={stylesTopBar.title}>{title}</Text>
    <Image style={stylesTopBar.logo} source={logo}></Image>
    {showIcons && (
      <View style={stylesTopBar.icons}>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} >
          <Material name="settings-helper" style={stylesTopBar.icon} />
        </TouchableOpacity>

      </View>
    )}
  </View>
);


export default TopBar;
