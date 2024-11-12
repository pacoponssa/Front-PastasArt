
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

function CarritoIndex() {
  const navigate = useNavigate();

  const elementosPorPagina = 10;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('/carrito').then((respuesta) => {
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

    navigate(`/admin/carrito/${id}`);
  };

  const eliminarCarrito = (id) => {
    axios.delete(`/carrito/${id}`)
      .then((respuesta) => {
        if (respuesta.status === 200) {
          console.log('Carrito eliminado con éxito');
          // Actualiza la lista de libros
          axios.get('/carrito/')
            .then((respuesta) => {
              setData(respuesta.data.data);
            })
            .catch((error) => {
              console.log('Error al actualizar la lista de carritos', error);
            });
        } else {
          console.log('Error al eliminar el carrito', respuesta.status);
        }
      })
      .catch((error) => {
        console.log('Error al eliminar el carrito', error);
      });
  };

  const handleDelete = (id) => {
    // Implementar lógica para eliminar un carrito
    console.log(`Eliminar carrito con id ${id}`);
    if (window.confirm(`¿Está seguro de eliminar el carrito con id ${id}?`)) {
      eliminarCarrito(id);
    }
  };

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const calcularCantidadPaginas = () => {
    return Math.ceil(data.length / elementosPorPagina);
  };

  const filtrarElementosSegunPagina = () => {
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    return data.slice(inicio, fin);
  };

  return (
    <>
      <div className='p-6 text-2xl font-bold text-center text-white bg-red-600'>
        Gestión de Carritos
      </div>
      {loading ? 'Cargando...' : ''}
      <div className='flex justify-center w-full mt-10'>
        <div className='w-1/4'>

          <input
            type='text'
            className='w-full p-2 mb-4 border border-gray-400 rounded'
            placeholder='Buscar por nombre'
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          /></div>
          <div className='ml-5'>
            <button
              className='px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700'
              onClick={() => navigate('/admin/carrito/nuevo')}>
              Crear Carrito
            </button>
          </div>
      </div>
      <div className='m-5'>
        <table className='w-full border border-collapse border-gray-400 table-auto'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 border-2 border-gray-400'>ID</th>
              <th className='px-4 py-2 border-2 border-gray-400'>Total</th>
              <th className='px-4 py-2 border-2 border-gray-400'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrarElementosSegunPagina().filter((carrito) =>
              carrito.id.toLowerCase().includes(filtro.toLowerCase())
            ).map((carrito) => (
              <tr key={carrito.id} className='border border-gray-400'>
                <td className='px-4 py-2 border border-gray-400'>{carrito.id}</td>
                <td className='px-4 py-2 border border-gray-400'>{carrito.total}</td>
                <td className='px-4 py-2 text-center border border-gray-400'>
                  <button
                    className='px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
                    onClick={() => handleEdit(carrito.id)}
                  >
                    Editar
                  </button>
                  <button
                    className='px-4 py-2 mx-2 font-bold text-white bg-red-500 rounded hover:bg-red-700'
                    onClick={() => handleDelete(carrito.id)}
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
        <div className='flex justify-center mt-5'>
          {filtrarElementosSegunPagina().filter((carrito) =>
            carrito.id.toLowerCase().includes(filtro.toLowerCase())
          ).length === 0 ? (
            <tr>
              <td colSpan={5} className='px-4 py-2 text-center border border-gray-400'>
                No se encontraron carritos que coincidan con su búsqueda.
              </td>
            </tr>
          ) :
            <div  >
              {Array.from({ length: calcularCantidadPaginas() }, (_, i) => (
                <button
                  key={i + 1}
                  className={`mx-2 py-2 px-4 rounded ${paginaActual === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  onClick={() => cambiarPagina(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default CarritoIndex;
