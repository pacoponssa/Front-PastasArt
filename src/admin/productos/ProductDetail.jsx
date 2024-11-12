import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../../front/Footer";
import Header from "../../front/Header";

const ProductDetail = () => {
  const { idProducto } = useParams(); // Obtener idProducto desde los parámetros de la URL
  const navigate = useNavigate(); // Hook para redireccionar
  const [producto, setProducto] = useState(null); // Estado para almacenar los detalles del producto
  const [imagenes, setImagenes] = useState([]); // Estado para almacenar las imágenes del producto
  const [loading, setLoading] = useState(true); // Estado para el cargando
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad de productos
  const [precioTotal, setPrecioTotal] = useState(0); // Estado para el precio total

  useEffect(() => {
    // Realizar la petición para obtener el producto por ID
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`/producto/${idProducto}`);
        const productoData = response.data.data;
        setProducto(productoData); // Almacenar los detalles del producto en el estado
        setPrecioTotal(productoData.precio); // Inicializar el precio total
        setLoading(false); // Marcar que la carga ha terminado
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setLoading(false); // Marcar que la carga ha terminado incluso en caso de error
      }
    };

    // Realizar la petición para obtener las imágenes del producto por ID
    const obtenerImagenes = async () => {
      try {
        const response = await axios.get(`/imagen/prod/${idProducto}`);
        setImagenes(response.data.data); // Almacenar las imágenes en el estado
      } catch (error) {
        console.error("Error al obtener las imágenes del producto:", error);
      }
    };

    obtenerProducto();
    obtenerImagenes();
  }, [idProducto]);

  const handleCantidadChange = (increment) => {
    setCantidad((prevCantidad) => {
      const nuevaCantidad = Math.max(1, prevCantidad + increment);
      setPrecioTotal(nuevaCantidad * producto.precio);
      return nuevaCantidad;
    });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!producto) {
    return <div>No se encontraron detalles para este producto.</div>;
  }

  return (
    <div>
      {/* Pasa cantidad como prop a Layout  */}
      <Header  cantidad={cantidad}/>
      <div className="relative container mx-auto p-6">
        <div className="flex flex-col md:flex-row">
           {/* Botón para regresar a la página */}
        <div className="absolute top-0 left-0 m-4">
          <button
            className="px-2 py-1 font-semibold rounded-lg hover:bg-orange-300 transition duration-500 ease-in-out"
            onClick={() => navigate("/")}
          >
            <i className="fas fa-arrow-left text-green-400" title="volver"></i>
          </button>
        </div>
          {/* Columna de imágenes */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            {/* Carrusel de imágenes */}
            <Carousel
              showThumbs={false}
              infiniteLoop
              useKeyboardArrows
              autoPlay
            >
              <div>
                <img
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  src={producto.imagen}
                  alt={producto.nombre}
                />
              </div>

              {imagenes.map((imagen, index) => (
                <div key={index}>
                  <img
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                    src={imagen.ubicacion}
                    alt={`${producto.nombre}-${index}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Columna de detalles */}

          <div className="w-full md:w-1/2 md:pl-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {producto.nombre}
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              {producto.descripcionCorta}
            </p>

            <div className="mb-4">
              <span className="text-2xl font-semibold text-gray-900">
                Precio unitario:{" "}
              </span>
              <span className="text-2xl font-bold text-red-500">
                $ {producto.precio}
              </span>
            </div>

            {/* Controles de cantidad */}
            <div className="flex items-center mb-4">
              <button
                className="px-3 py-1 bg-gray-300 rounded-l-lg hover:bg-gray-400"
                onClick={() => handleCantidadChange(-1)}
              >
                -
              </button>
              <span className="px-4 py-2 bg-white border-t border-b">
                {cantidad}
              </span>
              <button
                className="px-3 py-1 bg-gray-300 rounded-r-lg hover:bg-gray-400"
                onClick={() => handleCantidadChange(1)}
              >
                +
              </button>
            </div>

            <div className="mb-4">
              <span className="text-2xl font-semibold text-gray-900">
                Precio total:{" "}
              </span>
              <span className="text-2xl font-bold text-red-500">
                $ {precioTotal.toFixed(2)}
              </span>
            </div>

            {/* Botón de añadir al carrito */}
            <button className="px-6 py-3 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-500 transition duration-300 ease-in-out">
              Añadir {cantidad} al Carrito
            </button>

            {/* Boton para regresar a la página */}
            <div className="flex justify-end items-right">
              <button
                className="mr-4 px-2 py-1 font-semibold rounded-lg hover:bg-orange-300 transition duration-500 ease-in-out"
                onClick={() => navigate("/")}
              >
                <i
                  className="fas fa-arrow-left text-green-400"
                  title="volver"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
