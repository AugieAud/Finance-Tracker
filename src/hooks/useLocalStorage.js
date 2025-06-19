import { useState, useEffect } from "react";

//state uses lazy initializer function (a function instead of direct value) only runs function once when the component first mounts
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  });

  //useEffect runs everytime key or value changes, saves current value to localStorage, keeping localStorage in sync w state.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
