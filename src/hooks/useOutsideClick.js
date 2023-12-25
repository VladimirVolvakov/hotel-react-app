import { useEffect, useRef } from "react";

export const useOutsideClick = (handlerFn, listenCapturing = true) => {
  const windowRef = useRef();

  useEffect(() => {
    const clickHandler = (event) => {
      if (windowRef.current && !windowRef.current.contains(event.target)) {
        handlerFn();
      }
    };

    document.addEventListener("click", clickHandler, listenCapturing);

    return () =>
      document.removeEventListener("click", clickHandler, listenCapturing);
  }, [handlerFn, listenCapturing]);

  return windowRef;
};
