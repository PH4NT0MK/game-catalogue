import { Image } from 'expo-image';
import { Button, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

import gamesData from '@/assets/data/data.json';
import { useState } from 'react';
import { Game } from '@/types/game';

export default function TabTwoScreen() {

  const [randomGame, setRandomGame] = useState({} as Game);

  const getRandomGame = () => {
    const games = gamesData.games;
    const randomIndex = Math.floor(Math.random() * games.length);
    return games[randomIndex];
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          style={{ width: '100%', height: '100%' }}
          source={require('../../assets/images/questionMarks.jpg')}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Random Game
        </ThemedText>
      </ThemedView>
      <ThemedText>This area is only for the brave.</ThemedText>

      <ThemedText>Enter at your own risk.</ThemedText>

      <ThemedText>Whatever game appears, you must play it
        and complete at least one task.</ThemedText>

      <Button
        onPress={() => setRandomGame(getRandomGame())}
        title="Get A Random Game"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      {randomGame?.name && <View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <ThemedText
            type="title"
            style={{
              fontFamily: Fonts.rounded,
            }}>
            {randomGame.name}
          </ThemedText>

          <ThemedText style={{ marginVertical: 'auto', marginLeft: 'auto', marginRight: 0 }}>{randomGame.year}</ThemedText>
        </View>

        <Image
          source={{ uri: randomGame.bannerUrl }}
          style={{ width: '100%', height: 120 }}
          resizeMode="cover"
          />

          <ThemedText>{randomGame.description}</ThemedText>

        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded, marginVertical: 16, marginHorizontal: 'auto'
          }}>
          Tasks:
        </ThemedText>

        {randomGame.tasks.map((task, i) => <>
          <ThemedText key={`task-${i}`}>{i + 1}. {task}</ThemedText>
        </>)}
      </View>}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
