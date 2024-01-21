import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { PerformanceMeasureView } from '@shopify/react-native-performance';

import { data, getImageSource, styles } from './shared';

const FakeRating = ({ rating }: { rating: number }) => (
  <View style={styles.rating}>
    {[1, 2, 3, 4, 5].map((key) => (
      <View key={key}>
        <Image style={styles.ratingBase} source={require('./assets/star-filled.png')} />
        {key <= Math.round(rating) && (
          <Image style={styles.ratingFill} source={require('./assets/star-filled.png')} />
        )}
      </View>
    ))}
  </View>
);

export const ScreenReference = () => (
  <PerformanceMeasureView interactive={true} screenName="Reference">
    <FlatList
      data={data}
      initialNumToRender={10}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <View style={styles.card}>
          <Image style={styles.image} source={getImageSource(index)} />
          <View>
            <Text style={styles.title}>{`Item ${index + 1}`}</Text>
            <FakeRating rating={item.rating} />
          </View>
          <Text style={styles.ratingValue}>{item.rating.toFixed(1)}</Text>
        </View>
      )}
    />
  </PerformanceMeasureView>
);
