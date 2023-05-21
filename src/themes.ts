import { Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme();

function getColor(light: string, dark: string) {
  return colorScheme === 'dark' ? dark : light;
}

export enum Theme {
  STARS = 'stars',
  STARS_OUTLINE = 'stars-outline',
  HEARTS = 'hearts',
  HEARTS_OUTLINE = 'hearts-outline',
  EMOJI = 'emoji',
}

export type ThemeType = `${Theme}`;

export const themes: { [key in Theme]: any } = {
  [Theme.STARS]: {
    baseColor: getColor('#D1D1D6', '#3A3A3C'),
    fillColor: getColor('#FF9500', '#FF9F0A'),
    touchColor: getColor('#FF3B30', '#FF453A'),
    baseSymbol: require('./assets/star-filled.png'),
    fillSymbol: require('./assets/star-filled.png'),
  },
  [Theme.STARS_OUTLINE]: {
    baseColor: getColor('#C7C7CC', '#48484A'),
    fillColor: getColor('#FF9500', '#FF9F0A'),
    touchColor: getColor('#FF3B30', '#FF453A'),
    baseSymbol: require('./assets/star-outline.png'),
    fillSymbol: require('./assets/star-filled.png'),
  },
  [Theme.HEARTS]: {
    baseColor: getColor('#D1D1D6', '#3A3A3C'),
    fillColor: getColor('#FF2D55', '#FF375F'),
    touchColor: getColor('#D70015', '#D70015'),
    baseSymbol: require('./assets/heart-filled.png'),
    fillSymbol: require('./assets/heart-filled.png'),
  },
  [Theme.HEARTS_OUTLINE]: {
    baseColor: getColor('#C7C7CC', '#48484A'),
    fillColor: getColor('#FF2D55', '#FF375F'),
    touchColor: getColor('#D70015', '#D70015'),
    baseSymbol: require('./assets/heart-outline.png'),
    fillSymbol: require('./assets/heart-filled.png'),
  },
  [Theme.EMOJI]: {
    baseSymbol: [
      require('./assets/emoji-1.png'),
      require('./assets/emoji-2.png'),
      require('./assets/emoji-3.png'),
      require('./assets/emoji-4.png'),
      require('./assets/emoji-5.png'),
    ],
  },
};

export function getThemeProp(theme: ThemeType, prop: string) {
  return themes[theme][prop];
}
