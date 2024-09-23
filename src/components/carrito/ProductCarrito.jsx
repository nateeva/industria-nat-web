/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Counter } from "../Counter";
import { Icon } from "../Icon"
import { formatPriceToARS } from "../utils/utils"
import { FaTrash } from "react-icons/fa";
import Context from "../../context/AppContext";
import CounterCarrito from "../CounterCarrito";
import productoImg from "../../assets/images/product_index.png"

export const ProductCarrito = ({ id, title, subtitle, img, price, cantidad }) => {

    // --- Context (eliminar)
    const { eliminarProducto } = useContext(Context);

    return (
        <div className="items-center mb-8 lg:flex lg:gap-12 text-marron-200">
            <div className="h-auto lg:max-w-64">
                <img
                    className="object-cover w-full h-full"
                    src={productoImg}
                    alt={`Imagen de ${title}`} />
            </div>

            <div className="items-center justify-between hidden w-full lg:flex">
                <div className="w-1/2">
                    <h2 className="mr-6 font-bold">{title}</h2>
                </div>

                <div className="items-center justify-between w-full lg:flex">
                    <CounterCarrito
                    id={id}
                    valorInicial={cantidad}
                    />

                    <p className="mb-2 font-bold">{formatPriceToARS(price)}</p>

                    <Icon
                    icon={<FaTrash size={18} />}
                    onClick={() => eliminarProducto(id)} />
                </div>
            </div>

            <div className="lg:hidden">
                <div className="flex items-center justify-between mt-4">
                    <h2 className="font-bold">{title}</h2>
                    <Icon
                    icon={<FaTrash size={18} />}
                    onClick={() => eliminarProducto(id)} />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <p className="mb-2 font-bold">{formatPriceToARS(price)}</p>
                    <CounterCarrito
                    id={id}
                    valorInicial={cantidad}
                    />
                </div>
            </div>
        </div>
    )
}
