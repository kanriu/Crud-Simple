import Formulario from "./Formulario";
import Tabla from "./Tabla";
import { SnackbarProvider } from "notistack";

const CrudSimple = () => {
  /*SnackbarProvider es implementado para que se pueda observar el "Toast", maxSnack es la cantidad de 
    "Toast" que se pueda observar en la aplicación, anchorOrigin son parametros para que se pueda posicionar
    el "Toast". 
    Formulario: Es el componente que se renderiza el input y el button
    Tabla: Es el componente que se renderiza la tabla*/
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Formulario />
      <Tabla />
    </SnackbarProvider>
  );
};

export default CrudSimple;
