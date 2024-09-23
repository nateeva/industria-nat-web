import { SliderProduct } from "../tienda/SliderProduct"
import { NavBar } from "../NavBar"
import { Footer } from "../Footer"
import { BannerTienda } from "../tienda/BannerTienda"
import { useEffect } from "react"

export const Tienda = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
