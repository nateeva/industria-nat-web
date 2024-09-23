import { Icon } from "./Icon";
import { MdClose } from "react-icons/md";

/* eslint-disable react/prop-types */
export const PopUp = ({message, isVisible, onClose}) => {
    if (!isVisible) return null;

    return (
        <>
            {/* Fondo oscuro */}
            <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75" />

            {/* Popup */}
            <div className="fixed z-50 p-4 border border-gray-300 shadow-lg bg-claro bottom-4 right-4 animate-slide-in-right">
                <div className="flex items-center justify-between text-marron-200">
                    <p className="text-lg font-semibold">{message}</p>
                    <button
                        className="ml-4 "
                        onClick={onClose}
                    >
                        <Icon icon={<MdClose size={25}/>}/>
                    </button>
                </div>
            </div>
        </>
    )
}
