/* eslint-disable react/prop-types */
import Slider from "react-slick";
import { Button } from "../Button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatPriceToARS, truncateDescription } from "../utils/utils";
import { useContext, useState } from "react";
import { ModalTienda } from "./ModalTienda";

import Context from "../../context/AppContext";

export const SliderProduct = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { productos, ActualizaCantidad } = useContext(Context);

  const openModal = (product) => {
    setSelectedProduct(product);
    ActualizaCantidad(1)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className={`xl:max-w-6xl 2xl:max-w-7xl px-8 md:px-16 lg:px-24 xl:px-0  mx-auto slider-container ${className}`}>
      <Slider {...settings}>
        {productos.map((producto, index) => (
          <div key={index} className="px-4 mb-8 md:px-6">
            <div className="items-center gap-16 xl:gap-24 lg:flex">
              <div className="justify-center mb-8 lg:w-1/2 md:flex lg:mb-0">
                <div className="w-full md:h-96">
                  <img
                    className="object-cover object-top w-full h-full rounded-xl md:object-cover"
                    alt="imagen producto"
                    src={producto.img}
                  />
                </div>
              </div>
              <div className="space-y-4 text-blanco lg:w-1/2 md:space-y-6 text-marron-200">
                <div>
                  <h2 className="mb-2 text-3xl font-bold md:text-4xl">
                    {producto.nombre}
                  </h2>
                  <p className="text-2xl font-bold">
                    {formatPriceToARS(producto.precio)}
                  </p>
                </div>

                <p className="md:text-[18px]">
                  {truncateDescription(producto.descripcion)}
                </p>

                <Button
                  className="w-full bg-verde-100 hover:bg-verde-200"
                  onClick={() => openModal(producto)}
                >
                  Ver más
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {isModalOpen && selectedProduct && (
        <ModalTienda
          id={selectedProduct.id}
          isOpen={isModalOpen}
          onClose={closeModal}
          nombre={selectedProduct.nombre}
          descripcion={selectedProduct.descripcion}
          precio={selectedProduct.precio}
          tamanio={selectedProduct.tamanio}
        >

        </ModalTienda>
      )}
    </div>
  );
};
