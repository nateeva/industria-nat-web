import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Button } from '../Button'
import axios from 'axios';
import { apiUrl } from '../../config/config';
import { Title } from './Title';
import { Item } from './Item';
import { formatPriceToARS } from '../utils/utils';
import { Icon } from '../Icon';
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ModalNuevoProducto from './forms/ModalNuevoProducto';
import ModalEditProducto from './forms/ModalEditProducto';
import ModalElimProducto from './forms/ModalElimProducto';

const TableProducts = () => {
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;  // Puedes ajustar esto a tu necesidad
  const [openNuevoArtic, setOpenNuevoArtic] = useState(false)
  const [openEditArtic, setOpenEditArtic] = useState(false)
  const [openElimArtic, setOpenElimArtic] = useState(false)
  const [producSelec, setProducSelec] = useState([])

  // Traer productos
  const dtos = async () => {
    try {
      const response = await axios.get(`${apiUrl}/productos`);

      if (response.status === 200) {
        setProductos(response.data)
      }
    } catch (error) {
      console.error("Error accediendo a la api pedidos", error);
    }
  }

  // Paginacion
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const totalPages = Math.ceil(productos.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentItems = productos.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    dtos()
  }, []);


  // Acciones producto
  const handleNuevoProd = () => {
    setOpenNuevoArtic(true);
  }

  const handleCerrarProdNuevo = () => {
    setOpenNuevoArtic(false);
  }

  const handleEditProd = (producto) => {
    setProducSelec(producto)
    setOpenEditArtic(true);
  }

  const handleCerrarEditProd = () => {
    setOpenEditArtic(false);
  }

  const handleElimProd = (producto) => {
    setProducSelec(producto)
    setOpenElimArtic(true);
  }

  const handleCerrarElimProd = () => {
    setOpenElimArtic(false);
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handleNuevoProd} className="bg-verde-100 hover:bg-verde-200">
          Cargar nuevo
        </Button>
      </div>

      {currentItems.length > 0 ? (
        <div className="my-4 max-w-8xl">
          <div className="hidden w-full gap-2 px-4 py-2 border-b border-gray-300 lg:flex bg-marron-200">
            <Title className="w-1/6" text="Imagen" />
            <Title className="w-1/6" text="Producto" />
            <Title className="w-3/6" text="Descripción" />
            <Title className="w-1/6" text="Tamaño" />
            <Title className="w-1/6" text="Precio" />
            <Title className="" text="Acciones" />
          </div>

          {currentItems.map((producto) => (
            <div key={producto.id} className="items-center w-full gap-5 mt-4 bg-white border lg:px-4 lg:mt-0 lg:flex">
              <Item
                title="Imagen"
                className="lg:w-1/6"
                item={<img className='object-cover w-full h-24' src={producto.img} alt={producto.nombre} />}
              />
              <Item
                title="Producto"
                className="lg:w-1/6"
                item={producto.nombre}
              />
              <Item
                title="Descripcion"
                className="lg:w-3/6"
                item={producto.descripcion}
              />
              <Item
                title="Tamanio"
                className="lg:w-1/6"
                item={producto.tamanio}
              />
              <Item
                title="Precio"
                className="lg:w-1/6"
                item={formatPriceToARS(producto.precio)}
              />
              <div className="flex lg:py-2 text-start lg:w-24">
                <div className="w-[34%] font-bold lg:hidden bg-marron-200 text-white p-2 text-sm">Acciones</div>
                <div className="flex justify-center gap-3 p-2 lg:w-full lg:p-0">
                  <button onClick={() => handleEditProd(producto)}>
                    <Icon icon={<MdModeEditOutline size={20} />} />
                  </button>
                  <button >
                    <Icon onClick={() => handleElimProd(producto)} icon={<FaTrash size={16} />} />
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
          No hay productos que mostrar actualmente
        </p>
      )}

      {/* Renderiza el ModalNuevoProducto y pasa las funciones de abrir y cerrar */}
      <ModalNuevoProducto
        open={openNuevoArtic}
        handleClose={handleCerrarProdNuevo}
        refrescarProductos={dtos} />

      {/* Renderiza el Modal para Editar datos de un producto */}
      <ModalEditProducto
        open={openEditArtic}
        handleClose={handleCerrarEditProd}
        producto={producSelec}
        refrescarProductos={dtos} />

      {/* Renderiza el Modal para confirmar que elimina el producto */}
      <ModalElimProducto
        open={openElimArtic}
        handleClose={handleCerrarElimProd}
        producto={producSelec}
        refrescarProductos={dtos} />

    </>
  )
}

export default TableProducts