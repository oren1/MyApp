import {useEffect, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';

type CallbackType = () => void;

export function useInterval(callback: CallbackType, delay: number) {
  const savedCallback = useRef<CallbackType>();

  useFocusEffect(() => {
    savedCallback.current = callback;

    function tick() {
      savedCallback.current?.();
    }

    if (delay != null) {
      console.log('created new interval');
      let intervalId = setInterval(tick, delay);

      return () => {
        console.log('cleared Interval');
        clearInterval(intervalId);
      };
    }
  });
}
