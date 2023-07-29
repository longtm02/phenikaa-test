import { useEffect, useRef } from "react";
type UseDebounce = () => (cb: () => void, time?: number) => void;
const useDebounce: UseDebounce = () => {
  const typingSearchRef = useRef<ReturnType<typeof setTimeout> | undefined>();

  useEffect(() => {
    return () => {
      if (typingSearchRef.current) {
        clearTimeout(typingSearchRef.current);
      }
    };
  }, []);

  return (cb: () => void, time: number = 500): void => {
    if (typingSearchRef.current) {
      clearTimeout(typingSearchRef.current);
    }

    typingSearchRef.current = setTimeout(() => {
      cb();
    }, time);
  };
};

export default useDebounce;
