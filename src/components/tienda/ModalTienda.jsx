import { useContext, useEffect, useState } from "react";
import Context from "../../context/AppContext";

import { formatPriceToARS } from "../utils/utils";
import { Counter } from "../Counter";
import { Icon } from "../Icon";
import { PopUp } from "../PopUp";
import { Button } from "../Button";
import { Accordion } from "./Accordion";

import { IoCloseSharp } from "react-icons/io5";
import { ResaltarPalabras } from "../utils/utilsText";

import producto from "../../assets/images/product_index.png"


/* eslint-disable react/prop-types */
export const ModalTienda = ({ isOpen, onClose, id, nombre, descripcion, precio, tamanio }) => {

  // --- Pop Up
  const [isPopupVisible, setPopupVisible] = useState(false);

  // --- Carrito
  const { cantidadPedida, addItem } = useContext(Context);

  const handleAddToCart = () => {
    const varItem = {
      id,
      nombre,
      precio
    }

    addItem(varItem, cantidadPedida)

    // mostrar popup
    setPopupVisible(true);

    // tiempo popup
    setTimeout(() => {
      setPopupVisible(false);
    }, 2000);
  };

  // cerrar popup
  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  // --- Background modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // --- Palabras a resaltar
  const palabrasAResaltar = [
    "deshidroepiandrosterona",
    "melena de león",
    "ashwagandha"
  ];

  return (
    <div className="fixed inset-0 z-50 w-screen overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      {/* background */}
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center">
        <div className="relative w-full text-left transition-all transform border rounded-lg shadow-xl bg-claro md:max-w-5xl">

          {/* Contenedor con scroll */}
          <div className="px-8 overflow-y-auto max-h-[90vh] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-verde-100 scrollbar-track-claro scrollbar-thin">
            
            <div className="flex justify-end py-3 -mr-4 md:pb-0">
              <Icon
                onClick={onClose}
                icon={<IoCloseSharp size={26} />} />
            </div>

            <div className="grid items-center gap-6 md:grid-cols-2 lg:gap-12 md:pr-2">
              <div className='h-80 md:order-first'>
                <img
                  className='object-cover w-full h-full rounded-md'
                  src={producto}
                  alt={`Imagen de ${nombre}`} />
              </div>

              <div>
                <div className='flex-col gap-4 md:flex font-inter text-marron-200'>
                  <div className=''>
                    <h2 className='mb-2 text-3xl font-bold md:text-4xl'>{nombre}</h2>
                    <p className="text-2xl font-bold">{formatPriceToARS(precio)}</p>
                  </div>
                  <p className='mt-4'>{tamanio}</p>
                </div>

                <div className="gap-4 mt-4 lg:flex">
                  <Counter cantInicial={1} className="w-full mb-2 lg:m-0 lg:w-40" />

                  <Button
                    className="w-full bg-verde-100 hover:bg-verde-200"
                    onClick={handleAddToCart}
                  >
                    Agregar al carrito
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-12 pb-10 space-y-4 md:px-4 md:pt-8">
              <ResaltarPalabras texto={descripcion} palabrasAResaltar={palabrasAResaltar} />
              <Accordion id={id} title="Propiedades" defaultOpen={true} />
            </div>
          
          </div>
        </div>
      </div>

      {/* Pop Up */}
      <PopUp
        message="¡Producto agregado al carrito!"
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
      />
    </div>
  );
};