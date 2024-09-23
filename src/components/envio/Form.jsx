import { Input } from "./Input"
import { Title } from "./Title"
import { Button } from "../Button"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Context from "../../context/AppContext"
import Select from "./Select"
import Radio from "./Radio"

export const Form = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const { GrabarDatos, setClaveMp, GenerarClaveDePago, getProvincias, dtosProvSelec, setearCostosEnvio } = useContext(Context);
  const [provinciaSelec, setProvinciaSelect] = useState({})
  const [error, setError] = useState({})

  // Centraliza el estado del formulario
  const [formulario, setFormulario] = useState({
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
  });

  // Cargar los datos desde localStorage cuando se monta el componente
  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormulario(JSON.parse(savedFormData));
    }
  }, []);



  // Función para manejar los cambios de cada campo
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario, // Mantén los valores anteriores del formulario
      [name]: value,  // Actualiza solo el campo que cambió
    });
  };


  // Grabar datos del form cada vez que cambia un campo
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formulario));
  }, [formulario]);



  const CalcularEnvio = () => {

      if (formulario.tipoEnvio === 'CorreoArg' || formulario.tipoEnvio === 'Mensajeria') {        
        const dtosProv = async () => {
            try {
                const codEnvio = formulario.tipoEnvio === 'CorreoArg' ? 3 : 2;            
                console.log('codEnvio:', codEnvio)
            const data = await dtosProvSelec(codEnvio, formulario.provincia);
            setProvinciaSelect(data)
            if (data && data.length > 0) {
                setearCostosEnvio(data[0].id, data[0].nomProvincia, data[0].costoEnvio)
            } else {
                setearCostosEnvio(0, '', 0)
            }
            } catch (error) {
            console.error(error);
            }
        };
        dtosProv();
    }
  }

  useEffect(() => {
    if (formulario.provincia) {
      CalcularEnvio();
    }
  }, [formulario.provincia, formulario.tipoEnvio]);

  useEffect(() => {
    if (formulario.tipoEnvio === "CorreoArg") {
      CalcularEnvio()
    } else {
      setearCostosEnvio(0, '', 0)
    }
  }, [formulario.tipoEnvio]);

  const IniciarPago = () => {
    GenerarClaveDePago()
      .then((data) => setClaveMp(data.idMp))
      .catch(error => console.error(error));
  }


  const onSubmit = (e) => {
    e.preventDefault()

    const errors = {}

    // Validaciones
    if (formulario.email === '') {
      errors.email = 'Debe ingresar un email';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formulario.email)) {
        errors.email = 'Debe ingresar un email válido';
      }
    }

    if (formulario.nombre === '') {
      errors.nombre = 'Debe ingresar su nombre';
    }


    if (formulario.documento === '') {
      errors.documento = 'Debe ingresar su documento'
    }

    if (formulario.telefono === '') {
      errors.telefono = 'Debe ingresar su teléfono'
    }

    if (formulario.direccion === '') {
      errors.direccion = 'Debe ingresar su dirección'
    }

    // if (formulario.piso === '') {
    //   errors.piso = 'Debe ingresar Piso/altura'
    // }

    if (formulario.codigoPostal === '') {
      errors.codigoPostal = 'Debe ingresar su código postal'
    }

    if (formulario.provincia === '') {
      errors.provincia = 'Debe seleccionar una provincia'
    }

    if (formulario.tipoEnvio === '') {
      errors.tipoEnvio = 'Debe seleccionar un tipo de envío'
    }

    setError(errors)

    // Si no hay errores, redirigir a /pago
    if (Object.keys(errors).length === 0) {

      GrabarDatos()
        .then((np) => {
          IniciarPago();
          navigate("/Checkout"); // Redirige al componente de pago
        })
        .catch((error) => {
          console.error("Error al grabar el pedido:", error);
        });
      //IniciarPago()
      //navigate("/Checkout")
    }
  }


  return (

    <form onSubmit={onSubmit} className="space-y-6 md:space-y-12">
      <div>
        <Title
          title="Datos personales"
          description="Ingresa tus datos personales a continuación"
        />

        <div className="gap-4 md:flex md:gap-8 ">
          <div className="w-full">
            {
              error.nombre ? (
                <Input
                  label={error.nombre}
                  name="nombre"
                  value={formulario.nombre}
                  hayError={true}
                  onChange={onInputChange}
                />
              ) : (
                <Input
                  label="Nombre completo"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={onInputChange}
                />
              )
            }
          </div>

          <div className="w-full">
            {
              error.email ? (
                <Input
                  label={error.email}
                  name="email"
                  value={formulario.email}
                  hayError={true}
                  onChange={onInputChange}
                />
              ) : (
                <Input
                  label="Correo electrónico"
                  name="email"
                  value={formulario.email}
                  onChange={onInputChange}
                />
              )
            }

          </div>

        </div>

        <div className="gap-4 md:flex md:gap-8">
          <div className="w-full">
            {
              error.documento ? (
                <Input
                  label={error.documento}
                  name="documento"
                  value={formulario.documento}
                  hayError={true}
                  onChange={onInputChange}
                />
              ) : (
                <Input
                  label="Documento"
                  name="documento"
                  value={formulario.documento}
                  onChange={onInputChange}
                />
              )
            }
          </div>

          <div className="w-full">
            {
              error.telefono ? (
                <Input
                  label={error.telefono}
                  name="telefono"
                  value={formulario.telefono}
                  hayError={true}
                  onChange={onInputChange}
                />
              ) : (
                <Input
                  label="Teléfono"
                  name="telefono"
                  value={formulario.telefono}
                  onChange={onInputChange}
                />
              )
            }
          </div>
        </div>

      </div>

      <div>
        <Title
          title="Datos de envío"
          description="¿A qué dirección enviamos tu pedido?"
        />

        <div className="gap-4 md:flex md:gap-8">
          <div className="w-full">
            {
              error.direccion ? (
                <Input
                  label={error.direccion}
                  name="direccion"
                  value={formulario.direccion}
                  hayError={true}
                  onChange={onInputChange}
                />
              ) : (
                <Input
                  label="Direccion"
                  name="direccion"
                  value={formulario.direccion}
                  onChange={onInputChange}
                />
              )
            }
          </div>

          <div className="w-full">
            {
              error.piso ? (
                <Input
                  label={error.piso}
                  name="piso"
                  value={formulario.piso}
                  hayError={true}
                  onChange={onInputChange}
                />
              ) : (
                <Input
                  label="Piso/dpto"
                  name="piso"
                  value={formulario.piso}
                  onChange={onInputChange}
                />
              )
            }
          </div>
        </div>

        <div className="gap-4 md:flex md:gap-8">
          <div className="w-full">
            <Input
              label="Entre calle y calle"
              name="entreCalle"
              value={formulario.entreCalle}
              onChange={onInputChange}
            />
          </div>

          <div className="w-full">
            {
              error.codigoPostal ? (
                <Input
                  label={error.codigoPostal}
                  name="codigoPostal"
                  value={formulario.codigoPostal}
                  hayError={true}
                  onChange={onInputChange}
                />
              ) : (
                <Input
                  label="Código postal"
                  name="codigoPostal"
                  value={formulario.codigoPostal}
                  onChange={onInputChange}
                />
              )
            }
          </div>
        </div>

        <div className="gap-4 md:flex md:gap-8">
          <div className="w-full">
            {
              error.provincia ? (
                <div>
                  <label className="text-sm font-bold text-red-500 " htmlFor="provincia">{error.provincia}</label>
                  <Select
                    name="provincia"
                    value={formulario.provincia}
                    onChange={onInputChange}
                    options={getProvincias}
                    defaultOption="Provincia"
                    className="m-0"
                
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="provincia" className="hidden">Provincia</label>
                  <Select
                    name="provincia"
                    value={formulario.provincia}
                    onChange={onInputChange}
                    options={getProvincias}
                    defaultOption="Provincia"
                  />
                </div>
              )
            }
          </div>
          <div className="w-full">
            <Input
              label="Localidad"
              name="localidad"
              value={formulario.localidad}
              onChange={onInputChange}
            />
          </div>
        </div>

        {
          error.tipoEnvio ? (
            <div>
              <Title
                title="Método de envío"
                description={error.tipoEnvio}
                className="mt-14"
                hayError={true}
              />
              <div className="flex space-x-4">
                <div>
                  <Radio
                    type="radio"
                    id="retiroLocal"
                    name="tipoEnvio"
                    value="RetLocal"
                    onChange={onInputChange}
                    title="Retiro en local"
                  />
                </div>
                <div>
                  <Radio
                    type="radio"
                    id="motomensaje"
                    name="tipoEnvio"
                    value="Mensajeria"
                    onChange={onInputChange}
                      title="Mensajería"
                  />
                </div>
                <div>
                  <Radio
                    type="radio"
                    id="correoArgentino"
                    name="tipoEnvio"
                    value="CorreoArg"
                    onChange={onInputChange}
                    title="Correo Argentino"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Title
                title="Método de envío"
                description="Selecciona cómo deseas recibir tu pedido"
                className="mt-14"
              />
              <div className="pt-4 md:flex md:space-x-7">
                <div>
                  <Radio
                    type="radio"
                    id="retiroLocal"
                    name="tipoEnvio"
                    value="RetLocal"
                    checked={formulario.tipoEnvio === "RetLocal"}
                    onChange={onInputChange}
                    title="Retiro en local"
                  />
                </div>
                <div>
                  <Radio
                    type="radio"
                    id="motomensaje"
                    name="tipoEnvio"
                    value="Mensajeria"
                    checked={formulario.tipoEnvio === "Mensajeria"}
                    onChange={onInputChange}
                    title="Mensajería"
                  />
                </div>
                <div>
                  <Radio
                    type="radio"
                    id="correoArgentino"
                    name="tipoEnvio"
                    value="CorreoArg"
                    checked={formulario.tipoEnvio === "CorreoArg"}
                    onChange={onInputChange}
                    title="Correo Argentino"
                  />
                </div>
              </div>
            </div>
          )

        }


      </div>

      <Button className="w-full mt-6 bg-verde-100 hover:bg-verde-200" type="submit">Continuar</Button>
    </form>

  )
}

