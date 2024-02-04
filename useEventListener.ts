import { useEffect } from 'react';

type EventTarget = HTMLElement | Document | Window;

interface EventOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

type EventHandler = (event: Event) => void;


/**
 * 事件监听器
 * @param target 
 * @param type 
 * @param listener 
 * @param options 
 */
export default function useEventListener(
  target: EventTarget,
  type: keyof DocumentEventMap,
  listener: EventHandler,
  options?: EventOptions,
): void {
  useEffect(() => {
    const eventListenerOptions = options || false;
    target.addEventListener(type, listener, eventListenerOptions);
    return () => {
      target.removeEventListener(type, listener, eventListenerOptions);
    };
  }, [target, type, listener, options]);
}
