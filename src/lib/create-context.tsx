import { createContext, useContext } from 'react';

export const createStrictContext = <T,>(name: string) => {
  const Context = createContext<T | null>(null);

  const useStrictContext = (): T => {
    const value = useContext(Context);
    if (value === null) throw new Error(`${name} is used outside of its provider`);
    return value;
  };

  return [Context.Provider, useStrictContext] as const;
};
