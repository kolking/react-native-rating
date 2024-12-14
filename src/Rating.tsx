import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  I18nManager,
  ImageSourcePropType,
  PanResponder,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import RatingSymbol from './RatingSymbol';
import { clamp, getSpacing, getSymbols } from './helpers';
import { Variants, getVariantProp } from './variants';

type SymbolSource = ImageSourcePropType | ImageSourcePropType[];

export interface RatingProps {
  variant?: `${Variants}`;
  size?: number;
  scale?: number;
  rating?: number;
  spacing?: number;
  disabled?: boolean;
  maxRating?: number;
  baseColor?: string;
  baseSymbol?: SymbolSource;
  fillColor?: string;
  fillSymbol?: SymbolSource;
  touchColor?: string;
  style?: StyleProp<ViewStyle>;
  onMove?: (rating: number) => void;
  onChange?: (rating: number) => void;
  testID?: string;
}

export const Rating = React.memo(
  ({
    variant = Variants.STARS,
    size = 30,
    scale = 1.3,
    rating = 0,
    spacing = getSpacing(size, scale),
    disabled = false,
    maxRating = 5,
    baseColor = getVariantProp(variant, 'baseColor'),
    baseSymbol = getVariantProp(variant, 'baseSymbol'),
    fillColor = getVariantProp(variant, 'fillColor'),
    fillSymbol = getVariantProp(variant, 'fillSymbol'),
    touchColor = getVariantProp(variant, 'touchColor'),
    style,
    onMove,
    onChange,
    testID,
  }: RatingProps) => {
    const width = size + spacing;
    const value = clamp(rating, 0, maxRating);
    const maxWidth = width * maxRating - spacing;
    const symbols = getSymbols(baseSymbol, fillSymbol, maxRating);

    const [interactive, setInteractive] = useState(false);

    const animatedSymbol = useRef(new Animated.Value(0)).current;
    const animatedOverlay = useRef(new Animated.Value(value)).current;
    const props = useRef({ value: 0, onMove, onChange });
    const offset = useRef(0);

    // Update props used in PanResponder to avoid stale values
    props.current = { ...props.current, onMove, onChange };

    useEffect(() => {
      if (!interactive) {
        props.current.value = 0;
        animatedSymbol.setValue(0);
        animatedOverlay.setValue(value);
      }
    }, [interactive, animatedSymbol, animatedOverlay, value]);

    const setAnimatedValues = (locationX: number) => {
      const newValue = I18nManager.isRTL
        ? clamp(Math.ceil(maxRating - locationX / width), 0, maxRating)
        : clamp(Math.ceil(locationX / width), 0, maxRating);

      if (newValue !== props.current.value) {
        props.current.value = newValue;
        animatedSymbol.setValue(newValue);
        animatedOverlay.setValue(newValue);
        if (props.current.onMove) {
          props.current.onMove(newValue);
        }
      }
    };

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: ({ nativeEvent: { pageX, locationX } }) => {
          // At this point the locationX is accurate, so we can store
          // the offset between pageX and locationX in order to derive
          // the correct locationX later in onPanResponderMove callback.
          offset.current = pageX - locationX;

          setInteractive(true);
          setAnimatedValues(locationX);
        },
        onPanResponderMove: ({ nativeEvent: { pageX } }) => {
          // On Android the nativeEvent.locationX is not reliable
          // when the touch moves over the wrapper element bounds.
          // But the pageX is accurate, therefore the correct value
          // can be calculated using previously stored offset:
          const locationX = pageX - offset.current;

          if (locationX > 0 && props.current.value > 0) {
            setAnimatedValues(locationX);
          } else {
            // Stop panning when touch goes over the left edge
            if (props.current.onMove) {
              props.current.onMove(0);
            }
            setInteractive(false);
          }
        },
        onPanResponderRelease: () => {
          if (props.current.onChange && props.current.value > 0) {
            props.current.onChange(props.current.value);
          }
          setInteractive(false);
        },
      }),
    ).current;

    return (
      <View
        {...(!disabled && panResponder.panHandlers)}
        style={[style, styles.root, { width: maxWidth }]}
        pointerEvents="box-only"
      >
        {symbols.map(({ baseSource, fillSource }, index) => (
          <RatingSymbol
            key={index}
            size={size}
            scale={scale}
            index={index + 1}
            disabled={disabled}
            baseColor={baseColor}
            fillColor={interactive ? touchColor : fillColor}
            baseSource={baseSource}
            fillSource={fillSource}
            animatedSymbol={animatedSymbol}
            animatedOverlay={animatedOverlay}
            testID={testID ? `${testID}-${index}` : `rating-symbol-${index}`}
          />
        ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    flexShrink: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
