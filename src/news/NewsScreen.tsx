import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useInterval} from '../hooks/useInterval';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

export default function NewsFeedScreen() {
  const logPolling = useCallback(() => {
    console.log('news feed polling');
  }, []);

  useInterval(logPolling, 3000);

  const offset = useSharedValue(0);
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });

  const rotationAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  return (
    <View style={styles.container}>
      <Text>News Fees!</Text>
      <Button
        onPress={() => {
          // offset.value = withSpring(Math.random() * 255, {}, finished => {
          //   if (finished) {
          //     console.log('ANIMATION ENDED');
          //   } else {
          //     console.log('ANIMATION GOT CANCELLED/INTERUPTED');
          //   }
          // });
          // rotation.value = withRepeat(withTiming(10, {duration: 500}), 8, true);
          rotation.value = withSequence(
            withTiming(-20, {duration: 50}),
            withRepeat(withTiming(20, {duration: 100}), 8, true),
            withTiming(0, {duration: 50}),
          );
        }}
        title={'run worklet'}
      />
      <Animated.View style={[styles.box, animatedStyles]}></Animated.View>
      <Animated.View style={[styles.box, rotationAnimatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: 'green',
  },
});
