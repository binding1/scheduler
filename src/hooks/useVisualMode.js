import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((history) => [newMode, ...history.slice(1)]);
    } else {
      setHistory((history) => [newMode, ...history]);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((history) => history.slice(1));
    }
  };

  return { mode: history[0], transition, back };
}
