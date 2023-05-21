import { ImageSourcePropType } from 'react-native';

// Returns a value clamped to the inclusive range between min and max
export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

// Returns the distance between symbols based on a scaling factor
export function getSpacing(size: number, scale: number) {
  return size * Math.max(0, scale - 1);
}

// Returns an array of image sources with a size of maxRating
export function getSymbols<T>(
  baseSource: T,
  fillSource: T,
  maxRating: number,
): {
  baseSource: ImageSourcePropType;
  fillSource: ImageSourcePropType;
}[] {
  const baseArray = Array.isArray(baseSource) ? baseSource : Array(maxRating).fill(baseSource);
  const fillArray = Array.isArray(fillSource) ? fillSource : Array(maxRating).fill(fillSource);

  return baseArray.map((source, index) => ({ baseSource: source, fillSource: fillArray[index] }));
}
