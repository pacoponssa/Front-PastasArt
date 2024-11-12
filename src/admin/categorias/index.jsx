import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function CategoriaIndex() {
  const navigate = useNavigate();

  const elementosPorPagina = 10;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get("/categorias/").then((respuesta) => {
      console.log('*******',respuesta.data);  // Verifica la estructura aquí
      setLoading(false);
      if (respuesta.status === 200) {
        setData(respuesta.data.data);
      } else {
        console.log("error");
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/categorias/${id}`);
  };

  const eliminarCategoria = (id) => {
    axios
      .delete(`/categorias/${id}`)
      .then((respuesta) => {
        if (respuesta.status === 200) {
          console.log("Categoria eliminada con éxito");
          // Actualiza la lista de libros
          axios
            .get("/categorias/")
            .then((respuesta) => {
              setData(respuesta.data.data);
            })
            .catch((error) => {
              console.log("Error al actualizar la lista de categoria", error);
            });
        } else {
          console.log("Error al eliminar la categoria", respuesta.status);
        }
      })
      .catch((error) => {
        console.log("Error al eliminar la categoria", error);
      });
  };

  const handleDelete = (id) => {
    // Implementar lógica para eliminar una categoria
    console.log(`Eliminar categoria con id ${id}`);
    if (window.confirm(`¿Está seguro de eliminar la categoria con id ${id}?`)) {
      eliminarCategoria(id);
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
        Gestión de Categoria
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
            onClick={() => navigate("/admin/categorias/nuevo")}
          >
            Crear Categoria
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
                Descripción
              </th>
              <th className="px-4 py-2 border-2 border-gray-400 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filtrarElementosSegunPagina()
              .filter((categoria) =>
                categoria.descripcion
                  .toLowerCase()
                  .includes(filtro.toLowerCase())
              )
              .map((categoria) => (
                <tr key={categoria.idCategorias || categoria.idCategorias} className="bg-white border-b hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {categoria.idCategorias || categoria.idCategorias}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {categoria.descripcion}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="px-4 py-2 bg-green-400 rounded hover:bg-green-500 text-white flex items-center justify-center"
                        onClick={() => handleEdit(categoria.idCategorias || categoria.idCategorias)}
                      >
                        <span className="material-icons">edit</span>
                      </button>
              
                      <button
                        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-white flex items-center justify-center"
                        onClick={() => handleDelete(categoria.idCategorias || categoria.idCategorias)}
                      >
                        <span className="material-icons">delete</span>
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
          {filtrarElementosSegunPagina().filter((categoria) =>
            categoria.descripcion.toLowerCase().includes(filtro.toLowerCase())
          ).length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-2 text-center border border-gray-400"
              >
                No se encontraron categorias que coincidan con su búsqueda.
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

export default CategoriaIndex;
