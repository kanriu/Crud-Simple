import { useEffect } from "react";
import { useContext, useState } from "react";
import { GlobalContext } from "../global/GlobalContext";
import { useSnackbar } from "notistack";

const Formulario = () => {
  /*useContext es un hook que sirve para que se pueda extraer los parametros del GlobalContext, 
    global: que esta almacenado las variables globales, dispatch: es la función
    que sirve para ejecutar las acciones y mandar un payload(parametro) */
  const { global, dispatch } = useContext(GlobalContext);
  /*useSnackbar es un hook que sirve para que pueda llamar el parametro enqueueSnackbar y
  con eso se pueda llamar el "Toast"*/
  const { enqueueSnackbar } = useSnackbar();
  //El estado text es para que se pueda alimentar el input con el value y onChange.
  const [text, setText] = useState(global.focus);
  //Esta función realiza la actualización del estado "text" mediante un value que es string.
  const handleInputChange = (e: any) => {
    setText({ ...text, content: e.target.value });
  };
  //Esta función realiza el submit del formulario
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (text.id !== 0) {
      /*Si esta condicion se cumple, se va a enviar la action("UPDATE") y el payload(objeto)
    para que actualize el objeto seleccionado*/
      dispatch({
        type: "UPDATE",
        payload: text,
      });
      //Se muestra el toast
      enqueueSnackbar("Se actualizó correctamente", { variant: "success" });
    } else {
      /*Si esta condicion se cumple, se va a enviar la action("CREATE") y el payload(objeto)
    para que se agrege un nuevo objeto a la tabla*/
      dispatch({
        type: "CREATE",
        payload: { id: new Date().getTime(), content: text.content },
      });
      //Se muestra el toast
      enqueueSnackbar("Se agregó correctamente", { variant: "success" });
    }
    //Se actualiza el estado "text" a su valor inicial
    setText({ id: 0, content: "" });
  };

  /*Este efecto sirve que si el objeto "global" y su propiedad "focus" se altere su valor, 
  hace que el estado "text" se actualize por el mismo valor del focus, bajo una condición
  de que el valor del focus no debe estar vacia */
  useEffect(() => {
    if (global.focus.content !== "") {
      setText(global.focus);
    }
  }, [global.focus]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="row m-5">
        <div className="col-3 mx-auto">
          <label className="form-label">Texto:</label>
          <input
            className="form-control"
            type="text"
            value={text.content}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="row m-5">
        <div className="col-3 d-grid gap-2 mx-auto">
          <button type="submit" className="btn btn-outline-primary">
            {text.id !== 0 ? "EDITAR" : "AGREGAR"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Formulario;
