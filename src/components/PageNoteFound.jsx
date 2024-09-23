import imgNotFound from '../assets/images/not-found.jpg'
import { Button } from './Button'
import { Footer } from './Footer'
import { NavBar } from './NavBar'

const PageNoteFound = () => {
  return (
    <>
      <NavBar isTienda={true} />
      <div className='[10rem] bg-claro flex flex-col justify-center items-center h-[80vh]'>
        <p className='font-bold font-ebGaramond text-8xl text-marron-200'>404</p>
        <p className='mt-2 text-2xl text-marron-200 font-inter'>Ups! Pagina no encontrada</p>

        <a href="/" className='mt-5'> 
          <Button className="bg-verde-100 hover:bg-verde-200 ">Volver a Inicio</Button>
        </a>
        
      </div>
      <Footer />
    </>
  )
}

export default PageNoteFound