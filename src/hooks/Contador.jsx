import { useState, useContext } from "react"
import Context from "../context/AppContext";

const Contador = (valorInicial) => {

    const [ contador, setContador ] = useState(valorInicial)
    const { cantidadPedida, ActualizaCantidad } = useContext(Context);

    const sumar = () => {
        const nuevoContador = contador + 1;
        setContador(nuevoContador);
        ActualizaCantidad(nuevoContador);
    }
    const restar = () => {
        if (contador > 1) {
            const nuevoContador = contador - 1;
            setContador(nuevoContador);
            ActualizaCantidad(nuevoContador);
        }
    }

    return {contador, sumar, restar}

}

export default Contador