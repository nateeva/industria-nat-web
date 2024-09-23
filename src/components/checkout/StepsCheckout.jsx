import { FaStar } from "react-icons/fa";

const style1 = "p-3 text-white duration-200 ease-in-out border-2 rounded-full border-claro transition-color bg-marron-200 w-fit hover:text-white";
const style2 = "p-3 border-2 rounded-full text-marron-200 border-marron-200 w-fit hover:text-[#574D4B]";

// eslint-disable-next-line react/prop-types
export const StepsCheckout = ({ icon, icon2, icon3, styleType1 = "style1", styleType2 = "style1", styleType3 = "style1" }) => {
    
const getStyle = (styleType) => styleType === "style2" ? style2 : style1;

    return (
        <div className="flex items-center max-w-sm px-6 py-12 mx-auto md:px-0">
            <div className="flex flex-col items-center">
                <div className={getStyle(styleType1)}>
                    {icon || <FaStar />}
                </div>
                <span className="mt-2 text-sm font-semibold text-marron-200">Carrito</span>
            </div>
            <div className="flex-grow h-8 mx-4 border-t-2 border-marron-200" />
            <div className="flex flex-col items-center">
                <div className={getStyle(styleType2)}>
                    {icon2 || <FaStar />}
                </div>
                <span className="mt-2 text-sm font-semibold text-marron-200">Envio</span>
            </div>
            <div className="flex-grow h-8 mx-4 border-t-2 border-marron-200" />
            <div className="flex flex-col items-center">
                <div className={getStyle(styleType3)}>
                    {icon3 || <FaStar />}
                </div>
                <span className="mt-2 text-sm font-semibold text-marron-200">Pago</span>
            </div>
        </div>
    );
};


