import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Video from 'react-native-video';
import stylesSummary from '../Styles/stylesSummary';

const GameSimSummary = ({ summary }) => {
  const [playingAudio, setPlayingAudio] = useState(false);
  const [sound, setSound] = useState(null);

  // Validar si 'summary' y sus propiedades existen
  if (!summary || !summary.description || !summary.videoUri || !summary.audioUris) {
    return <Text>No hay resúmenes disponibles o datos incompletos</Text>;
  }

  const playAudio = async (audioUri) => {
    if (playingAudio) {
      await sound.stopAsync();
      setPlayingAudio(false);
      return;
    }
    try {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(newSound);
      await newSound.playAsync();
      setPlayingAudio(true);
    } catch (error) {
      console.error('Error reproduciendo audio:', error);
    }
  };

  return (
    <View style={stylesSummary.container}>
      <Text style={stylesSummary.title}>{summary.description}</Text>

      <Video
        source={{ uri: summary.videoUri }}
        style={stylesSummary.video}
        controls
        resizeMode="contain"
      />

      {summary.audioUris && summary.audioUris.length > 0 ? (
        summary.audioUris.map((audio, index) => (
          <TouchableOpacity
            key={index}
            style={stylesSummary.audioButton}
            onPress={() => playAudio(audio.uri)}
          >
            <Text style={stylesSummary.audioText}>🎧 Escuchar en {audio.languageCode}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No hay audios disponibles</Text>
      )}
    </View>
  );
};

export default GameSimSummary;
