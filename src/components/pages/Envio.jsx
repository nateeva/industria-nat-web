import { useContext } from "react";
import { StepsCheckout } from "../checkout/StepsCheckout"
import { IoMdCheckmark } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { PiCreditCardBold } from "react-icons/pi";

import { ItemPrice } from "../ItemPrice";
import { Container } from "../checkout/Container";
import { Form } from "../envio/Form";
import { ProductEnvio } from "../envio/ProductEnvio";
import Context from "../../context/AppContext";
import { formatPriceToARS } from "../utils/utils";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { NavBar } from "../NavBar"
import { Footer } from "../Footer";
import { BannerTienda } from "../tienda/BannerTienda";

export const Envio = () => {

  const { cart, getTotalCarrito, costoEnvios } = useContext(Context);

  return (
    <>
      <NavBar isTienda={true} />
      <BannerTienda/>
      <div className="px-6 pt-8 mx-auto md:px-16 lg:max-w-7xl">
        {
          cart.length === 0 ? (

            <div className="flex flex-col md:items-center justify-center md:justify-start md:mt-32 mx-auto md:h-[60vh] h-[80vh]">
              <div className="text-xl text-center font-inter text-marron-200">
                <p className='mb-4 font-bold md:mb-2'>El carrito está vacío</p>
                <p className="font-medium text-base md:text-[18px]">Mira nuestros productos disponibles en la tienda virtual</p>
              </div>
              <Link to="/tienda">
                <Button
                  className="mt-10 w-full md:w-[350px] bg-verde-100 hover:bg-verde-200"
                >
                  Ver tienda
                </Button>
              </Link>
            </div>

          ) : (
            <div className="pt-12 pb-32">

              <StepsCheckout
                icon={<IoMdCheckmark size={24} />}
                icon2={<TbTruckDelivery size={24} />}
                icon3={<PiCreditCardBold size={24} />}
                styleType1="style1"
                styleType2="style1"
                styleType3="style2"
              />

              <div className="gap-8 pt-6 lg:flex xl:gap-24">

                <div className="mb-12 md:mb-0">
                  <Container title="Resumen de compra" className="flex-1 h-fit xl:w-[420px]">
                    <div className="pt-4">

                      {cart.map((p) => (
                        <ProductEnvio
                          key={p.id}
                          title={p.nombre}
                          unidades={p.cantidad}
                          price={p.precio}
                        />
                      ))}

                      {costoEnvios.importe && (
                        <div className="flex justify-between font-medium text-marron-200">
                          <div>Costos de Envío</div>
                          <div>{formatPriceToARS(costoEnvios.importe)}</div>
                        </div>
                      )}

                      <ItemPrice title="Total" price={getTotalCarrito()} className="pt-3 mt-4 text-xl border-t-2 border-verde-100" />
                    </div>
                  </Container>
                </div>

                <div className="mb-12 xl:w-1/2 lg:mb-0 lg:w-2/3 md:order-first">
                  <Form />
                </div>
              </div>
            </div>
          )
        }
      </div>
      <Footer />
    </>
  )
}


