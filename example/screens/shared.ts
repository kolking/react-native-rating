import { StyleSheet } from 'react-native';

export const data = [...Array(500).keys()].map((key) => ({
  id: `item_${key}`,
  rating: Math.round((Math.random() * (5 - 2) + 2) * 10) / 10,
}));

export function getImageSource(index: number) {
  return { uri: `https://loremflickr.com/200/200/cat?lock=${index + 1}` };
}

export const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingBottom: 35,
  },
  card: {
    margin: 5,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 56,
    height: 56,
    marginRight: 10,
    borderRadius: 28,
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: '600',
  },
  ratingValue: {
    fontSize: 17,
    marginLeft: 'auto',
  },
  rating: {
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingBase: {
    width: 20,
    height: 20,
    tintColor: 'lightgray',
  },
  ratingFill: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    tintColor: 'red',
  },
});
