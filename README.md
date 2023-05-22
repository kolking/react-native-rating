# React Native Awesome Rating

An interactive rating component for React Native, which can display ratings using stars, hearts, emojis, or custom symbols of your choice. React Native Awesome Rating leverages the `PanResponder` and `Animated` APIs to create high-performing animations. It is written in TypeScript and has zero dependencies. Whether you’re building a review-based app, a rating system, or any application that requires user feedback, this component will be an invaluable addition to your toolkit.

<img width="400" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/4207c479-d5ce-44c6-b6fd-d1ed0cb17cf6">

## Installation

```sh
yarn add react-native-awesome-rating
# or
npm install react-native-awesome-rating
```

## Example Usage

```jsx
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-awesome-rating';

const App = () => {
  const [rating, setRating] = useState(0);

  const handleChange = useCallback(
    (value: number) => setRating(Math.round((rating + value) * 5) / 10),
    [rating],
  );

  return (
    <View style={styles.root}>
      <Rating size={40} rating={rating} onChange={handleChange} />
      <Text style={styles.text}>Rated {rating} out of 5</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    marginTop: 20,
  },
});

export default App;
```

## Props

Prop | Type | Default | Description
---|---|---|---
`theme` | [ThemeType](#themes) | `stars` | See [themes section](#themes) below
`rating` | number | `0` | Decimal rating value
`size` | number | `30` | Width and height of the rating symbol
`scale` | number | `1.3` | Scaling factor for the snap animation, set it to `1` to turn animation off
`spacing` | number | `size * (scale - 1)` | Distance between symbols, calculated based on the `scale` prop if no value is provided
`maxRating` | number | `5` | Maximum rating value and the total number of symbols
`disabled` | boolean | `false` | Set `true` to disable user interaction
`baseColor` | string | theme default | Color of the "empty" symbols
`fillColor` | string | theme default | Color of the "filled" symbols
`touchColor` | string | theme default | Color of the symbols during interaction
`baseSymbol` | [SymbolSource](#symbols) | theme default | An image (or array of images) for the "empty" rating
`fillSymbol` | [SymbolSource](#symbols) | theme default | An image (or array of images) for the "filled" rating
`style` | ViewStyle | | Style object applied to the wrapping View
`onMove` | `(rating: number) => void` | | A function called during pan gesture
`onChange` | `(rating: number) => void` | | A function called when touch released

## Symbols

To achieve a customized appearance for the component, you have the flexibility to define your own symbols using the `baseSymbol` and `fillSymbol` props. The `SymbolSource` type is defined as `ImageSourcePropType | ImageSourcePropType[]`, allowing you to pass either a single image source or an array of images. It is important to note that when passing an array, its length must match the `maxRating` value to ensure proper functionality.

## Themes

There are multiple pre-defined themes available for selection. All of these themes are designed to support dark color scheme. Moreover, you have the flexibility to override any of the theme props with your own custom values.

### `stars`

Preview | `baseSymbol` | `fillSymbol` | `baseColor` | `fillColor` | `touchColor`
---|:-:|:-:|---|---|---
<img width="200" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/7938a154-f77e-41a7-bfa4-ce99cdb21da6"> | <img width="40" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/be118cab-4831-4b62-8730-a9acbf3ca339"> | <img width="40" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/be118cab-4831-4b62-8730-a9acbf3ca339"> | `#D1D1D6` light<br>`#3A3A3C` dark | `#FF9500` light<br>`#FF9F0A` dark | `#FF3B30` light<br>`#FF453A` dark

### `stars-outline`

Preview | `baseSymbol` | `fillSymbol` | `baseColor` | `fillColor` | `touchColor`
---|:-:|:-:|---|---|---
<img width="200" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/4ea6c37f-7f3d-423d-b011-ee1efa6e2d7f"> | <img width="40" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/6e2c6342-4e12-4173-8981-65f6bda53471"> | <img width="40" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/be118cab-4831-4b62-8730-a9acbf3ca339"> | `#C7C7CC` light<br>`#48484A` dark | `#FF9500` light<br>`#FF9F0A` dark | `#FF3B30` light<br>`#FF453A` dark

### `hearts`

Preview | `baseSymbol` | `fillSymbol` | `baseColor` | `fillColor` | `touchColor`
---|:-:|:-:|---|---|---
<img width="200" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/89fbdb3f-55bc-4ca5-aecd-4142f11b3065"> | <img width="40" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/ea2e3a63-6c11-4462-adf1-70a300e047ac"> | <img width="40" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/ea2e3a63-6c11-4462-adf1-70a300e047ac"> | `#D1D1D6` light<br>`#3A3A3C` dark | `#FF2D55` light<br>`#FF375F` dark | `#D70015` light<br>`#D70015` dark

### `hearts-outline`

Preview | `baseSymbol` | `fillSymbol` | `baseColor` | `fillColor` | `touchColor`
---|:-:|:-:|---|---|---
<img width="200" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/95abc141-7dfd-4888-a687-9d14f8931aa5"> | <img width="40" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/fe4d6672-d264-43bf-9205-3b761c127640"> | <img width="40" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/ea2e3a63-6c11-4462-adf1-70a300e047ac"> | `#C7C7CC` light<br>`#48484A` dark | `#FF2D55` light<br>`#FF375F` dark | `#D70015` light<br>`#D70015` dark

### `emoji`

Preview | `baseSymbol`
---|---
<img width="200" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/1830d591-43ca-4ff0-aa28-96efb268c77f"> | <img width="300" src="https://github.com/kolking/react-native-awesome-rating/assets/4656448/5ae98095-49ff-4ab5-ad5d-c63494789663">

## License

MIT