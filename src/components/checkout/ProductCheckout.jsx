/* eslint-disable react/prop-types */
import { Counter } from "../Counter"
import { Icon } from "../Icon"
import { formatPriceToARS } from "../utils/utils"
import { FaTrash } from "react-icons/fa";

export const ProductCheckout = ({ title, price, cantidad }) => {
    return (
        <div className="items-center gap-4 mb-8 md:mb-6 md:flex text-marron-200">
            <div className=" lg:w-44">
                <img className="object-cover w-full h-full" src="images/product_index.png" alt="Imagen de producto" />
            </div>
            <div className="items-center hidden gap-8 md:flex lg:gap-20 xl:gap-8">
                <div className="space-y-1 w-44">
                    <h3 className="font-bold leading-5">{title}</h3>
                </div>

                <p>x { cantidad}</p>

                <p className="font-bold">{formatPriceToARS(price)}</p>

            </div>

            <div className="items-center gap-8 pt-4 md:hidden">
                <div className="flex justify-between">
                    <h3 className="text-[18px] font-bold leading-5">{title}</h3>
                    <Icon
                        icon={<FaTrash size={20} />}

                    />
                </div>
                <div className="flex items-baseline justify-between pt-4">
                    <p className="font-bold text-[18px]">{formatPriceToARS(price)}</p>
                    <Counter />
                </div>

            </div>
        </div>
    )
}


