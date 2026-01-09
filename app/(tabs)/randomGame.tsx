import { Image } from 'expo-image';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

import gamesData from '@/assets/data/data.json';
import { useEffect, useState } from 'react';
import { Game } from '@/types/game';

export default function TabTwoScreen() {

  const [randomGame, setRandomGame] = useState({} as Game);

  const getRandomGame = () => {
    const games = gamesData.games;
    const randomIndex = Math.floor(Math.random() * games.length);
    return games[randomIndex];
  };

  const [taskCrossoutMap, setTaskCrossoutMap] = useState(new Map());

  useEffect(() => {
    if (!randomGame) {
      return;
    }

    const newMap = new Map();

    for (let i = 0; i < randomGame?.tasks?.length; i++) {
      newMap.set(i, false);
    }

    console.log(newMap);

    setTaskCrossoutMap(newMap);
  }, [randomGame]);

  const handleTaskCrossout = (i: number) => {
    setTaskCrossoutMap(prev => {
      const newMap = new Map(prev);
      newMap.set(i, !newMap.get(i));
      return newMap;
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          style={{ width: '100%', height: '100%' }}
          source={require('@/assets/images/questionMarks.jpg')}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded, marginHorizontal: 'auto'
          }}>
          Random Game
        </ThemedText>
      </ThemedView>
      <ThemedText style={{ textAlign: 'center' }}>This area is only for the brave.</ThemedText>

      <ThemedText style={{ textAlign: 'center' }}>Enter at your own risk.</ThemedText>

      <ThemedText style={{ textAlign: 'center' }}>Whatever game appears, you must play it
        and complete at least one task.</ThemedText>

      <Button
        onPress={() => setRandomGame(getRandomGame())}
        title="Get A Random Game"
        color="#841584"
      />

      {randomGame?.name && <View>
        <View style={{ marginBottom: 12 }}>
          <View style={{ marginHorizontal: 'auto', marginBottom: 10 }}>
            <ThemedText
              type="title"
              style={{
                flexShrink: 1, flexWrap: 'wrap', fontFamily: Fonts.rounded,
              }}>
              {randomGame.name}
            </ThemedText>

            <ThemedText style={{ marginVertical: 'auto', marginHorizontal: 'auto', fontSize: 18 }}>{randomGame.year}</ThemedText>
          </View>

          <Image
            source={{ uri: randomGame.bannerUrl }}
            style={{ width: '100%', height: 120 }}
          />

          <ThemedText style={{ marginLeft: 'auto', marginRight: 0 }}>Current playtime: <Text style={{ fontWeight: 'bold' }}>{randomGame.play_time}</Text></ThemedText>
        </View>

        <ThemedText style={{ textAlign: 'center' }}>{randomGame.description}</ThemedText>

        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded, marginVertical: 16, marginHorizontal: 'auto'
          }}>
          Tasks:
        </ThemedText>

        <View style={{ marginHorizontal: 'auto' }}>
          {randomGame.tasks.map((task, i) => <TouchableOpacity key={i} onPress={() => { handleTaskCrossout(i) }}>
            <View style={{ marginBottom: 10 }}>
              <ThemedText style={{ textDecorationLine: taskCrossoutMap.get(i) ? 'line-through' : 'none' }}>{i + 1}. {task}</ThemedText>
            </View>
          </TouchableOpacity>)}
        </View>
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
