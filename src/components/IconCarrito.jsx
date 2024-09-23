/* eslint-disable react/prop-types */
import { Icon } from "./Icon"


const style1 = "p-3 text-white duration-200 ease-in-out border-2 rounded-full border-claro transition-color bg-marron-200 w-fit hover:text-white ";
const style2 = "p-3 border-2 rounded-full text-marron-200 border-marron-200 w-fit hover:text-[#574D4B] ";


export const IconCarrito = ({ styleType = "style1", icon }) => {
    const selectedStyle = styleType === "style2" ? style2 : style1;
    return (
        <>
            <Icon
                icon={icon}
                className={selectedStyle} />
        </>

    )
}
