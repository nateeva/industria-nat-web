import { IoMdCheckmark } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { PiCreditCardBold } from "react-icons/pi";
import { StepsCheckout } from "../checkout/StepsCheckout";
import { Container } from "../checkout/Container";
import { ItemPrice } from "../ItemPrice";
import { useContext, useEffect, useState } from "react";
import Context from "../../context/AppContext";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { NavBar } from "../NavBar"
import { Footer } from "../Footer";
import { BannerTienda } from "../tienda/BannerTienda";

export const Checkout = () => {

  initMercadoPago('APP_USR-b71226e7-60c2-4080-887e-0999df406dab');

  // --- Context (carrito)
  const { limpiarCarrito, getTotalCarrito, getTotalProductos, costoEnvios, claveMp } = useContext(Context);

  const [datosFacturacion, setDatosFacturacion] = useState([]);
  
  const [walletGenerado, setWalletGenerado] = useState(false); // Estado para controlar la generación del wallet

  useEffect(() => {
    // Recuperar formData desde localStorage
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setDatosFacturacion([parsedData]);  // Almacenar los datos en el estado
    }
  }, []);  

  useEffect(() => {
    // Restablecer el estado del wallet si se editan los datos
    setWalletGenerado(false);
  }, [datosFacturacion]);


    // Función para manejar el clic en Wallet
    const handleWalletClick = () => {
        limpiarCarrito(); // Llamamos la función para limpiar el carrito
    };

  return (
    <>
      <NavBar isTienda={true} />
      <BannerTienda/>
      <div className="px-6 pb-32 mx-auto md:px-16 lg:max-w-7xl">
        <div className="pt-12">
          <StepsCheckout
            icon={<IoMdCheckmark size={24} />}
            icon2={<TbTruckDelivery size={24} />}
            icon3={<PiCreditCardBold size={24} />}
            styleType1="style1"
            styleType2="style1"
            styleType3="style1"
          />

        </div>

        <div className="gap-8 xl:flex">

          <Container title="Datos de facturación" className="flex flex-col justify-between xl:w-1/2">
            {datosFacturacion.length > 0 ? (
              datosFacturacion.map((dato, index) => (
                <div key={index} className=" text-marron-200">
                  <p>{dato.nombre} - {dato.email}</p>
                  <p>Documento: {dato.documento}</p>
                  <p>Teléfono: {dato.telefono}</p>
                  <p className="mt-2">Dirección: {dato.direccion} {dato.pisoDpto} </p>
                  <p>{dato.localidad}, {dato.provincia}, {dato.codigoPostal}</p>
                  <p>Entre calles: {dato.entreCalle}</p>
                  <p className="mt-2">Tipo de Envío: {dato.tipoEnvio}</p>
                </div>
              ))
            ) : (
              <p>No hay datos de facturación disponibles.</p>
            )}


            <a href="/envio">
              <div className="flex justify-end text-sm underline text-marron-200">
                editar
              </div>
            </a>
          </Container>


          <Container title="Resumen de compra" className="flex-1 pt-12 lg:mt-8 h-fit xl:mt-0">
            <div className="mb-4 lg:pt-16 xl:pt-4">
              <ItemPrice title="Total Productos" price={getTotalProductos()} className="mb-2 font-medium" />
              {costoEnvios.importe && (
                <ItemPrice title="Total Envío" price={costoEnvios.importe} className="mb-2 font-medium" />
              )}

              <ItemPrice title="Total" price={getTotalCarrito()} className="pt-2 mt-4 text-xl border-t-2 border-verde-100" />

            </div>
           {
              claveMp && !walletGenerado && (  // Verifica si el wallet ya ha sido generado
                <Wallet 
                    initialization={{ preferenceId: claveMp, redirectMode: 'self' }} 
                    customization={{ texts: { valueProp: 'smart_option' } }} 
                    onSubmit={() => {
                      handleWalletClick();
                      setWalletGenerado(true); // Marca que el wallet ya fue generado
                    }}
                />
              )
            }
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};
