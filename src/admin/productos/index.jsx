import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function ProductosIndex() {
  const navigate = useNavigate();

  const elementosPorPagina = 6;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("/productoAd")
      .then((respuesta) => {
        setLoading(false);
        if (respuesta.status === 200) {
          setData(respuesta.data.data);
          console.log('*prod**', data);
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleInsImg = (id) => {
    navigate(`/admin/imagen/prod/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/producto/${id}`);
  };

  const eliminarProducto = (id) => {
    axios
      .delete(`/producto/${id}`)
      .then((respuesta) => {
        if (respuesta.status === 200) {
          console.log("Producto eliminado con éxito");
          // Actualiza la lista de productos
          axios
            .get("/productoAd/")
            .then((respuesta) => {
              setData(respuesta.data.data);
            })
            .catch((error) => {
              console.log("Error al actualizar la lista de productos", error);
            });
        } else {
          console.log("Error al eliminar el producto", respuesta.status);
        }
      })
      .catch((error) => {
        console.log("Error al eliminar el producto", error);
      });
  };

  const handleDelete = (id) => {
    // Implementar lógica para eliminar un producto
    console.log(`Eliminar producto con id ${id}`);
    if (window.confirm(`¿Está seguro de eliminar el producto con id ${id}?`)) {
      eliminarProducto(id);
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
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <div className="p-6 text-2xl font-bold text-center text-gray bg-orange-300">
        Gestión de Productos
      </div>
      {loading ? "Cargando..." : ""}
      <div className="flex justify-center w-full mt-10">
        <div className="w-1/4">
          <input
            type="text"
            className="w-full p-2 mb-4 border border-gray-400 rounded"
            placeholder="Buscar por nombre"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div className="ml-5">
          <button
            className="px-4 py-2 font-bold text-white bg-green-400 rounded hover:bg-green-500"
            onClick={() => navigate("/admin/productoAd/nuevo")}
          >
            Crear Producto
          </button>
        </div>
      </div>
      <div className="m-5">
        <table className="w-full border-collapse table-auto shadow-lg">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-2 border-2 border-gray-400 text-center">
                ID
              </th>
              <th className="px-4 py-2 border-2 border-gray-400 text-center">
                Nombre
              </th>
              <th className="px-4 py-2 border-2 border-gray-400 text-center">
                Precio
              </th>
              <th className="px-4 py-2 border-2 border-gray-400 text-center">
                Cantidad
              </th>
              <th className="px-4 py-2 border-2 border-gray-400 text-center">
                Desc. Corta
              </th>
              {/* <th className="px-4 py-2 border-2 border-gray-400 text-center">
                Desc. Larga
              </th> */}
              <th className="px-4 py-2 border-2 border-gray-400 text-center">
                Imagen
              </th>
              <th className="px-4 py-2 border-2 border-gray-400 text-center">
                Disponible
              </th>
              <th className="px-4 py-2 border-2 border-gray-400 text-center">
              caracteristicas
              </th>
              <th className="px-4 py-2 border-2 border-gray-400 text-center">
              especificaciones
              </th>
              <th className="px-4 py-2 border-2 border-gray-400 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filtrarElementosSegunPagina()
              .filter((producto) =>
                producto.nombre.toLowerCase().includes(filtro.toLowerCase())
              )
              .map((producto) => (
                <tr
                  key={producto.idProducto}
                  className="bg-white border-b hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {producto.idProducto}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {producto.nombre}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {producto.precio}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {producto.cantidad}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {producto.descripcionCorta}
                  </td>
                  {/* <td className="px-4 py-2 border border-gray-400 text-center">
                    {producto.descripcionLarga}
                  </td> */}
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre || "Imagen del producto"}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {producto.disponible ? (
                      <div className="text-green-700 font-bold">SI</div>
                    ) : (
                      <div className="text-green-700 font-bold">NO</div>
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {producto.caracteristicas}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {producto.especificaciones}
                  </td>
                  <td className="px-4 py-2 text-center border border-gray-400">
                    {/* Botones de Editar y Eliminar */}
                    <div className="flex justify-center space-x-2">
                      <button
                        className="px-4 py-2 bg-green-400 rounded hover:bg-green-500 text-white flex items-center justify-center"
                        onClick={() => handleEdit(producto.idProducto)}
                      >
                        <span className="material-icons" title="Editar registro">edit</span>{" "}
                        {/* Ícono de lápiz */}
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-white flex items-center justify-center"
                        onClick={() => handleDelete(producto.idProducto)}
                      >
                        <span className="material-icons"title="Eliminar registro">delete</span>{" "}
                        {/* Ícono de tacho de basura */}
                      </button>
                      <button
                        className="px-1 py-1 bg-blue-400 rounded hover:bg-blue-500 text-white flex items-center justify-center"
                        onClick={() => handleInsImg(producto.idProducto)}
                      >
                        <span className="material-icons" title="Insertar Imagen">image</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="flex justify-center mt-5">
          {filtrarElementosSegunPagina().filter((producto) =>
            producto.nombre.toLowerCase().includes(filtro.toLowerCase())
          ).length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-2 text-center border border-gray-400"
              >
                No se encontraron productos que coincidan con su búsqueda.
              </td>
            </tr>
          ) : (
            <div>
              {Array.from({ length: calcularCantidadPaginas() }, (_, i) => (
                <button
                  key={i + 1}
                  className={`mx-2 py-2 px-4 rounded ${
                    paginaActual === i + 1
                      ? "bg-green-400 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => cambiarPagina(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductosIndex;
