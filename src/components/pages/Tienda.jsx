import { SliderProduct } from "../tienda/SliderProduct"
import { NavBar } from "../NavBar"
import { Footer } from "../Footer"
import { BannerTienda } from "../tienda/BannerTienda"

export const Tienda = () => {
  return (
    <>
      <NavBar isTienda={true} />
      <BannerTienda/>
      <div>
        <SliderProduct className="flex flex-col justify-center my-16 lg:h-[90vh] lg:my-0" />
      </div>
      <Footer/>
    </>

  )
}
