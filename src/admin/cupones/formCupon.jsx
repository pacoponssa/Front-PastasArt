import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormularioCupon= () => {

    const navigate = useNavigate();
    const { id } = useParams();
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
    const [cupon, setCupon] = useState({
      idCupon: '',
      codigo: '',
      descuento: '',
    });


    useEffect(() => {
      if (id !== 'nuevo') {
        const fetchCupon = async () => {
          try {
            setLoading(true);
            const respuesta = await axios.get('/cupon/' + id);
            const data = respuesta.data.data;
            setCupon({
              idCupon: data.idCupon, 
              codigo: data.codigo,
              descuento: data.descuento
            });
            setLoading(false);
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        };
        fetchCupon();
      } else {
        setCupon({
          idCupon: '',  
          codigo: '',
          descuento: ''
        });
      }
    }, [id]);
    
const handleChange = (event) => {
    const { name, value } = event.target;
    setCupon({ ...cupon, [name]: value });
  // }
};
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    if (id === 'nuevo') {
      const respuesta = await axios.post('/cupon', cupon);
      console.log("cupon1"+ respuesta.data);
      navigate('/admin/cupon');
    } else {
      const respuesta = await axios.put('/cupon/' + id, cupon);
      console.log("cupon2"+respuesta.data.data);
      navigate('/admin/cupon');
    }
  } catch (error) {
    setError(error.message);
  }
};
 
    return (
      <div>
        <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <div className='p-6 text-2xl font-bold text-center text-gray bg-orange-300'>
      { cupon.idCupon ?  "Editar cupon" : "Crear nuevo cupon"} 
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="max-w-md p-5 mx-auto mt-10 bg-white rounded-lg shadow-md">
            
          <form onSubmit={handleSubmit}>
             
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="nombre">
              codigo:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="codigo"
                type="text"
                name="codigo"
                value={cupon.codigo}
                onChange={handleChange}
              />
            </div>         
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="nombre">
              descuento:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="descuento"
                type="text"
                name="descuento"
                value={cupon.descuento}
                onChange={handleChange}
              />
            </div>   
            <div className="flex justify-center bflex space-x-2">
              <button
                className="px-4 py-2 bg-green-400 rounded hover:bg-green-500 text-white flex items-center justify-center"
                type="submit"
              >
                <span className="material-icons">check</span>
              </button>
              <button
                className="px-4 py-2 bg-orange-400 rounded hover:bg-orange-500 text-white flex items-center justify-center"
                type="button"
                onClick={() => navigate("/admin/cupon")}
              >
                <span className="material-icons">close</span>
              </button>
            </div>
          </form>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>

  );
}

export default FormularioCupon;


