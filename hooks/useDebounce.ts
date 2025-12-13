import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
      const [debouncedValue, setDebouncedValue] = useState(value);

      useEffect(() => {
            // Set a timeout to update the debounced value after the specified delay
            const handler = setTimeout(() => {
                  setDebouncedValue(value);
            }, delay);

            // Clean up the timeout if the value changes (user keeps typing)
            return () => {
                  clearTimeout(handler);
            };
      }, [value, delay]);

      return debouncedValue;
}
