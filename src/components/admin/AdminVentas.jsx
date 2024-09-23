import React from 'react'
import { NavBar } from '../NavBar'
import { Title } from '../envio/Title'
import { TableVentas } from './TableVentas'

export const AdminVentas = () => {
  return (
    <>
      <NavBar isAdmin={true} />
      <div className="px-6 pt-16 mx-auto md:px-16 lg:max-w-7xl">
        <Title
          title="Administracion de Ventas"
          className="pb-4 mt-10" />
        <TableVentas />
      </div>
    </>
  )
}
