import { useContext, useState } from "react"
import Context from "../context/AppContext";

const CounterCarrito = ({id, className, valorInicial}) => {

    const { editarCantidadProducto } = useContext(Context);

    const [ contador, setContador ] = useState(valorInicial)

    const restar = () => {
        var valorAct = contador
        valorAct = valorAct - 1
        if (valorAct > 0){
            setContador(valorAct)
            editarCantidadProducto(id, 'R')
        }
    }

    const sumar = () => {
        var valorAct = contador
        valorAct = valorAct + 1
        setContador(valorAct)
        editarCantidadProducto(id, 'S')
    }

    return (
        <div className={`flex items-center text-[18px] border-2 border-verde-100 font-inter text-verde-100 justify-between bg-claro ${className}`}>
            <button className='w-10 h-10 hover:bg-[#DEDCD6]' onClick={restar}>-</button>
            <div className='flex items-center justify-center w-10 h-10'>{contador}</div>
            <button className='w-10 h-10 hover:bg-[#DEDCD6]' onClick={sumar}>+</button>
        </div>
    );
}

export default CounterCarrito