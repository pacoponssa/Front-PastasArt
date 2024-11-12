import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TablaImagenes from './tablaImagenes'; 


const FormularioImagen= () => {

    const navigate = useNavigate();
    const { id } = useParams();
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
    const [imagenes, setImagenes] = useState([]);    
     const [imagen, setImagen] = useState({
      // idImagen: '',
      ubicacion: '',
      nroOrden: '',
      ProductoIdProducto: '',
    });

    
    const fetchImagen = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get('/imagen/prod/' + id);
        console.log(respuesta);
        setImagenes(respuesta.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

useEffect(() => {     
    fetchImagen();  
}, [id]);

// const handleChange = (event) => {
//   if (event.target.name === 'disponible') {
//     setImagen({ ...imagen, [event.target.name]: event.target.checked });
//   } else {

//     const { name, value } = event.target;
//     setImagen({ ...imagen, [name]: value });
//   }
// };

const handleChange = (event) => {
  const { name, value } = event.target;
  setImagen({
    ...imagen,
    [name]: name === 'nroOrden' ? parseInt(value) : value // Convertir a número si es nroOrden
  });
};


const handleSubmit = async (event) => {
  event.preventDefault();
  try {        
     const v_img = {...imagen, ProductoIdProducto: parseInt(id)};
     const imagenConNumero = {
       ...imagen,
       ProductoIdProducto: parseInt(id),
       nroOrden: parseInt(imagen.nroOrden) // Convertir nroOrden a número
     };
     console.log('*+*+*', v_img);
     console.log('*-*-*', imagenConNumero);
      const respuesta = await axios.post('/imagen', imagenConNumero);
      fetchImagen();  
      setImagen({nroOrden: '', ubicacion: ''});  
  } catch (error) {
    setError(error.message);
  }
};

 
    return (
      <>
      <div>
      <div>
      <div className='p-6 text-2xl font-bold text-center text-gray bg-orange-300'>
      { imagen.idImagen ?  "Editar imagen" : "Crear nueva imagen"} 
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="max-w-md p-5 mx-auto mt-10 bg-white rounded-lg shadow-md">
            
          <form onSubmit={handleSubmit}>
             
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="precio">
              Ubicacion:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="ubicacion"
                type="text"
                name="ubicacion"
                value={imagen.ubicacion}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="precio">
                Nro Orden:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="nroOrden"
                type="number"
                name="nroOrden"
                value={imagen.nroOrden}
                onChange={handleChange}
              />
            </div>
            <div className='flex justify-center'>
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
                onClick={() => navigate('/admin/producto')}
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            </div>
          </form>
        </div>

      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>       
        <TablaImagenes imagenes={imagenes} refrescarImagenes={fetchImagen}/>
    </div>
    </>
  );
}

export default FormularioImagen;


