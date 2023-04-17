import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useInterval} from '../hooks/useInterval';
import {GestureExampleProps} from '../NavigationTypes';
import {
  GestureEvent,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

export default function GesturesExample({
  navigation,
  route,
}: GestureExampleProps) {
  const pressed = useSharedValue(false);
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? 'yellow' : 'blue',
      transform: [
        // {scale: withSpring(pressed.value ? 1.4 : 1)},
        {translateX: x.value},
        {translateY: y.value},
      ],
    };
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: {startX: number; startY: number}) => {
      pressed.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx: {startX: number; startY: number}) => {
      console.log(event.translationX);
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx: {startX: number; startY: number}) => {
      pressed.value = false;
      x.value = withSpring(x.value);
      y.value = withSpring(y.value);
    },
  });

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[styles.ball, animatedStyles]} />
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  box: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  ball: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
  },
});
