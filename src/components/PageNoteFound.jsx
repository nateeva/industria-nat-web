import imgNotFound from '../assets/images/not-found.jpg'
import { Footer } from './Footer'
import { NavBar } from './NavBar'

const PageNoteFound = () => {
  return (
    <>
      <NavBar isTienda={true} />
      <div className='flex justify-center pt-[10rem]'>
        <img className='w-[30rem] h-[15rem]' src={imgNotFound} alt="Page not found" />
      </div>
      <Footer />
    </>
  )
}

export default PageNoteFound