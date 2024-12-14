import React, { useEffect, useRef } from 'react';
import { Animated, I18nManager, Image, ImageSourcePropType, StyleSheet } from 'react-native';

interface Props {
  size: number;
  index: number;
  scale: number;
  disabled: boolean;
  baseColor: string;
  fillColor?: string;
  baseSource: ImageSourcePropType;
  fillSource?: ImageSourcePropType;
  animatedSymbol: Animated.Value;
  animatedOverlay: Animated.Value;
  testID?: string;
}

const RatingSymbol = ({
  size,
  index,
  scale,
  disabled,
  baseColor,
  fillColor = baseColor,
  baseSource,
  fillSource = baseSource,
  animatedSymbol,
  animatedOverlay,
  testID,
}: Props) => {
  const animatedScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!disabled) {
      Animated.spring(animatedScale, {
        tension: 50,
        friction: 3,
        toValue: animatedSymbol.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [1, scale, 1],
          extrapolate: 'clamp',
        }) as Animated.Value,
        useNativeDriver: true,
      }).start();
    }
  }, [disabled, animatedScale, animatedSymbol, index, scale]);

  const translateOverlay = animatedOverlay.interpolate({
    inputRange: [index - 1, index],
    outputRange: [I18nManager.isRTL ? size : -size, 0],
    extrapolate: 'clamp',
  });

  const translateSymbol = animatedOverlay.interpolate({
    inputRange: [index - 1, index],
    outputRange: [I18nManager.isRTL ? -size : size, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View testID={testID} style={{ transform: [{ scale: animatedScale }] }}>
      <Image source={baseSource} style={{ width: size, height: size, tintColor: baseColor }} />
      <Animated.View style={[styles.overlay, { transform: [{ translateX: translateOverlay }] }]}>
        <Animated.View style={{ transform: [{ translateX: translateSymbol }] }}>
          <Image source={fillSource} style={{ width: size, height: size, tintColor: fillColor }} />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
});

export default React.memo(RatingSymbol);
