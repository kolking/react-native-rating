import React, { useCallback, useState } from 'react';
import { Alert, I18nManager, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Rating } from '@kolking/react-native-rating';

const App = () => {
  const [rating, setRating] = useState(3.5);
  const [liveRating, setLiveRating] = useState(0);
  const [rtl, setRTL] = useState(I18nManager.isRTL);

  const handleChange = useCallback(
    (value: number) => {
      setRating(Math.round((rating + value) * 5) / 10);
      setLiveRating(0);
    },
    [rating],
  );

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View style={styles.direction}>
        <Text style={styles.text}>Direction: {rtl ? 'RTL' : 'LTR'}</Text>
        <Switch
          value={rtl}
          onValueChange={(value) => {
            setRTL(value);
            I18nManager.forceRTL(value);
            Alert.alert('Reload required', 'Reload the app to apply the UI direction change!');
          }}
        />
      </View>
      <Rating size={40} rating={rating} onMove={setLiveRating} onChange={handleChange} />
      <Rating
        size={40}
        variant="stars-outline"
        rating={rating}
        onMove={setLiveRating}
        onChange={handleChange}
      />
      <Rating
        size={40}
        variant="hearts"
        rating={rating}
        onMove={setLiveRating}
        onChange={handleChange}
      />
      <Rating
        size={40}
        variant="hearts-outline"
        rating={rating}
        onMove={setLiveRating}
        onChange={handleChange}
      />
      <Rating
        size={40}
        variant="emoji"
        rating={rating}
        onMove={setLiveRating}
        onChange={handleChange}
      />
      <View style={styles.label}>
        <Text style={styles.text}>Rated {liveRating || rating} out of 5</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 20,
    padding: 60,
    direction: 'rtl',
    justifyContent: 'center',
  },
  direction: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 17,
  },
});

export default App;
