"use client";
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

const RegisterTest = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rolId: 1,
    termsAccepted: false
  });
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    if (!hasUpperCase.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula.";
    }
    if (!hasSpecialChar.test(password)) {
      return "La contraseña debe contener al menos un carácter especial.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setPasswordError('');
    setTermsError('');
    
    if (!formData.termsAccepted) {
      setTermsError("Debes aceptar los términos y condiciones.");
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }
    
    try {
      const response = await axios.post('/api/auth/register', formData);
      setMessage(response.data.message || 'Registro exitoso');
      router.push('/auth/login')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#3B82F6] bg-opacity-20 py-2">
      <div className="bg-white p-6 rounded shadow-md w-80 flex flex-col items-center  ">
        <img src="/images/logoFundación_circular2.png" className="w-22 h-22 object-cover border-solid align-middle text-center items-center" alt="Fundación Elojim" />
        <h2 className="text-xl font-semibold mb-4 text-center text-[#1B3C8C]">Crear una cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nombre:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder='Nombres'
              className="w-full p-2 border rounded mt-1" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Apellido:</label>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
              placeholder='Apellidos'
              className="w-full p-2 border rounded mt-1" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Correo electronico:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder='ejemplo@gmail.com'
              className="w-full p-2 border rounded mt-1" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Contraseña:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              placeholder='*********'
              className="w-full p-2 border rounded mt-1" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Confirmar Contraseña:</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
              placeholder='*********'
              className="w-full p-2 border rounded mt-1" 
            />
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm">Acepto los <Link href="" className='text-blue-400'>términos y condiciones</Link></label>
          </div>
          {termsError && <p className="text-red-500 text-sm mb-4">{termsError}</p>}
          {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
          <button type="submit" className="w-full bg-[#1B3C8C] text-white p-2 rounded hover:bg-blue-600">
            Registrarse
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default RegisterTest;
