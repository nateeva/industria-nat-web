import React from 'react'
import { Button } from '../../Button'
import { IoCloseSharp } from "react-icons/io5";

export const EliminarProducto = ({ producto, onClose }) => {

    const handleConfirmar = () => {
        console.log('paso en cancelar')
        onClose()
    }

  return (
    <>
      <div className='py-6 text-center text-marron-200'>¿Está seguro de eliminar el producto <b>{producto.nombre}?</b></div>
      <div className="justify-start gap-4 mt-4 md:flex">
        <Button
          onClick={onClose}
          className="w-full mb-2 md:mb-0 bg-gris-50 hover:bg-gris-100"
        >
          Cancelar
        </Button>
        <Button onClick={handleConfirmar} className="w-full bg-verde-100 hover:bg-verde-200">            
          Eliminar
        </Button>
      </div>
    </>
  )
}
