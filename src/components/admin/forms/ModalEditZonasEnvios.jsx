import { Box, Modal } from "@mui/material";
import { Button } from "../../Button";
import { Input } from "../../envio/Input";
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../config/config";
import { formatPriceToARS } from "../../utils/utils";
import { IoCloseSharp } from "react-icons/io5";
import { Icon } from "../../Icon"

const ModalEditZonasEnvios = ({ open, handleClose, zona, refrescarZonas }) => {

  const [error, setError] = useState('');

  // Centraliza el estado del formulario
  const [dtosForm, setDtosForm] = useState({
    costoEnvio: ''
  });

  // Función para manejar los cambios de cada campo
  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "costoEnvio") {
      // Solo permitir números y un punto decimal
      const regex = /^\d*\.?\d*$/;
      if (!regex.test(value)) {
        return;  // Si no coincide con el patrón, no hace nada
      }
    }

    setDtosForm({
      ...dtosForm, // Mantén los valores anteriores del formulario
      [name]: value,  // Actualiza solo el campo que cambió
    });
  };


  const handleCancelar = () => {
    setError('')
    setDtosForm({ costoEnvio: '' })
    handleClose()
  }

  const handleConfirmar = async () => {
    if (dtosForm.costoEnvio != '') {
      try {
        const datosActualizados = {
          costoEnvio: dtosForm.costoEnvio,
        }

        const response = await axios.put(`${apiUrl}/tb_zonas/${zona.id}`, datosActualizados);
        if (response.status === 200) {
          refrescarZonas();
          setDtosForm({ costoEnvio: '' })
          setError('')
          handleClose();
        }
      } catch (error) {
        console.error("Error accediendo a la api tb_zonas", error);
      }
    } else {
      setError('Ingrese un valor mayor que cero')
    }
  }

  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'
  }

  return (
    <>
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose();
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} className="w-[90%] md:max-w-lg">


          <div className="flex items-center justify-between">
            <h2 className='mb-4 text-2xl font-bold text-marron-200'>Editar {zona.nomZona} </h2>
            <Icon
              onClick={handleClose}
              icon={<IoCloseSharp size={24}
                className="-mt-8" />} />
          </div>

          <p className="text-sm font-semibold text-marron-200">Importe Actual: {formatPriceToARS(zona.costoEnvio)}</p>
          <div className="w-full mt-6">
            <Input
              onChange={onInputChange}
              value={dtosForm.costoEnvio}
              label="Precio"
              name="costoEnvio"
            />
            <p className="text-sm text-red-500">{error}</p>
          </div>

          <div className="justify-start gap-4 mt-4 md:flex">
            <Button
              onClick={handleCancelar}
              className="w-full mb-2 md:mb-0 bg-gris-50 hover:bg-gris-100"
            >
              Cancelar
            </Button>

            <Button
              className="w-full bg-verde-100 hover:bg-verde-200"
              onClick={handleConfirmar}
            >
              Confirmar
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ModalEditZonasEnvios