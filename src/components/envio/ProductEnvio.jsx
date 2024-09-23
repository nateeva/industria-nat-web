/* eslint-disable react/prop-types */
import { formatPriceToARS } from "../utils/utils"

export const ProductEnvio = ({ title, unidades, price }) => {
    return (
        <div className="flex items-center justify-between gap-6 mb-4 text-marron-200">
            <div className="w-36">
                <img className="object-cover w-full h-full" src="images/product_index.png" alt="Imagen de producto" />
            </div>
            <div className="flex-1">
                <div className="mb-4">
                    <h2 className="font-semibold leading-5">{title}</h2>
                    <p>{unidades} x {price}</p>
                </div>
                <p className="font-bold">{formatPriceToARS(unidades * price)}</p>
            </div>
        </div>
    )
}
