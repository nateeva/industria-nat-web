
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button'
import { Logo } from '../Logo'
import axios from 'axios';
import { apiUrl } from '../../config/config';
import Context from '../../context/AppContext';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate();

  // --- Context (carrito, total, limpiar)
  const { AccesoValido } = useContext(Context);

    // Centraliza el estado del formulario
    const [formulario, setFormulario] = useState({
        userName: 'rmerlo@gmail.com',
        userPass: 'arma68on',
    });

    // Función para manejar los cambios de cada campo
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario, // Mantén los valores anteriores del formulario
            [name]: value,  // Actualiza solo el campo que cambió
        });
    };

    const onSubmit  = async (e) => {
        e.preventDefault()

        const errors = {}

        // Validaciones
        if (formulario.userName === '') {
            errors.userName = 'Debe ingresar Nombre de Usuario';
        }


        if (formulario.userPass === ''){
            errors.userPass = 'Debe ingresar su Password'
        }

        setError(errors)

        // Si no hay errores, redirigir a /pago
        if (Object.keys(errors).length === 0) {
            try {
                // Enviar datos a la API de Laravel
                const response = await axios.post(`${apiUrl}/login`, formulario);
                
                 // Manejo de la respuesta de la API
                 if (response.status === 200) {
                     AccesoValido(response.data.userName, response.data.userName)
                     navigate('/admin'); // Redirigir a la página de pedidos
                     // Aquí puedes guardar el token de sesión, redirigir a otra página, etc.
                 }
            } catch (error) {
                setError({ userPass: 'Credenciales incorrectas' })// Muestra un mensaje de error en caso de fallo
                //console.error("Error en el inicio de sesión:", error.response ? error.response.data : error.message);
            }
        }

    }


  return (
    <>
      <div style={
        {
          backgroundImage: "url('/images/bg_textura.png')",
          backgroundRepeat: "no-repeat",

        }}>
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 text-marron-200 ">
          <div>
            <Logo className="w-40" url="/" />
          </div>

          <div className="w-full max-w-md p-8 bg-white shadow">
            <h2 className="mb-6 text-xl font-bold text-center">Iniciar sesión</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label htmlFor="userName" className="block mb-2 text-sm font-semibold text-marron-200">Correo electrónico</label>
                <input
                  type="email"
                  id="userName"
                  name='userName'
                  value={formulario.userName}
                  onChange={onInputChange} 
                  required
                  className="w-full p-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-200 text-marron-200 "
                />
              </div>
              <div className="mb-6">
                <label htmlFor="userPass" className="block mb-2 text-sm font-semibold text-marron-200">Contraseña</label>
                <input
                  type="password"
                  id="userPass"
                  name='userPass'
                  value={formulario.userPass}
                  onChange={onInputChange} 
                  required
                  className="w-full p-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-200 text-marron-200 "
                />

                {error.userPass && (
                  <p className="mt-2 text-sm text-red-500">{error.userPass}</p>
                )}
                
              </div>

              <Button
                type="submit"
                className="w-full bg-verde-100 hover:bg-verde-200">
                Iniciar sesión
              </Button>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}
