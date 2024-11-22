import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ComentariosIndex () {
        const navigate = useNavigate();
      
        const elementosPorPagina = 10;
      
        const [loading, setLoading] = useState(false);
        const [data, setData] = useState([]);
        const [paginaActual, setPaginaActual] = useState(1);
        const [filtro, setFiltro] = useState("");

        useEffect(() => {
            setLoading(true);
            axios.get("/comentarios").then((respuesta) => {
            //   console.log('*comentario*ff*',respuesta.data);  // Verifica la estructura aquí
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
            navigate(`/admin/comentarios/${id}`);
          };
        
          const eliminarComentarios = (id) => {
            axios
              .delete(`/comentarios/${id}`)
              .then((respuesta) => {
                if (respuesta.status === 200) {
                  console.log("Comentario eliminada con éxito");
                  // Actualiza la lista de categorias
                  axios
                    .get("/comentarios/")
                    .then((respuesta) => {
                      setData(respuesta.data.data);
                    })
                    .catch((error) => {
                      console.log("Error al actualizar la lista de comentarios", error);
                    });
                } else {
                  console.log("Error al eliminar el comentario", respuesta.status);
                }
              })
              .catch((error) => {
                console.log("Error al eliminar el comentario", error);
              });
          };
        
          const handleDelete = (id) => {
            // Implementar lógica para eliminar un comentario
            console.log(`Eliminar comentario con id ${id}`);
            if (window.confirm(`¿Está seguro de eliminar el comentario con id ${id}?`)) {
              eliminarComentarios(id);
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
            Gestión de Comentarios
          </div>
          {loading ? "Cargando..." : ""}
          
          <div className="m-5">
            <table className="w-full border-collapse table-auto shadow-lg">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-4 py-2 border-2 border-gray-400 text-center">
                    ID
                  </th>
                  <th className="px-4 py-2 border-2 border-gray-400 text-center">
                    Comentario
                  </th>
                  <th className="px-4 py-2 border-2 border-gray-400 text-center">
                    Producto
                  </th>
                  <th className="px-4 py-2 border-2 border-gray-400 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
            {filtrarElementosSegunPagina()
              .filter((comentario) =>
                (comentario.comentario || "").toLowerCase().includes(filtro.toLowerCase())
              )
              .map((comentario) => (
                <tr key={comentario.idComentario || comentario.idComentario} className="bg-white border-b hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {comentario.idComentario || comentario.idComentario}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {comentario.comentario}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    {comentario.ProductoIdProducto}
                  </td>
                  <td className="px-4 py-2 border border-gray-400 text-center">
                    <div className="flex justify-center space-x-2">
                                   
                      <button
                        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-white flex items-center justify-center"
                        onClick={() => handleDelete(comentario.idComentario || comentario.idComentario)}
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
              {filtrarElementosSegunPagina().filter((comentario) =>
                comentario.comentario.toLowerCase().includes(filtro.toLowerCase())
              ).length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-2 text-center border border-gray-400"
                  >
                    No se encontraron comentarios.
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

export default ComentariosIndex;
