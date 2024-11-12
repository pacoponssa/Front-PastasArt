import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormularioProducto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [producto, setProducto] = useState({
    idProducto: "",
    nombre: "",
    precio: "",
    cantidad: "",
    descripcionCorta: "",
    // descripcionLarga: "",
    imagen: "",
    disponible: false,
    CategoriaIdCategorias: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);
  const [imagenes, setImagenes] = useState([]);

  // Función para obtener las categorías
  const obtenerCategorias = async () => {
    try {
      setLoading(true);
      const respuesta = await axios.get("/categorias/");
      setCategorias(respuesta.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Función para obtener los datos del producto (si no es "nuevo")
  useEffect(() => {
    obtenerCategorias();

    if (id !== "nuevo") {
      const fetchProducto = async () => {
        try {
          setLoading(true);
          const respuesta = await axios.get("/producto/" + id);
          const productoData = respuesta.data.data;
          setProducto(productoData);
          setCategoriaSeleccionada(productoData.CategoriaIdCategorias); // Establecer la categoría seleccionada
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
      fetchProducto();
    } else {
      // Resetear el formulario si es un nuevo producto
      setProducto({
        idProducto: "",
        nombre: "",
        precio: "",
        cantidad: "",
        descripcionCorta: "",
        imagen: "",
        disponible: false,
        CategoriaIdCategorias: "",
      });
    }
  }, [id]);

   // Manejar cambios en los campos
   const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "disponible") {
      setProducto({ ...producto, disponible: event.target.checked });
    } else {
      setProducto({ ...producto, [name]: value });
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    producto.CategoriaIdCategorias = categoriaSeleccionada;

    try {
      if (id === "nuevo") {
        await axios.post("/producto", producto);
      } else {
        await axios.put("/producto/" + id, producto);
      }
      navigate("/admin/producto");
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
      <div className="p-6 text-2xl font-bold text-center text-gray bg-orange-300">
        {producto.idProducto ? "Editar producto" : "Crear nuevo producto"}
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="max-w-md p-5 mx-auto mt-10 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="nombre"
              >
                Nombre:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="precio"
              >
                Precio:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="precio"
                type="number"
                name="precio"
                value={producto.precio}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="nombre"
              >
                Cantidad:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="cantidad"
                type="number"
                name="cantidad"
                value={producto.cantidad}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="nombre"
              >
                DescripcionCorta:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="descripcionCorta"
                type="text"
                name="descripcionCorta"
                value={producto.descripcionCorta}
                onChange={handleChange}
              />
            </div>
            {/* 
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="nombre"
              >
                DescripcionLarga:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="descripcionLarga"
                type="text"
                name="descripcionLarga"
                value={producto.descripcionLarga}
                onChange={handleChange}
              />
            </div> */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="nombre"
              >
                Imagen:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="imagen"
                type="text"
                name="imagen"
                value={producto.imagen}
                onChange={handleChange}
              />
            </div>
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="categoria"
            >
              Categoria:
            </label>
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(Number(e.target.value))}
              className="w-full p-2 mb-4 border-gray-400 focus:ring-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>
                Seleccione una categoría
              </option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.idCategorias}
                  value={categoria.idCategorias}
                >
                  {categoria.descripcion}
                </option>
              ))}
            </select>

            <div className="flex mb-4">
              <input
                id="disponible"
                type="checkbox"
                name="disponible"
                className="mr-2"
                checked={producto.disponible}
                onChange={handleChange}
              />
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="disponible"
              >
                Disponible
              </label>
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
                onClick={() => navigate("/admin/producto")}
              >
                <span className="material-icons">close</span>
              </button>
            </div>
          </form>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FormularioProducto;
