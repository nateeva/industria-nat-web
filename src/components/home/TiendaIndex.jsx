import { Button } from "../Button";
import TitlePrimary from "../TitlePrimary";

export const TiendaIndex = () => {
  const words1 = ["industria"];
  const words2 = ["natural"];

  return (
    <div className='px-6 py-24 bg-claro font-ebGaramond md:px-16 bg-tienda-mobile '>
      <div className='items-center mx-auto md:flex max-w-7xl'>

        <div className='flex-1 order-1'>
          <div className='flex justify-center'>
            <TitlePrimary words1={words1} words2={words2} dynamic={false} className="" />
          </div>

          <p className='my-8 lg:px-24 font-ebGaramond text-marron-200 md:text-xl md:text-center'>Del mundo, a tu casa. Sin moverte. Calculá el envio agregando al carrito los articulos que te interesan.</p>

          <div className='flex justify-center'>

            <a href="/tienda">
              <Button className="bg-marron-50 hover:bg-marron-100 font-ebGaramond">tienda virtual</Button>
            </a>


          </div>

        </div>

        <div className='flex flex-col flex-1 gap-6 mt-8 md:m-0 bg-tienda lg:p-8 '>
          <div className='w-full mx-auto md:w-80 lg:w-96 h-60'>
            <img className='object-cover w-full h-full ' src="images/product_index_2.png" alt="Imagen de producto" />
          </div>
          <div className='w-full mx-auto md:w-80 lg:w-96 h-60'>
            <img className='object-cover w-full h-full ' src="images/product_index.png" alt="Imagen de producto" />
          </div>
        </div>
      </div>

    </div>
  )
}
