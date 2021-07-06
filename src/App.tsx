import { useReducer } from "react";
import CrudSimple from "./components/CrudSimple";
import { GlobalContext } from "./global/GlobalContext";
import { globalReducer } from "./global/globalReducer";

const App = () => {
  /* Se declara el useReducer, que tiene como parámetros el globalReducer
  (en este caso solo hay uno y no es necesario crear un store), initialValues(los valores iniciales)*/

  const initialValues = {
    text: [],
    focus: { id: 0, content: "" },
  };
  const [global, dispatch] = useReducer(globalReducer, initialValues);
  return (
    <>
      <GlobalContext.Provider value={{ global, dispatch }}>
        <CrudSimple />
      </GlobalContext.Provider>
    </>
  );
};

export default App;
