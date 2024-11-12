import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormularioCarrito= () => {

    const navigate = useNavigate();
    const { id } = useParams();
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
    const [carrito, setCarrito] = useState({
      id: '',
      total: '',
    });

useEffect(() => {
  if (id !== 'nuevo') {
    const fetchCarrito = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get('/carrito/' + id);
        setCarrito(respuesta.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCarrito();
  } else {
    setCarrito({
      id: '',
      total: '',
    });
  }
}, [id]);

const handleChange = (event) => {
  console.log(event.target.name, event.target.value);
  if (event.target.name === 'disponible') {
    setCarrito({ ...carrito, [event.target.name]: event.target.checked });
  } else {

    const { name, value } = event.target;
    setCarrito({ ...carrito, [name]: value });
  }
};
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    if (id === 'nuevo') {
      const respuesta = await axios.post('/carrito', carrito);
      console.log(respuesta.data);
      navigate('/admin/carrito');
    } else {
      const respuesta = await axios.put('/carrito/' + id, carrito);
      console.log(respuesta.data.data);
      navigate('/admin/carrito');
    }
  } catch (error) {
    setError(error.message);
  }
};
 
    return (
      <div>
      <div className='p-6 text-2xl font-bold text-center text-white bg-red-600'>
      { carrito.id ?  "Editar carrito" : "Crear nuevo carrito"} 
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="max-w-md p-5 mx-auto mt-10 bg-white rounded-lg shadow-md">
            
          <form onSubmit={handleSubmit}>
                          
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="precio">
                Total:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="total"
                type="number"
                name="total"
                value={carrito.total}
                onChange={handleChange}
              />
            </div>
            

            <div className='flex justify-center'>

              <button
                className="px-4 py-2 mx-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Guardar
              </button>
              <button
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => navigate('/admin/carrito')}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>

  );
}

export default FormularioCarrito;


