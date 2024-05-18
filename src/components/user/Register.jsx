// RegisterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const RegisterForm = ({ onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !username || !fullName || !address || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, llene todos los campos.'
      });
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/register', {
        email,
        username,
        fullName,
        address,
        password
        
      });
      console.log(response.data);
      if (response.data.message === 'Registro exitoso') {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: response.data.message
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: response.data.message
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: error.response.data.error || 'Hubo un problema al registrar el usuario'
      });
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h2 className="text-2xl font-bold mb-6">Registrarse</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-gray-700 font-bold mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                id="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                Dirección
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Registrarse
              </button>
              <button
                onClick={onSwitchToLogin}
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
