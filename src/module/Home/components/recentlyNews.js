import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import Video from "react-native-video";
import { fetchGameSummary } from "../../../services/apiSummary";
import stylesSummary from "../Styles/stylesSummary";

const GameSummary = ({ gameId }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const getSummary = async () => {
      const data = await fetchGameSummary(gameId);
      setSummary(data);
      setLoading(false);
    };
    getSummary();
  }, [gameId]);

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
      console.error("Error playing audio:", error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#007AFF" />;
  if (!summary) return <Text>No summary available</Text>;

  return (
    <View style={stylesSummary.container}>
      <Text style={stylesSummary.title}>{summary.details.description}</Text>

      <Video source={{ uri: summary.details.videoUri }} style={stylesSummary.video} controls resizeMode="contain" />

      {summary.details.audioUris.map((audio, index) => (
        <TouchableOpacity key={index} style={stylesSummary.audioButton} onPress={() => playAudio(audio.uri)}>
          <Text style={stylesSummary.audioText}>🎧 Play in {audio.languageCode}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default GameSummary;
