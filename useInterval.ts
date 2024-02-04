import { useEffect, useRef } from 'react';

/**
 * 定时器
 * @param fn
 * @param delay
 * @param options
 */
export default function useInterval(
  fn: () => void,
  delay: number | null | undefined,
  options?: {
    immediate?: boolean;
  }
): void {
  const immediate = options?.immediate;
  const timerRef = useRef<() => void>();
  timerRef.current = fn;
  useEffect(() => {
    if (delay === undefined || delay === null) {
      return;
    }
    if (immediate) {
      timerRef.current?.();
    }
    const timer = setInterval(() => {
      timerRef.current?.();
    }, delay);
    
    return () => {
      clearInterval(timer);
    };
  }, [delay, immediate]);
}
