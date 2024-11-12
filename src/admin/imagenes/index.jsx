
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

function ImagenesIndex() {
  const navigate = useNavigate();

  const elementosPorPagina = 10;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataImg, setDataImg] = useState([]);
 

  const MostrarImagenesId = (id) => {
    axios.get(`/imagen/${id}`)
      .then((respuesta) => {
        if (respuesta.status === 200) {
          console.log('Respuesta Correcta');
          // Actualiza la lista de productos
          axios.get(`/producto/${id}`)
            .then((respuesta) => {
              setDataImg(respuesta.dataImg.dataImg);
            })
            .catch((error) => {
              console.log('Error al actualizar la lista de productos', error);
            });
        } else {
          console.log('Error al obtener el producto', respuesta.status);
        }
      })
      .catch((error) => {
        console.log('Error al obtener el producto', error);
      });
  };


  useEffect(() => {
    setLoading(true);
    axios.get('/imagen').then((respuesta) => {
      setLoading(false);
      if (respuesta.status === 200) {
        setData(respuesta.data.data);
      } else {
        console.log('error');
      }
    }).catch((error) => {
      console.log('error', error);
    });
  }, []);

  const handleEdit = (id) => {

    navigate(`/admin/imagen/${id}`);
  };

  const eliminarImagen = (id) => {
    axios.delete(`/imagen/${id}`)
      .then((respuesta) => {
        if (respuesta.status === 200) {
          console.log('Imagen eliminada con éxito');
          // Actualiza la lista de imagenes
          axios.get('/imagen/')
            .then((respuesta) => {
              setData(respuesta.data.data);
            })
            .catch((error) => {
              console.log('Error al actualizar la lista de imagen', error);
            });
        } else {
          console.log('Error al eliminar la imagen', respuesta.status);
        }
      })
      .catch((error) => {
        console.log('Error al eliminar la imagen', error);
      });
  };

  const handleDelete = (id) => {
    // Implementar lógica para eliminar una imagen
    console.log(`Eliminar imagen con id ${id}`);
    if (window.confirm(`¿Está seguro de eliminar la imagen con id ${id}?`)) {
      eliminarImagen(id);
    }
  };

 

  return (
    <>
      <div class='head' className='p-6 text-2xl font-bold text-center text-gray bg-orange-300'>
        Gestión de Imas
      </div>
      {loading ? 'Cargando...' : ''}
      <div className='m-5'>
        <table className='w-full border border-collapse border-gray-400 table-auto'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 border-2 border-gray-400'>ID</th>
              <th className='px-4 py-2 border-2 border-gray-400'>Ubicacion</th>
              <th className='px-4 py-2 border-2 border-gray-400'>Imagen</th>
              <th className='px-4 py-2 border-2 border-gray-400'>Nro Orden</th>
              <th className='px-4 py-2 border-2 border-gray-400'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((imagen) => (
              <tr key={imagen.idImagen} className='border border-gray-400'>
                <td className='px-4 py-2 border border-gray-400'>{imagen.idImagen}</td>
                <td className='px-4 py-2 border border-gray-400'>{imagen.ubicacion}</td>
                <td className="px-4 py-2 border border-gray-400 text-center">
                    <img
                      src={imagen.ubicacion}
                      alt={imagen.ubicacion || "Imagen del producto"}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                <td className='px-4 py-2 border border-gray-400'>{imagen.nroOrden}</td>
                <td className='px-4 py-2 text-center border border-gray-400'>
                 <button
                    className='px-4 py-2 mx-2 font-bold text-white bg-red-500 rounded hover:bg-red-700'
                    onClick={() => handleDelete(imagen.idImagen)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      <div>
       
      </div>
          

    </>
  );
}

export default ImagenesIndex;
