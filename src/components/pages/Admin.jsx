import { NavBar } from '../NavBar'
import { Title } from '../envio/Title'
import { CardAdmin } from '../admin/CardAdmin'
import bgcard1 from '../../assets/images/fungi-1.jpg'
import bgcard2 from '../../assets/images/fungi-3.jpg'
import bgcard3 from '../../assets/images/fungi-2.jpg'

export const Admin = () => {
  return (
    <>
      <NavBar isAdmin={true} />
      <div className="px-6 pt-16 mx-auto md:px-16 lg:max-w-7xl">
        <Title
          title="Panel de administración"
          className="pb-4 mt-10" />

        <div className='flex flex-col md:flex-row justify-center max-w-5xl md:gap-8 mx-auto md:min-h-[70vh] items-center pb-12 gap-4'>

          <a href="/admin/productos" className='w-full'>
            <CardAdmin
              title="Productos"
              backgroundImage={bgcard1}
            />
          </a>

          <a href="/admin/ventas" className='w-full'>
            <CardAdmin
              title="Ventas"
              backgroundImage={bgcard2}
            />
          </a>

          <a href="/admin/envios" className='w-full'>
            <CardAdmin
              title="Envios"
              backgroundImage={bgcard3}
            />
          </a>
        </div>

      </div>
    </>
  )
}
