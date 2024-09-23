import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { apiUrl } from '../config/config'
import { v4 as uuidv4 } from 'uuid';

const Context = createContext()

export const AppContextProvider = ({ children }) => {

  const [codUsuarioActivo, setCodUsuarioActivo] = useState('')
  const [cart, setCart] = useState(() => {
    // Inicializar el carrito desde localStorage si existe
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });


  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const [productos, setProductos] = useState([])
  const [getProvincias, setGetProvincias] = useState([])
  const [cantidadPedida, setCantidadPedida] = useState(1)
  const [costoEnvios, setCostoEnvios] = useState({})
  const [claveMp, setClaveMp] = useState('')
  const [pedido, setPedido] = useState({})

  useEffect(() => {
    const getProductos = () => {
      const _url = `${apiUrl}/productos`;

      axios.get(_url)
        .then(response => {
          setProductos(response.data)
        })
        .catch(error => {
          console.error(error);
        });
    }
    getProductos()

    const getProvincias = () => {
      const _url = `${apiUrl}/provincias`;
      axios.get(_url)
        .then(response => {
          setGetProvincias(response.data)
        })
        .catch(error => {
          console.error(error);
        });
    }
    getProvincias()

  }, [])

  const [login, setLogin] = useState(() => {
    return localStorage.getItem('login1') === 'true';
  })

  const AccesoValido = (usuario, codUsrW) => {
    setLogin(true);
    const dtosLogin = {
        "login": true,
        "userName": usuario,
        "codUsrW" : codUsrW,
    }
    localStorage.setItem('login1', JSON.stringify(dtosLogin));
    setCodUsuarioActivo(codUsrW)
    }

    const Logout = () => {
        setLogin(false);
        localStorage.removeItem('login1');
    }


  const ActualizaCantidad = (nuevaCantidad) => {
    setCantidadPedida(nuevaCantidad)
  }

  const dtosProvSelec = (tipEnvio, id) => {
    const _url = `${apiUrl}/provincias/${tipEnvio}/${id}`;
    return axios.get(_url)
      .then(
        response => response.data
      )
      .catch(error => {
        console.error(error);
        throw error;
      });
  };


  const setearCostosEnvio = (prov, loca, impo) => {
    if (impo === 0) {
      setCostoEnvios({})
    } else {
      setCostoEnvios(
        {
          'provincia': prov,
          'localidad': loca,
          'importe': impo
        }
      )
    }
  }

  const listPropiedades = (id) => {
    const _url = `${apiUrl}/propiedades/${id}`;
    return axios.get(_url)
      .then(response => response.data)
      .catch(error => {
        console.error(error);
        throw error;
      });
  };

  const addItem = (productoAgregado, cantidad) => {

    setCart((prevCart) => {
      const existeProducto = prevCart.some((prod) => prod.id === productoAgregado.id);

      if (existeProducto) {
        const actualizarCarrito = prevCart.map((prod) =>
          prod.id === productoAgregado.id
            ? { ...prod, cantidad: prod.cantidad + cantidad }
            : prod
        );
        return actualizarCarrito;
      } else {
        const nuevoProducto = { ...productoAgregado, cantidad };
        return [...prevCart, nuevoProducto];
      }
    });

  }

  const editarCantidadProducto = (idProducto, oper) => {
    setCart((prevCart) =>
      prevCart.map((prod) =>
        prod.id === idProducto
          ? { ...prod, cantidad: oper === 'S' ? prod.cantidad + 1 : prod.cantidad - 1 }
          : prod
      )
    );
  }

  const eliminarProducto = (id) => {
    const actualizarCarrito = cart.filter((prod) => prod.id !== id)
    setCart(actualizarCarrito)
  }


  const limpiarCarrito = () => {
    setCart([])
    localStorage.setItem('cart', JSON.stringify([]));  // Actualizar el localStorage inmediatamente
    localStorage.setItem('formData', JSON.stringify({
      email: '',
      nombre: '',
      documento: '',
      telefono: '',
      direccion: '',
      piso: '',
      entreCalle: '',
      codigoPostal: '',
      provincia: '',
      localidad: '',
      tipoEnvio: '',
    }));  // Actualizar el localStorage inmediatamente
  }

  const getTotalCarrito = () => {
    let varTotal = cart.reduce((actual, item) => actual + (item.precio * item.cantidad), 0)
    const envio = Number(costoEnvios.importe) || 0
    return varTotal = varTotal + envio
  }

  const getTotalProductos = () => {
    let varTotal = cart.reduce((actual, item) => actual + (item.precio * item.cantidad), 0)
    return varTotal
  }


  const getCantidad = () => {
    let varTotal = 0
    cart.forEach((prod) => {
      varTotal = varTotal + prod.cantidad
    })
    return varTotal
  }

  const GenerarClaveDePago = () => {

    const _url = `${apiUrl}/keymp`;

    const total = getTotalCarrito()

    const payload = {
      title: "Productos Comprados",
      quantity: 1,
      unit_price: total
    };

    return axios.post(_url, payload)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  const GrabarDatos = () => {

    const newGUID = uuidv4();

    const savedFormData = JSON.parse(localStorage.getItem('formData'))
    const envio = Number(costoEnvios.importe) || 0

    const payload = {
      identifPedido: newGUID,
      total_envio: envio,
      total_productos: getTotalProductos(),
      total_final: getTotalCarrito(),
      clie_nombre: savedFormData.nombre,
      clie_email: savedFormData.email,
      clie_docum: savedFormData.documento,
      clie_telefonos: savedFormData.telefono,
      dir_calle: savedFormData.direccion,
      dir_pisoDpto: savedFormData.piso,
      dir_entreCalles: savedFormData.entreCalle,
      dir_codPostal: savedFormData.codigoPostal,
      dir_idProvincia: savedFormData.provincia,
      dir_ciudad: savedFormData.localidad,
      tipEnvio: savedFormData.tipoEnvio === "RetLocal" ? 1 : 
      savedFormData.tipoEnvio === "Mensajeria" ? 2 : 
      savedFormData.tipoEnvio === "CorreoArg" ? 3 : 1, // Default a 1 si no hay valor
      estado: 1,
      articulos: cart.map(producto => ({
        idArticulo: producto.id,
        unidades: producto.cantidad,
        precioUnit: producto.precio
      }))
    }

    const _url = `${apiUrl}/pedidos`

    return axios.post(_url, payload)
      .then(
        response => response.data
        )
      .catch(error => {
        throw error;
      });

  }

  return (
    <Context.Provider
      value={{
        cart,
        productos,
        costoEnvios,
        listPropiedades,
        addItem,
        eliminarProducto,
        ActualizaCantidad,
        cantidadPedida,
        getCantidad,
        getTotalCarrito,
        getProvincias,
        dtosProvSelec,
        editarCantidadProducto,
        limpiarCarrito,
        setearCostosEnvio,
        GenerarClaveDePago,
        getTotalProductos,
        claveMp,
        setClaveMp,
        GrabarDatos,
        pedido,
        Logout,
        AccesoValido
      }}
    >
      {children}
    </Context.Provider>
  )

}


export default Context