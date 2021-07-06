import { useContext } from "react";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalContext } from "../global/GlobalContext";
import { useSnackbar } from "notistack";

const Tabla = () => {
  /*useContext es un hook que sirve para que se pueda extraer los parametros del GlobalContext, 
    global: que esta almacenado las variables globales, dispatch: es la función
    que sirve para ejecutar las acciones y mandar un payload(parametro) */
  const { global, dispatch } = useContext(GlobalContext);
  /*useSnackbar es un hook que sirve para que pueda llamar el parametro enqueueSnackbar y
    con eso se pueda llamar el "Toast"*/
  const { enqueueSnackbar } = useSnackbar();
  //Este array vacio sirve para la comparación con el objeto "global" y su propiedad "text" que es un array
  const arrayVacio = [];
  /*Esta función sirve para que se haga el envio a la action "READ", con el payload "value" que es un objeto,
    para que pueda aparecer el texto al input. Que esta almacenado en el "value" con la propiedad "content"*/
  const handleFocus = (value: object) => {
    dispatch({ type: "READ", payload: value });
  };
  /*Esta función realiza el envio a la action "DELETE", con el payload "value" que es un number que contiene el id
    de la fila seleccionada, para que pueda eliminar esa fila en la tabla. */
  const handleDelete = (value: number) => {
    //Esta condición es para que no se pueda eliminar una fila mientras se este editando.
    if (global.focus.id === value) {
      //Se muestra el toast
      enqueueSnackbar(
        "No se puede eliminar, mientras se esta editando este texto",
        { variant: "error" }
      );
    } else {
      dispatch({ type: "DELETE", payload: value });
      //Se muestra el toast
      enqueueSnackbar("Se eliminó correctamente", { variant: "success" });
    }
  };

  return (
    <div className="row">
      <div className="col-md-5 col-sm-12 mx-auto">
        <table className="table table-dark table-hover text-center">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Texto</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {global.text.length === arrayVacio.length ? (
              <tr>
                <td colSpan={3}>No hay ningún registro</td>
              </tr>
            ) : (
              global.text?.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.content}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className="cursor-pointer m-1"
                      onClick={() => handleFocus(item)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="cursor-pointer m-1"
                      onClick={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tabla;
