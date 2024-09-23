import { Title } from './Title';
import { Item } from './Item';
import { Icon } from '../Icon';
import { useEffect, useState } from 'react';
import { IoEye } from "react-icons/io5";
import { formatPriceToARS, formatearFecha } from '../utils/utils';
import { ModalAdmin } from './ModalAdmin';
import { Button } from '../Button';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { apiUrl } from '../../config/config';

export const TableVentas = () => {
  const [modalType, setModalType] = useState(null);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [tabEstados, setTabEstados] = useState({});
  const [ventas, setVentas] = useState([]);


  // Traer pedidos
  const dtos = async () => {
    try {
      const response = await axios.get(`${apiUrl}/pedidos`);

      if (response.status === 200) {
        setVentas(response.data)
      }
    } catch (error) {
      console.error("Error accediendo a la api Pedidos", error);
    }
  }

  // Traer estados de venta
  const tbEstados = async () => {
    try {
      const response = await axios.get(`${apiUrl}/tb_estados`);

      if (response.status === 200) {
        setTabEstados(response.data)
      }
    } catch (error) {
      console.error("Error accediendo a la api Tabla de Estados", error);
    }
  }

  // Modificar estado de pedido
  const handleEstadoChange = (event) => {
    setNuevoEstado(event.target.value);
  }

  // Abrir modal
  const openModal = (type, venta) => {
    setSelectedVenta(venta);
    setNuevoEstado(venta.estado);
    setModalType(type);
  };

  // Cerrar modal
  const closeModal = () => {
    setModalType(null);
    setSelectedVenta(null);
  };

  // Guardar cambios
  const saveChanges = async () => {
    try {

      const actualizEstado = {
        estado: nuevoEstado
      }

      const response = await axios.put(`${apiUrl}/estPed/${selectedVenta.id}`, actualizEstado);
      if (response.status === 200) {
        dtos()
        closeModal()
      }
    } catch (error) {
      console.error("Error accediendo a la api Pedidos para modificar Estado", error);
    }
  }

  // Paginacion
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;  // Puedes ajustar esto a tu necesidad

  const totalPages = Math.ceil(ventas.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentItems = ventas.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Renderizar cambios de estado
  useEffect(() => {
    dtos()
    tbEstados()
  }, []);


  return (
    <div className="">
      {currentItems.length > 0 ? (
        <div className="my-4 max-w-8xl">
          <div className="justify-between hidden w-full gap-2 px-4 py-2 border-b border-gray-300 lg:flex bg-marron-200">
            <Title className="lg:w-1/6" text="Identif Pedido" />
            <Title className="lg:w-1/6" text="Fecha" />
            <Title className="lg:w-1/6" text="Envío" />
            <Title className="lg:w-1/6" text="Estado" />
            <Title className="lg:w-60" text="Cliente" />
            <Title className="lg:w-1/6" text="Teléfonos" />
            <Title className="lg:w-60" text="Email" />
            <Title className="lg:w-1/6" text="Total" />
            <Title className="lg:w-24" text="Acciones" />
          </div>

          {currentItems.map((venta) => (
            <div key={venta.id} className="justify-between gap-2 mt-4 bg-white border lg:px-4 lg:mt-0 lg:flex">
              <Item title="Id. pedido" className="lg:w-1/6" item={venta.identifPedido.split('-').pop()} />
              <Item title="Fecha" className="lg:w-1/6" item={formatearFecha(venta.fecPedido)} />
              <Item title="Envío" className="lg:w-1/6" item={venta.tipoDeEnvio} />
              <Item title="Estado" className="lg:w-1/6" item={venta.estadoDelPedido} />
              <Item title="Cliente" className="lg:w-60" item={venta.clie_nombre} />
              <Item title="Teléfono" className="lg:w-1/6" item={venta.clie_telefonos} />
              <Item title="Email" className="lg:w-60" item={venta.clie_email} />
              <Item title="Total" className="lg:w-1/6" item={formatPriceToARS(venta.total_final)} />
              <div className="flex lg:w-24 lg:py-2 text-start">
                <div className="w-[34%] font-bold lg:hidden bg-marron-200 text-white p-2 text-sm">Acciones</div>
                <div className="flex justify-end gap-4 p-2 lg:w-full lg:p-0">
                  <button onClick={() => openModal('show', venta)}>
                    <Icon icon={<IoEye size={20} />} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <ReactPaginate
            previousLabel={"anterior"}
            nextLabel={"siguiente"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      ) : (
        <p className="text-xl text-blanco font-varela">
          No hay ventas que mostrar actualmente
        </p>
      )}

      <ModalAdmin
        isOpen={modalType === 'show'}
        onClose={closeModal}

        title={selectedVenta ? `Venta ID: ${selectedVenta.identifPedido.split('-').pop()}` : 'Detalles de Venta'}
        tamanioModal="md:max-w-3xl"
      >
        {selectedVenta ? (
          <div className='text-marron-200'>
            <h2 className="mt-4 mb-4 text-xl font-bold md:text-center">Detalles de la venta</h2>
            <ul className="mb-6 overflow-y-auto max-h-40">
              {selectedVenta.items && selectedVenta.items.length > 0 ? (
                selectedVenta.items.map((it, index) => (
                  <div key={index} className="items-center justify-center gap-6 md:flex">
                    <li className="text-sm">
                      <span className='font-semibold'>Producto:</span> {it.articulo}
                    </li>

                    <li className="text-sm">
                    <span className='font-semibold'>Precio unitario:</span> {formatPriceToARS(it.precioUnit)}
                    </li>

                    <li className="text-sm">
                    <span className='font-semibold'>Cantidad:</span> {it.unidades}
                    </li>
                  </div>
                ))
              ) : (
                <p></p>
              )}
            </ul>
            <div className='gap-12 text-sm md:flex text-marron-200'>

              <div className='space-y-1 md:w-1/2'>
                <p><span className='font-semibold'>Cliente:</span> {selectedVenta.clie_nombre}</p>
                <p><span className='font-semibold'>Contacto:</span> {selectedVenta.clie_telefonos} - {selectedVenta.clie_email}</p>
                <p><span className='font-semibold'>Dirección:</span> {selectedVenta.dir_calle}, CP: {selectedVenta.dir_codPostal}, {selectedVenta.dir_ciudad}, {selectedVenta.dir_nom_provincia}. </p>
              </div>

              <div className='mt-6 space-y-1 md:m-0'>
                <p><span className='font-semibold'>Fecha:</span> {formatearFecha(selectedVenta.fecPedido)}</p>
                <p className='mb-4'><span className='font-semibold'>Envio:</span> {selectedVenta.tipoDeEnvio}</p>
                <p><span className='font-semibold'>Precio envío:</span> {formatPriceToARS(selectedVenta.total_envio)}</p>

                <p><span className='font-semibold'>Sub-Total:</span> {formatPriceToARS(selectedVenta.total_final)}</p>
              </div>

            </div>

            <div className='flex w-full mt-4 border-t-2 md:justify-end'>
              <p className='my-3 text-lg'><span className='font-semibold'>Total: {formatPriceToARS(selectedVenta.total_productos)}</span></p>
            </div>

            <p className='mt-2 text-sm'><span className='font-semibold'>Estado:</span>
              <select
                value={nuevoEstado}
                onChange={handleEstadoChange}
                className="p-1 ml-2 border rounded"
              >
                {tabEstados.map((estado) => (
                  <option key={estado.item} value={estado.item}>
                    {estado.descItem}
                  </option>
                ))}
              </select>
            </p>

            <div className="flex flex-col justify-end gap-2 mt-4 md:gap-4 md:flex-row">

              <Button
                onClick={closeModal}
                className="bg-gris-50 hover:bg-gris-100"
              >
                Cancelar
              </Button>

              <Button
                onClick={saveChanges}
                className="bg-verde-100 hover:bg-verde-200"
              >
                Guardar cambios
              </Button>

            </div>
          </div>
        ) : (
          <p>Cargando detalles...</p>
        )}
      </ModalAdmin>


    </div>
  );
};
