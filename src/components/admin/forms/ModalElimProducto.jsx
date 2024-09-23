import { Box, Modal } from "@mui/material";
import { Button } from "../../Button";
import axios from "axios";
import { apiUrl } from "../../../config/config";


const ModalElimProducto = ({ open, handleClose, producto, refrescarProductos }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',  // Permite el scroll en el modal
  }

  const handleEliminarProducto = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/productos/${producto.id}`);
      if (response.status === 200) {
        refrescarProductos();
        handleClose();
      }
    } catch (error) {
      console.error("Error accediendo a la api productos", error);
    }
  }


  return (

    <>

      <Modal
        open={open}
        onClose={handleClose} // Cierra el modal al hacer clic fuera
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[90%] md:max-w-lg">
          <h2 className='mb-4 text-2xl font-bold text-center text-marron-200'>Eliminar producto</h2>

          <div className='py-6 text-center text-marron-200'>¿Está seguro de eliminar el producto <b>{producto.nombre}?</b></div>
          <div className="justify-start gap-4 mt-4 md:flex">
            <Button
              onClick={handleClose}
              className="w-full mb-2 md:mb-0 bg-gris-50 hover:bg-gris-100"
            >
              Cancelar
            </Button>

            <Button
              onClick={handleEliminarProducto}
              className="w-full bg-verde-100 hover:bg-verde-200"
            >
              Eliminar
            </Button>

          </div>

        </Box>
      </Modal>


    </>


  )
}

export default ModalElimProducto