
import { useContext } from "react";
import { Button } from "../Button";
import { ItemPrice } from "../ItemPrice";
import { ProductCarrito } from "./ProductCarrito";
import Context from "../../context/AppContext";
import { StepsCheckout } from "../checkout/StepsCheckout";
import { IoMdCheckmark } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { PiCreditCardBold } from "react-icons/pi";
import { Container } from "../checkout/Container";
import { Link } from "react-router-dom";
import { NavBar } from "../NavBar";
import { Footer } from "../Footer";
import { BannerTienda } from "../tienda/BannerTienda";


export const CartContent = () => {

  // --- Context (carrito, total, limpiar)
  const { cart, getTotalCarrito, limpiarCarrito } = useContext(Context);

  // --- Cancelar compra
  const handleCancelarCompra = () => {
    limpiarCarrito()
  }

  return (
    <>
      <NavBar isTienda={true} />
      <BannerTienda/>
      <div className="px-6 mx-auto md:px-16 lg:max-w-7xl">
        {cart.length === 0 ? (
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
              styleType2="style2"
              styleType3="style2"
            />

            <Container title="Mi carrito">

              {cart.map((p) => (
                <ProductCarrito
                  key={p.id}
                  id={p.id}
                  title={p.nombre}
                  subtitle={p.tamanio}
                  price={p.precio}
                  cantidad={p.cantidad}
                />
              ))}
              <div className="mt-12 lg:mt-8">
                <ItemPrice
                  title="Total"
                  price={getTotalCarrito()}
                  className="text-[18px] border-t-2 border-verde-100 pt-3 pb-6"
                />

                <div className="gap-6 pt-6 md:flex">

                  <div className="mb-4 md:w-1/2">
                    <Button
                      onClick={handleCancelarCompra}
                      className="w-full bg-gris-50 hover:bg-gris-100"
                    >
                      Cancelar compra
                    </Button>
                  </div>

                  <div className="md:w-1/2">
                    <a href="/envio">
                      <Button className="w-full bg-verde-100 hover:bg-verde-200">Iniciar compra</Button>
                    </a>
                  </div>

                </div>
              </div>
            </Container>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
