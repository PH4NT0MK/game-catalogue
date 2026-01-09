import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import gamesData from '@/assets/data/data.json';
import { truncate } from '@/utils/truncate';

export default function HomeScreen() {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          style={{ width: '100%', height: '100%' }}
          source={require('@/assets/images/ashfall.jpg')}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Game catalogue</ThemedText>
      </ThemedView>
      {gamesData.games.map((game, i) => <View key={i}>
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
      </View>)}
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
