import { Box, Modal } from "@mui/material";
import { Input } from "../../envio/Input";
import { Button } from "../../Button";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { apiUrl } from "../../../config/config";
import { Icon } from "../../Icon";
import { IoCloseSharp } from "react-icons/io5";

const ModalNuevoProducto = ({ open, handleClose, refrescarProductos }) => {
  const [image, setImage] = useState(null);
  const [dtosProp, setDtosProp] = useState([]);
  const [nomProp, setNomProp] = useState('');

  // --------------------

  // Centraliza el estado del formulario
  const [dtosForm, setDtosForm] = useState({
    nombre: '',
    tamanio: '',
    precio: '',
    descripcion: '',
  });

  // Función para manejar los cambios de cada campo
  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "precio") {
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

  const onInputPropChange = (e) => {
    setNomProp(e.target.value)
  }

  // Estilos modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',  // Permite el scroll en el modal
    maxHeight: '90vh',  // Define una altura máxima para el modal
  };

  // Funcion para manejar imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Mostrar vista previa de la imagen
    }
  };

  // Función para eliminar propiedad
  const handleEliminarPropiedad = (index) => {
    const nuevasPropiedades = dtosProp.filter((_, i) => i !== index); // Filtra el elemento que se quiere eliminar
    setDtosProp(nuevasPropiedades); // Actualiza el estado
  };

  // Función para agregar nueva propiedad
  const handleAgregarPropiedad = () => {
    if (nomProp.trim() !== '') {  // Verifica que la propiedad no esté vacía
      // Encontrar el próximo ID disponible
      const nuevoId = dtosProp.length > 0 ? Math.max(...dtosProp.map(p => p.id)) + 1 : 1;

      // Crear el objeto de la nueva propiedad con los campos adicionales
      const nuevaPropiedad = {
        id: 0,
        id_producto: 0,  // Usa el id del producto actualmente editado
        propiedad: nomProp,
        created_at: new Date().toISOString(),  // Opcional: Agrega las fechas si es necesario
        updated_at: new Date().toISOString()
      };

      // Agregar la nueva propiedad al estado
      setDtosProp([...dtosProp, nuevaPropiedad]);

      setNomProp('');  // Limpia el campo de entrada
    }
  };

  // Funcion para guardar un producto
  const handleGuardarProdNuevo = async () => {
    try {
      const datosActualizados = {
        nombre: dtosForm.nombre,
        tamanio: dtosForm.tamanio,
        precio: dtosForm.precio,
        descripcion: dtosForm.descripcion,
        img: '/images/product_index.png',
        propiedades: dtosProp
      }
      const response = await axios.post(`${apiUrl}/productos`, datosActualizados);

      setDtosForm({
        nombre: '',
        tamanio: '',
        precio: '',
        descripcion: ''
      });
      setDtosProp([])

      refrescarProductos();
      handleClose();
    } catch (error) {
      console.error("Error accediendo a la api productos", error);
    }
  }

  // Funcion para agregar propiedad al Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAgregarPropiedad();
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose} // Cierra el modal al hacer clic fuera
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style} className="rounded-md w-[90%] md:w-[80%] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-verde-100 scrollbar-track-claro scrollbar-thin">
          <div className="flex items-center justify-between">
            <h2 className='mb-4 text-2xl font-bold text-marron-200'>Editar {dtosForm.nombre} </h2>
            <Icon
              onClick={handleClose}
              icon={<IoCloseSharp size={24}
                className="-mt-8" />} />
          </div>
          <div className="justify-between gap-8 md:flex">
            <div className='w-full mt-4 md:mt-0'>
              <div className="justify-between gap-8 md:flex">
                <div className="w-full">
                  <Input onChange={onInputChange} value={dtosForm.nombre} label="Nombre" type="text" name="nombre" />
                </div>
                <div className="w-full">
                  <Input
                    onChange={onInputChange}
                    value={dtosForm.precio}
                    label="Precio"
                    name="precio"
                  />
                </div>
                <div className="w-full">
                  <Input onChange={onInputChange} value={dtosForm.tamanio} type="text" label="Tamaño" name="tamanio" />
                </div>
              </div>
              <div>
                <div className="w-full">
                  <Input onChange={onInputChange} value={dtosForm.descripcion} label="Descripción" name="descripcion" textarea />
                </div>

                <div className="mb-3 text-sm font-semibold text-marron-200">Propiedades</div>
                <ul className="pr-4 overflow-y-auto max-h-40 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gris-100 scrollbar-track-claro scrollbar-thin">
                  {dtosProp && dtosProp.length > 0 ? (
                    dtosProp.map((propi, index) => (
                      <div key={index} className="flex items-center justify-start space-x-2 cursor-pointer">
                        <li className="w-full text-sm border-b-[1px] mb-2 text-marron-200 mr-4" key={index}>
                          {propi.propiedad}
                        </li>
                        <Icon
                          icon={<FaTrash size={16} />}
                          onClick={() => handleEliminarPropiedad(index)}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-marron-200">No hay propiedades para este producto</p>
                  )}

                  <div className="flex items-center mt-4">
                    <Input
                      onChange={onInputPropChange}
                      value={nomProp}
                      label="Nueva propiedad"
                      type="text"
                      name="nomprop"
                      onKeyDown={handleKeyDown} // Detecta la tecla presionada
                    />
                    <Icon
                      onClick={handleAgregarPropiedad}
                      icon={<IoIosAddCircle size={20} className="ml-4" />} />
                  </div>

                </ul>
              </div>

              <div className="justify-start hidden gap-4 mt-4 md:flex">
                <Button className="w-full mb-2 md:mb-0 bg-gris-50 hover:bg-gris-100"
                  onClick={(e) => {
                    // Reiniciar el formulario y las propiedades
                    setDtosForm({
                      nombre: '',
                      tamanio: '',
                      precio: '',
                      descripcion: ''
                    });
                    setDtosProp([]);

                    // Cerrar el modal
                    handleClose();
                  }}>
                  Cancelar
                </Button>

                <Button className="w-full bg-verde-100 hover:bg-verde-200"
                  onClick={(e) => {
                    handleGuardarProdNuevo();
                  }}
                >Guardar
                </Button>
              </div>
            </div>

            <div className="mt-4 md:w-3/5">
              {image && (
                <img src={image} alt="Preview" className="object-cover object-top w-full my-4 t max-h-44 " />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="justify-start gap-4 mt-4 md:hidden">
                <Button className="w-full mb-2 md:mb-0 bg-gris-50 hover:bg-gris-100"
                  onClick={(e) => {
                    // Reiniciar el formulario y las propiedades
                    setDtosForm({
                      nombre: '',
                      tamanio: '',
                      precio: '',
                      descripcion: ''
                    });
                    setDtosProp([]);

                    // Cerrar el modal
                    handleClose();
                  }}>
                  Cancelar
                </Button>

                <Button className="w-full bg-verde-100 hover:bg-verde-200"
                  onClick={(e) => {
                    handleGuardarProdNuevo();
                  }}
                >Guardar
                </Button>
              </div>

          </div>
        </Box>
      </Modal>


    </>
  )
}

export default ModalNuevoProducto