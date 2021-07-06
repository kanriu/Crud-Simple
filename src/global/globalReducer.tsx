export const globalReducer = (state: any, action: any) => {
  switch (action.type) {
    //Agrega un nuevo objeto que contiene el "action.payload" a la tabla que esta almacenado en el array "text"
    case "CREATE":
      return {
        ...state,
        text: [...state.text, action.payload],
      };
    //Almacena el objeto a "focus" para que luego se pueda observar en el input
    case "READ":
      return {
        ...state,
        focus: action.payload,
      };
    /*Actualiza el array "text" mediante un "map" bajo la condición de la igualdad del id del "action.payload"
    con el id del item, cuando sea "true" se reemplaza el content del "action.payload" por el del content del item*/
    case "UPDATE":
      const object = action.payload;
      return {
        ...state,
        text: state.text.map((item: any) => {
          item.id === object.id && (item.content = object.content);
          return item;
        }),
        focus: { id: 0, content: "" },
      };
    /*Elimina el objeto mediante un "filter" que solo pasan los objetos que sus ids no sean igual que el id del
    "action.payload"*/
    case "DELETE":
      return {
        ...state,
        text: state.text.filter((item: any) => item.id !== action.payload),
      };
    //En el caso de que no sea ninguno de esos actions, solo se retorna el mismo estado
    default:
      return state;
  }
};
