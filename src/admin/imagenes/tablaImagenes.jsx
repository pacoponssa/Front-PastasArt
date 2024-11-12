import { useEffect, useState } from "react";

import axios from "axios";

function TablaImagenes(props) {
  const [data, setData] = useState([]);

  const imagenes = props.imagenes;

 const eliminarImagen = (id) => {
  axios.delete(`/imagen/${id}`)
    .then((respuesta) => {
      if (respuesta.status === 200) {
        console.log('Imagen eliminada con éxito');        
        // Actualiza la lista de imágenes eliminando la imagen localmente
        props.refrescarImagenes(); 
      } else {
        console.log('Error al eliminar la imagen', respuesta.status);
      }
    })
    .catch((error) => {
      console.log('Error al eliminar la imagen', error);
    });
};
 
  const handleDelete = (id, nro) => {
    // Implementar lógica para eliminar una imagen
    if (window.confirm(`¿Está seguro de eliminar la imagen con el N° de orden: ${nro}?`)) {
      eliminarImagen(id);
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <div className="p-6 text-2xl font-bold text-center text-gray bg-orange-300">
        Gestión de Imagenes
      </div>      
      <div className="flex justify-center w-full mt-10"></div>
      <div className="m-5">      
        <table className="w-full border border-collapse border-gray-400 table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-2 border-gray-400">ubicacion</th>
              <th className="px-4 py-2 border-2 border-gray-400">Imagen</th>
              <th className="px-4 py-2 border-2 border-gray-400">Nro Orden</th>
              <th className="px-4 py-2 border-2 border-gray-400 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {imagenes.map((img, index) => (
              <tr key={index} className="border border-gray-400">
                <td className="px-4 py-2 border border-gray-400">
                  {img.ubicacion}
                </td>
                <td className="px-4 py-2 border border-gray-400 text-center">
                    <img
                      src={img.ubicacion}
                      alt={img.ubicacion || "Imagen del producto"}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                <td className="px-4 py-2 border border-gray-400">
                  {img.nroOrden}
                </td>
                <td className="px-4 py-2 text-center border border-gray-400">
                  <button
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white items-center justify-center"
                    onClick={() => handleDelete(img.idImagen, img.nroOrden)}
                  >
                    <span className="material-icons" title="Eliminar registro">
                      delete
                    </span>{" "}
                    {/* Ícono de tacho de basura */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </>
  );
}

export default TablaImagenes; // Exportación por defecto
