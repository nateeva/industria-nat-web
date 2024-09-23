import { Title } from '../envio/Title'
import { NavBar } from '../NavBar'
import TableProducts from './TableProducts'

export const AdminProductos = () => {
  return (
    <>
      <NavBar isAdmin={true} />
      <div className="px-6 pt-16 mx-auto md:px-16 lg:max-w-7xl">
        <Title
          title="Administracion de productos"
          className="pb-4 mt-10" />

        <TableProducts />
      </div>
    </>
  )
}
