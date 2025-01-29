import React from 'react';
import { View, Text, Image } from 'react-native';
import { stylesInfoGameLive } from '../Styles/stylesInfoGameLive';

const gameEvents = [
    {
        id: 1,
        title: 'Bottom of the 7th',
        eventTitle: 'Sac fly',
        eventDescription: 'A sacrifice fly by the batter allowed the runner on third base to score, tying the game.',
        imageUri: 'https://midfield.mlbstatic.com/v1/people/682829/spots/90?zoom=1.2'
    },
    {
        id: 2,
        title: 'Top of the 8th',
        eventTitle: 'Home run',
        eventDescription: 'The batter hit a home run over the left field fence, giving his team a two-run lead.',
        imageUri: 'https://midfield.mlbstatic.com/v1/people/808963/spots/90?zoom=1.2'
    },
    {
        id: 3,
        title: 'Bottom of the 9th',
        eventTitle: 'Strike out',
        eventDescription: 'The pitcher struck out the batter with a fastball, ending the game with a victory for his team.',
        imageUri: 'https://midfield.mlbstatic.com/v1/people/677951/spots/90?zoom=1.2'
    }
];

const InfoGameLive = ({ event }) => {
  return (
    <View style={stylesInfoGameLive.container}>
      <View style={stylesInfoGameLive.content}>
        <Text style={stylesInfoGameLive.title}>{event.title}</Text>

        <View style={stylesInfoGameLive.event}>
          <Image 
            source={{ uri: event.imageUri }} 
            style={stylesInfoGameLive.image} 
          />
          <View style={stylesInfoGameLive.details}>
            <Text style={stylesInfoGameLive.eventTitle}>{event.eventTitle}</Text>
            <Text style={stylesInfoGameLive.eventDescription}>
              {event.eventDescription}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const InfoGameLiveList = ({ events }) => {
  return (
    <View>
      {events.map((event) => (
        <InfoGameLive key={event.id} event={event} />
      ))}
    </View>
  );
};

export default () => <InfoGameLiveList events={gameEvents} />;
