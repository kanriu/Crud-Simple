import { createContext } from "react";

//Es una regla que debe seguir el globalReducer cuando se este ejecutando los actions.
interface IContextProps {
  global: {
    text: [id: number, content: string];
    focus: { id: number; content: string };
  };
  dispatch: ({ type }: { type: string; payload: any }) => void;
}

export const GlobalContext = createContext({} as IContextProps);
