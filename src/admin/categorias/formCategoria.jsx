import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormularioCategoria= () => {

    const navigate = useNavigate();
    const { id } = useParams();
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
    const [categoria, setCategoria] = useState({
      idCategorias: '',
      descripcion: ''
    });


    useEffect(() => {
      if (id !== 'nuevo') {
        const fetchCategoria = async () => {
          try {
            setLoading(true);
            const respuesta = await axios.get('/categorias/' + id);
            const data = respuesta.data.data;
            setCategoria({
              idCategorias: data.idCategorias, 
              descripcion: data.descripcion,
            });
            setLoading(false);
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        };
        fetchCategoria();
      } else {
        setCategoria({
          idCategorias: '',  
          descripcion: '',
        });
      }
    }, [id]);
    
const handleChange = (event) => {
    const { name, value } = event.target;
    setCategoria({ ...categoria, [name]: value });
  // }
};
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    if (id === 'nuevo') {
      const respuesta = await axios.post('/categorias', categoria);
      console.log("´´´´´´++´´´´"+ respuesta.data);
      navigate('/admin/categorias');
    } else {
      const respuesta = await axios.put('/categorias/' + id, categoria);
      console.log("´´´´´++´´´"+respuesta.data.data);
      navigate('/admin/categorias');
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
      { categoria.idCategorias ?  "Editar categoria" : "Crear nueva categoria"} 
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="max-w-md p-5 mx-auto mt-10 bg-white rounded-lg shadow-md">
            
          <form onSubmit={handleSubmit}>
             
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="nombre">
              descripcion:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="descripcion"
                type="text"
                name="descripcion"
                value={categoria.descripcion}
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
                onClick={() => navigate("/admin/categorias")}
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

export default FormularioCategoria;


