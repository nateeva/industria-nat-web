import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Context from "../../context/AppContext";

const LimpiarCarrito = () => {
    const navigate = useNavigate(); // Inicializa useNavigate

    const { limpiarCarrito } = useContext(Context);

    useEffect(() => {
        limpiarCarrito();
        navigate("/"); // Redirige al componente /pago
    }, []);
    
    return (
        <div>Limpiando el carro</div>
    )
}

export default LimpiarCarrito
