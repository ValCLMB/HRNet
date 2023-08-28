import { useState } from "react";

export const useLocalData = <T,>(key: string) => {
  const localData = localStorage.getItem(key);

  const [datas] = useState<T[]>(() => (localData ? JSON.parse(localData) : []));

  const addToLocalStorage = (data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  return { datas, addToLocalStorage };
};
