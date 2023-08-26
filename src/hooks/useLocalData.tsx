import { useState } from "react";

export const useLocalData = <T,>(key: string) => {
  const localData = localStorage.getItem(key);

  const [employees] = useState<T[]>(() =>
    localData ? JSON.parse(localData) : []
  );

  return employees;
};
