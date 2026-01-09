import { Image } from 'expo-image';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import gamesData from '@/assets/data/data.json';
import { truncate } from '@/utils/truncate';
import { useState } from 'react';
import { Game } from '@/types/game';

export default function HomeScreen() {

  const [selectedGame, setSelectedGame] = useState({} as Game);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        selectedGame?.name ? <Image
          source={{ uri: selectedGame.bannerUrl }}
          style={{ width: '100%', height: '100%' }}
        /> : <Image
          style={{ width: '100%', height: '100%' }}
          source={require('@/assets/images/ashfall.jpg')}
        />
      }>
      {selectedGame?.name ? <>
        <Text style={{ flexShrink: 1, flexWrap: 'wrap', color: '#e6e5e5', fontSize: 35, textAlign: 'center' }}>
          {selectedGame.name} ({selectedGame.year})
        </Text>

        <Text style={{ flexShrink: 1, flexWrap: 'wrap', color: '#e6e5e5', fontSize: 26, textAlign: 'center', marginBottom: '5%' }}>
          By {selectedGame.publisher}
        </Text>

        <Text style={{ flexShrink: 1, flexWrap: 'wrap', color: '#e6e5e5', fontSize: 24, textAlign: 'center', marginBottom: '5%' }}>
          {selectedGame.description}
        </Text>

        <Text style={{ flexShrink: 1, flexWrap: 'wrap', color: '#e6e5e5', fontSize: 24, textAlign: 'center' }}>
          Your current playtime is <Text style={{ fontWeight: 'bold' }}>{selectedGame.play_time}</Text>
        </Text>

        <Button
          onPress={() => setSelectedGame({} as Game)}
          title="Go Back"
          color="#841584"
        />
      </> : <>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={{ marginHorizontal: 'auto', paddingBottom: 4 }}>Game catalogue</ThemedText>
        </ThemedView>
        {gamesData.games.map((game, i) => <TouchableOpacity key={i} onPress={() => setSelectedGame(gamesData.games[i])}>
          <Image
            source={{ uri: game.bannerUrl }}
            style={{ width: '100%', height: 120 }}
            resizeMode="cover"
          />

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flexShrink: 1, flexWrap: 'wrap', color: '#e6e5e5', fontSize: 20 }}>
              {game.name}
            </Text>

            <Text style={{ flexShrink: 1, flexWrap: 'wrap', color: '#e6e5e5', fontSize: 12, marginVertical: 'auto', marginLeft: 'auto', marginRight: 0 }}>
              By {truncate(game.publisher, 34)}
            </Text>
          </View>
        </TouchableOpacity>)}
      </>}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
