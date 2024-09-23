/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

export const Icon = ({ icon, className, ...props }) => {
    return (
        <div {...props} 
            className={`transition duration-150 ease-in-out cursor-pointer hover:text-verde-50 text-marron-200 ${className}`}>
            {icon || <FaStar />} 
        </div>
    );
};

