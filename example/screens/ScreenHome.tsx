import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PerformanceMeasureView, useStartProfiler } from '@shopify/react-native-performance';

import { StackParamList } from '../App';

type Props = NativeStackScreenProps<StackParamList, 'Home'>;

export const ScreenHome = ({ route, navigation }: Props) => {
  const { measuredTTR, referenceTTR } = route.params;
  const startNavigationTTITimer = useStartProfiler();

  return (
    <PerformanceMeasureView interactive={true} screenName="Home">
      <View style={styles.root}>
        <TouchableOpacity
          style={[styles.card, styles.cardReference]}
          activeOpacity={0.4}
          onPress={(uiEvent) => {
            startNavigationTTITimer({ source: 'Home', uiEvent });
            navigation.navigate('Reference');
          }}
        >
          <Text style={styles.title}>Reference Screen</Text>
          <Text style={styles.text}>Average time to render: {referenceTTR} ms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, styles.cardMeasured]}
          activeOpacity={0.4}
          onPress={(uiEvent) => {
            startNavigationTTITimer({ source: 'Home', uiEvent });
            navigation.navigate('Measured');
          }}
        >
          <Text style={styles.title}>Measure Screen</Text>
          <Text style={styles.text}>Average time to render: {measuredTTR} ms</Text>
        </TouchableOpacity>
      </View>
    </PerformanceMeasureView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 50,
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  cardReference: {
    backgroundColor: 'lightskyblue',
  },
  cardMeasured: {
    backgroundColor: 'lightpink',
  },
  rating: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  text: {
    fontSize: 17,
    marginTop: 5,
  },
});
