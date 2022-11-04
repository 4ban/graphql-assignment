import { useEffect, useState } from 'react';

/**
 * Returns the window width and height.
 *
 * @author Taken from https://usehooks-ts.com/react-hook/use-debounce
 * @licence MIT, ok for commercial use. https://github.com/juliencrn/usehooks.ts/blob/develop/LICENSE
 */

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
