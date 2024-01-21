import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { PerformanceMeasureView } from '@shopify/react-native-performance';
import { Rating } from '@kolking/react-native-rating';

import { data, getImageSource, styles } from './shared';

export const ScreenMeasured = () => (
  <PerformanceMeasureView interactive={true} screenName="Measured">
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
            <Rating size={20} rating={item.rating} disabled={true} />
          </View>
          <Text style={styles.ratingValue}>{item.rating.toFixed(1)}</Text>
        </View>
      )}
    />
  </PerformanceMeasureView>
);
