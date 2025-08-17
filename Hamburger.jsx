import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const HamburgerIcon = ({ size = 30, color = '#000', onPress }) => {
  const barHeight = size / 8;
  const barWidth = size;
  const barMargin = barHeight / 1.5;

  return (
    <TouchableOpacity onPress={onPress} style={{ padding: size / 4 }}>
      <View style={[styles.bar, { width: barWidth, height: barHeight, backgroundColor: color, marginBottom: barMargin }]} />
      <View style={[styles.bar, { width: barWidth, height: barHeight, backgroundColor: color, marginBottom: barMargin }]} />
      <View style={[styles.bar, { width: barWidth, height: barHeight, backgroundColor: color }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bar: {
    borderRadius: 2,
  },
});

export default HamburgerIcon;