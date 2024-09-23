
import { Title } from './Title';
import { Item } from './Item';
import { Icon } from '../Icon';
import { useEffect, useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import { formatPriceToARS } from '../utils/utils';
import axios from 'axios';
import { apiUrl } from '../../config/config';
import ModalEditZonasEnvios from './forms/ModalEditZonasEnvios';

export const TableEnvios = () => {
    const [zonas, setZonas] = useState([]);
    const [openEditZona, setOpenEditZona] = useState(false)
    const [zonaSelec, setZonaSelec] = useState([])

  const dtos = async () =>{
    try {
      const response = await axios.get(`${apiUrl}/costosEnvio`);
        
     if (response.status === 200) {
          setZonas(response.data)
     }
    } catch (error) {
        console.error("Error accediendo a la api Costos de Envío", error );
    }    
}

    useEffect(() => {
        dtos()
    }, []);

  
    // Modal
    const handleEditZona = (zona) => {
        setZonaSelec(zona)
        setOpenEditZona(true);
    }

    const handleCerrarEditProd = () => {
        setOpenEditZona(false); 
    }


    return (
    <>

        {
          <div className="my-4 max-w-8xl">
            <div className="justify-between hidden w-full px-4 py-2 border-b border-gray-300 lg:flex bg-marron-200">
              <Title className="w-52" text="Zona" />
              <Title className="w-72" text="Provincias" />
              <Title className="w-52" text="Tipo de envío" />
              <Title className="w-24" text="Costo" />
              <Title className="w-24" text="Acciones" />
            </div>

            {zonas.map((varZona) => (
              <div key={varZona.id} className="items-center justify-between w-full mt-4 bg-white border lg:px-4 lg:mt-0 lg:flex">
                <Item
                  title="Producto"
                  className="lg:w-52"
                  item={varZona.nomZona}
                />
                <Item
                  title="Descripcion"
                  className="lg:w-72"
                  item={varZona.listProvincias.map(provincia => provincia.nomProvincia).join(', ')}
                />
                <Item
                  title="Tamanio"
                  className="lg:w-52"
                  item={varZona.tipoDeEnvio}
                />
                <Item
                  title="Precio"
                  className="lg:w-24"
                  item={formatPriceToARS(varZona.costoEnvio)}
                />
                <div className="flex lg:py-2 text-start lg:w-24">
                  <div className="w-[34%] font-bold lg:hidden bg-marron-200 text-white p-2 text-sm">Acciones</div>
                  <div className="flex justify-center gap-3 p-2 lg:w-full lg:p-0">
                    <button>
                        <Icon 
                            icon={<MdModeEditOutline
                            size={20}
                            onClick={() => handleEditZona(varZona)}
                        />} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        }

        {/* Renderiza el Modal para confirmar actualización de precio de envío */}
        <ModalEditZonasEnvios
            open={openEditZona} 
            handleClose={handleCerrarEditProd} 
            zona={zonaSelec}
            refrescarZonas={dtos} />

    </>
  )
}