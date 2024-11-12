import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`producto/descripcion/${product.idProducto}`}
      className="w-full border p-4 rounded-lg shadow-lg group transition-transform duration-300 hover:shadow-xl bg-gray-100"
    >
      {/* Contenedor de la imagen */}
      <div className="w-full h-48 overflow-hidden rounded-md">
        <img
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
          src={product.imagen}
          alt={product.nombre}
        />
      </div>

      {/* Nombre del producto */}
      <h3 className="text-lg font-semibold mt-2 text-gray-800
       group-hover:text-orange-600 transition-colors duration-300 line-clamp-1 hover:line-clamp-3 overflow-hidden">
  {product.nombre}
</h3>

      {/* Precio del producto y botón de carrito */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-500">$ {product.precio.toFixed(2)}</p>
        <button
          className="px-3 py-2 bg-orange-500 rounded-md hover:bg-orange-600 text-white flex items-center justify-center transition-colors duration-300"
          onClick={() => ""} // Lógica del carrito
        >
          <i className="fas fa-shopping-cart" title="Cargar en Carrito"></i>
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
