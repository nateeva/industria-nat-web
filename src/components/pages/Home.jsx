import { BannerIndex } from "../home/BannerIndex";
import { About } from "../home/About";
import { TiendaIndex } from "../home/TiendaIndex";
import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

export const Home = () => {

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-[68px]">
        <BannerIndex />
        <About />
        <TiendaIndex />
      </div>
      <Footer/>
    </>
  )
}

